import { sendRequest } from "./apiHandler";
export const LoginManager = {
  login: async (username, password) => {
    const response = await sendRequest("login", "post", {
      username: username,
      password: password,
    });
    if (response) {
      window.sessionStorage.setItem("userToken", await response.text());
      return true;
    } else {
      window.sessionStorage.setItem("userToken", null);
      return false;
    }
  },
  getProfile: async () => {
    const response = await sendRequest("Accounts/Profile", "get");
    if (response.ok) return await response.json();
    else return null;
  },
};
