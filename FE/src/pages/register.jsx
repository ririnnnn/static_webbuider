import { useState } from "react";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  async function register() {}

  return (
    <>
      <div className="border border-stone-600 rounded-xl p-4 w-fit">
        <div className="py-1">
          <label className="inline-block w-40">Username</label>
          <input
            className="border rounded"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
        </div>
        <div className="py-1">
          <label className="inline-block w-40">Email</label>
          <input
            className="border rounded"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>
        <div className="py-1">
          <label className="inline-block w-40">Password</label>
          <input
            className="border rounded"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        <div className="py-1">
          <label className="inline-block w-40">Confirm password</label>
          <input
            className="border rounded"
            value={password2}
            onChange={(e) => {
              setPassword2(e.target.value);
            }}
          ></input>
        </div>
        <div className="py-1">
          <button
            className="font-bold text-white font-sans bg-green-600 rounded w-full p-1"
            onClick={() => {
              register();
            }}
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
}
export default RegisterPage;
