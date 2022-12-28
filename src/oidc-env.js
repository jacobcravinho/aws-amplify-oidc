const OIDC = {
    development: {
        domain: "YOUR DOMAIN HERE.auth.us-west-2.amazoncognito.com",
        scope: ["email", "openid", "aws.cognito.signin.user.admin", "profile"],
        redirectSignIn: "http://localhost:3000/",
        redirectSignOut: "http://localhost:3000/",
        responseType: "code"
    },
    production: {}
}
export default OIDC;