const api = "https://localhost:7180/api/";

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
    body: JSON.stringify(bodyData),
  }).then((response) => {
    if (callback) callback(response);
  });
  return response;
}
