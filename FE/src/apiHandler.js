const api = "http://localhost:5165/api/";

export async function sendRequest(
  controller,
  method,
  bodyData,
  urlData,
  callback
) {
  let url = api + controller;
  let urlDataString = "";
  if(urlData){
    Object.keys(urlData).forEach((item)=>{
      urlDataString += item+"="+urlData[item]+"&"
    })
    urlDataString = "?" + urlDataString.slice(0, -1);
  }
  const response = await fetch(url + urlDataString, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + window.sessionStorage.getItem("userToken"),
    },
    body: method.toLowerCase() !== "get" ? JSON.stringify(bodyData) : null,
  });
  return response;
}
