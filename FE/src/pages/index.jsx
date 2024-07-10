import { useEffect, useState } from "react";
import { sendRequest } from "../apiHandler";
import { redirect } from "react-router-dom";

function IndexPage() {
  const [user, setUser] = useState(null);
  async function getUser() {
    const response = await sendRequest("accounts/profile", "get", null, null);
    if (response.status == 200) {
      setUser(response);
    } else setUser(null);
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <div>
        <div className="float-end mr-3">
          {user ? (
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
            redirect("/");
          }}
        >
          To profile
        </button>
      </div>
    </div>
  );
}
export default IndexPage;
