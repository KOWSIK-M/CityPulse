import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

export default function GoogleSignIn() {
  return (
    <div>
      <GoogleOAuthProvider clientId="406615106327-1q10lbbef9oqo0gh14n4r22m0mmeifvu.apps.googleusercontent.com" >
      <GoogleLogin 
  onSuccess={credentialResponse => {
    const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
    console.log(credentialResponseDecoded)
  }}
  onError={() => {
    console.log('Login Failed');
  }}
  
  useOneTap
/>;
</GoogleOAuthProvider>
    </div>
  )
}
