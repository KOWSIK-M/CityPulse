import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

export default function GoogleSignIn() {
  return (
    <div>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} >
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
