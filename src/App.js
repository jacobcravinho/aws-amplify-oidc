import { useEffect, useState } from 'react';
import { Auth, Hub, API } from 'aws-amplify';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser().then(userData => setUser(userData));
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
      }
    });

    getUser().then(userData => setUser(userData));
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'));
  }

  // Call the ApiGateway REST API
  const getAPI = async (bool) => {

    const user = (await Auth.currentSession()).getIdToken()
    // const user = (await Auth.currentSession()).getIdToken().getJwtToken()

    const params = {
      body: {...user}, // replace this with attributes you need
      headers: {}, // OPTIONAL
      queryStringParameters: {
        approval: bool // OPTIONAL
      }
    };

    const res = await API.post('oidc', '/items', params)
    console.log(res)
  }

  return (
    <div>
      <p>User: {user ? JSON.stringify(user.attributes) : 'None'}</p>
      {user ? (
        <>
        <button onClick={() => Auth.signOut()}>Sign Out</button>
        <button onClick={() => getAPI(true)}>Get API - Pass True</button>
        <button onClick={() => getAPI(false)}>Get API - Pass False</button>
        </>
      ) : (
        <button onClick={() => Auth.federatedSignIn({provider: "Okta"})}>Federated Sign In</button>
        // <button onClick={() => Auth.federatedSignIn()}>Federated Sign In</button>
      )}
    </div>
  );
}

export default App;