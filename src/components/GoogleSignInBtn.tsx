import React from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useHookstate } from "@hookstate/core";
import { globalState } from "../store";
import { socket } from "../socket";
import { SocketCredentialsI } from "../types/socket.types";

const GoogleSignInBtn: React.FC = () => {
  const { userCredentials } = useHookstate(globalState);

  const googleLoginSuccess = async (credentials: CredentialResponse) => {
    if (credentials?.credential) {
      const {
        email,
        exp,
        family_name,
        given_name,
        name,
        picture,
      }: SocketCredentialsI = await jwtDecode(credentials?.credential);
      const cred = {
        loaded: true,
        email,
        exp,
        family_name,
        given_name,
        name,
        picture,
      };
      userCredentials.set(JSON.parse(JSON.stringify(cred)));
      window.localStorage.setItem("user", JSON.stringify(cred));
      const socketCredentials = JSON.parse(JSON.stringify(cred));
      socket.emit("userLogin", socketCredentials);
    }
  };

  const onError = (err?: {
    error: string;
    error_description?: string;
    error_uri?: string;
  }) => {
    // Show error screen later on
    if (err) {
      console.error(err);
    }
  };

  return <GoogleLogin onSuccess={googleLoginSuccess} onError={onError} />;
};
export default GoogleSignInBtn;
