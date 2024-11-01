import React from "react";
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
// import googleSSOIcon from "../assets/icons/google-SSO.png";
// import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { useHookstate } from "@hookstate/core";
import { globalState } from "../store";
import axios from "axios";
import qs from 'qs'

const GoogleSignInBtn: React.FC = () => {
  const { userCredentials } = useHookstate(globalState);

  const googleLoginSuccess = async (credentials: CredentialResponse) => {
    if (credentials?.credential) {
      const { email, exp, family_name, given_name, name, picture }: any = await jwtDecode(credentials?.credential);
      const cred = { loaded: true, email, exp, family_name, given_name, name, picture }
      userCredentials.set(cred)
      const data = qs.stringify(cred);
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data,
        url: `${import.meta.env.VITE_BACKEND_ENDPOINT}/login` || 'http://localhost:5000/login'
      }
      axios(options)
      window.localStorage.setItem('user', JSON.stringify({ expiry: exp, email, family_name, given_name, name, picture }))
    }
  }

  const onError = (err?: { error: string; error_description?: string, error_uri?: string }) => {
    // Show error screen later on
    if (err) {
      console.log(err)
    }
  }

  return (
    <GoogleLogin onSuccess={googleLoginSuccess} onError={onError} />
  )


};
export default GoogleSignInBtn;
