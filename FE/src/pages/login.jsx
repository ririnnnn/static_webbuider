import { useState } from "react";
import { sendRequest } from "../apiHandler";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function login() {
    const response = await sendRequest("login", "post", {
      username: username,
      password: password,
    });
    if (response)
      window.sessionStorage.setItem("userToken", await response.text());
    else window.sessionStorage.setItem("userToken", "a");
  }
  return (
    <div className="border border-stone-600 rounded-xl p-4 w-fit">
      <div className="py-1">
        <div className="my-1">username</div>
        <input
          className="border border-stone-600 rounded"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
      </div>
      <div className="py-1">
        <div className="my-1">password</div>
        <input
          type="password"
          className="border border-stone-600 rounded"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
      </div>
      <div>
        <button
          className="font-bold text-white font-sans bg-green-600 rounded w-full p-1"
          onClick={() => {
            login();
          }}
        >
          Login
        </button>
      </div>
      <button
        onClick={() => {
          alert(window.sessionStorage.getItem("userToken"));
        }}
      >
        test
      </button>
      <button
        onClick={async () => {
          const response = await sendRequest("Accounts/profile", "get");
          console.log(await response.json());
        }}
      >
        test 2
      </button>
    </div>
  );
}
export default LoginPage;
