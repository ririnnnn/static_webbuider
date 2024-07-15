const api = "http://localhost:5165/api/";

export async function sendRequest(
  controller,
  method,
  bodyData,
  urlData,
  callback
) {
  let url = api + controller + "/";
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + window.sessionStorage.getItem("userToken"),
    },
    body: method.toLowerCase() !== "get" ? JSON.stringify(bodyData) : null,
  });
  return response;
}
