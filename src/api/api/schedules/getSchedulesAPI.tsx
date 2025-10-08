// import { getCookie, removeCookie } from "../../cookies.tsx";
// import getAccessTokenWithRefreshToken from "../getAccessTokenWithRefreshToken.tsx";

const API_SERVER_DOMAIN = "https://api.oneteam-mcp.site";

export default async function GetSchedulesAPI() {
  try {
    const response = await fetch(API_SERVER_DOMAIN + `/api/v1/schedules`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json().then((data) => {
      if (!response.ok) {
        throw new Error("Failed to get inventory");
      }
      console.log(data);
      return data;
    });
  } catch (error) {
    console.error(error);
    alert("서버 오류 발생");
    window.location.href = "/";
    return;
  }
}
