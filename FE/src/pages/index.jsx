import { useEffect, useState } from "react";
import { sendRequest } from "../apiHandler";
import { redirect, useNavigate } from "react-router-dom";
import { LoginManager } from "../loginManager";

function IndexPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserAsync = async () => {
      setUser(await LoginManager.getProfile());
    };
    getUserAsync();
  }, []);

  return (
    <div>
      <div>
        <div className="float-end mr-3">
          {user != null ? (
            <a href="">Log out</a>
          ) : (
            <>
              <a href="/Login">login</a>
              <a href="/Register">register</a>
            </>
          )}
        </div>
      </div>
      <div>
        <button
          className="bg-blue-300"
          onClick={() => {
            navigate("/profile");
          }}
        >
          To profile
        </button>
      </div>
    </div>
  );
}
export default IndexPage;
