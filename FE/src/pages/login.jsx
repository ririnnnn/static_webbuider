import { useState } from "react";
import { sendRequest } from "../apiHandler";
import { LoginManager } from "../loginManager";
import { Input } from "../components/UIElements";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showFailLogin, setShowFailLogin] = useState(false);
  async function login() {
    const response = await sendRequest("login", "post", {
      username: username,
      password: password,
    });
    if (response) {
      if (response.ok) {
        window.sessionStorage.setItem("userToken", await response.text());
        navigate("/profile");
      } else {
        setShowFailLogin(true);
      }
    } else alert("Lỗi hệ thống");
  }
  return (
    <div className="w-full flex justify-center">
      <div className="w-72 h-full pt-10">
        <div className="border border-stone-600 rounded p-4 mb-3">
          <div className="py-1">
            <div className="my-1">Username</div>
            <Input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="py-1">
            <div className="my-1">Password</div>
            <input
              type="password"
              className="border border-stone-600 rounded w-full"
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
          <div className="flex justify-between">
            <div className="w-fit inline-block">Forgot password</div>
          </div>
        </div>
        <div className="border border-stone-600 rounded p-4">
          <p className="w-fit inline-block">
            Don't have an account? <a>Register</a>
          </p>
        </div>
        <div className="flex justify-between items-center">
          <div className="w-5/12 inline-block border"></div>
          <div className="w-fit inline-block">or</div>
          <div className="w-5/12 inline-block border"></div>
        </div>
        <div className="border border-stone-600 rounded pt-1 p-4">
          <div className="text-center">Login with</div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
