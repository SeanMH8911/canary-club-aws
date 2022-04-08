import { Auth } from "aws-amplify";
import { useState, useEffect } from "react";
import "../configureAmplify";
import ConfirmSignUp from "../src/components/authentication/ConfirmSignUp";
import ForgotPassword from "../src/components/authentication/ForgotPassword";
import ForgotPasswordSubmit from "../src/components/authentication/ForgotPasswordSubmit";
import SignIn from "../src/components/authentication/SignIn";
import SignUp from "../src/components/authentication/SignUp";
import Profile from "../src/components/authentication/profile";

function App() {
  const [uiState, setUiState] = useState(null);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    authCode: "",
  });
  const { email, password, authCode } = formState;
  useEffect(() => {
    checkUser();
  }, []);
  async function checkUser() {
    console.log("checking user...");
    try {
      setUiState("loading");
      await Auth.currentAuthenticatedUser();
      setUiState("signedIn");
    } catch (err) {
      setUiState("signIn");
    }
  }
  function onChange(e) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }
  async function signUp() {
    try {
      await Auth.signUp({ username: email, password, attributes: { email } });
      setUiState("confirmSignUp");
    } catch (err) {
      console.log({ err });
    }
  }
  async function confirmSignUp() {
    try {
      await await Auth.confirmSignUp(email, authCode);
      await Auth.signIn(email, password);
      setUiState("signedIn");
    } catch (err) {
      console.log({ err });
    }
  }
  async function signIn() {
    try {
      await Auth.signIn(email, password);
      setUiState("signedIn");
    } catch (err) {
      console.log({ err });
    }
  }
  async function forgotPassword() {
    try {
      await Auth.forgotPassword(email);
      setUiState("forgotPasswordSubmit");
    } catch (err) {
      console.log({ err });
    }
  }
  async function forgotPasswordSubmit() {
    await Auth.forgotPasswordSubmit(email, authCode, password);
    setUiState("signIn");
  }
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex flex-col items-center">
        <div className="max-w-full sm:w-540 md:mt-14">
          <div className="mb-8"></div>
          <div className="bg-white p-6 md:py-14 md:px-16 shadow-form rounded">
            {!uiState ||
              (uiState === "loading" && (
                <p className="font-bold">Loading ...</p>
              ))}
            {uiState === "signedIn" && (
              <Profile setUiState={setUiState} onChange={onChange} />
            )}
            {uiState === "signUp" && (
              <SignUp
                setUiState={setUiState}
                onChange={onChange}
                signUp={signUp}
              />
            )}
            {uiState === "confirmSignUp" && (
              <ConfirmSignUp
                setUiState={setUiState}
                onChange={onChange}
                confirmSignUp={confirmSignUp}
              />
            )}
            {uiState === "signIn" && (
              <SignIn
                setUiState={setUiState}
                onChange={onChange}
                signIn={signIn}
              />
            )}
            {uiState === "forgotPassword" && (
              <ForgotPassword
                setUiState={setUiState}
                onChange={onChange}
                forgotPassword={forgotPassword}
              />
            )}
            {uiState === "forgotPasswordSubmit" && (
              <ForgotPasswordSubmit
                setUiState={setUiState}
                onChange={onChange}
                forgotPasswordSubmit={forgotPasswordSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
