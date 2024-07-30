import { useState } from "react";
import { sendRequest } from "../apiHandler";
import { LoginManager } from "../loginManager";
import { Input } from "../components/UIElements";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";

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
  const gglogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // tokenResponse contains the access token and other data
      const { access_token } = tokenResponse;

      try {
        const res = sendRequest("login/Google", "post", access_token);
        console.log(await res.text());
      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    },
    onError: (error) => {
      console.error("Login failed", error);
    },
  });

  return (
    <div className="w-full flex justify-center text-base">
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
            <Input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <button
              className="font-bold text-white font-sans bg-green-600 rounded w-full p-1 mt-4"
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
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
          <button onClick={() => gglogin()}>login</button>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
