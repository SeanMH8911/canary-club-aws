import { Auth } from "aws-amplify";
import Input from "./Input";

export default function ForgotPasswordSubmit({
  onChange,
  forgotPasswordSubmit,
}) {
  return (
    <>
      <p className="text-3xl font-black">Confirm new password?</p>
      <div className="mt-10">
        <label className="text-sm">Confirmation code</label>
        <Input onChange={onChange} name="authCode" />
      </div>
      <div className="mt-10">
        <label className="text-sm">New password</label>
        <Input type="password" onChange={onChange} name="password" />
      </div>
      <button
        onClick={forgotPassword}
        className="text-white w-full mt-6 bg-pink-600 p-3 rounded"
      >
        Submit new password
      </button>
    </>
  );
}
