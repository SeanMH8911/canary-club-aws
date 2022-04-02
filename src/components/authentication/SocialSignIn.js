import { Auth } from "aws-amplify";
import { FaGoogle, FaFacebook } from "react-icons/fa";

function SocialSignIn() {
  return (
    <div className="flex flex-col">
      <button
        onClick={() => Auth.federatedSignIn({ provider: "Google" })}
        className="mt-10 focus:outline-none"
      >
        <div className="flex border border-gray-300 p-2 rounded-full items-center justify-center">
          <FaGoogle size="38" className="text-red-600" />
          <p className="pl-2">Sign in with Google</p>
        </div>
      </button>
      <button
        onClick={() => Auth.federatedSignIn({ provider: "Facebook" })}
        className="mt-4 focus:outline-none"
      >
        <div className="flex border border-gray-300 p-2 rounded-full items-center justify-center">
          <FaFacebook size="38" className="text-blue-600" />
          <p className="pl-2">Sign in with Facebook</p>
        </div>
      </button>
    </div>
  );
}

export default SocialSignIn;
