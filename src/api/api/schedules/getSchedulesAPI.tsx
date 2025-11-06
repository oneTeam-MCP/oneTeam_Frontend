import { getCookie, removeCookie } from "../../cookies.tsx";
// import getAccessTokenWithRefreshToken from "../getAccessTokenWithRefreshToken.tsx";

const API_SERVER_DOMAIN = "https://api.oneteam-mcp.site";

export default async function GetSchedulesAPI() {
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");

  try {
    const response = await fetch(API_SERVER_DOMAIN + `/api/v1/schedules`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get inventory");
    }

    return response.json().then((data) => {
      console.log(data);
      return data;
    });
  } catch (error) {
    console.error(error);
    removeCookie("accessToken");
    alert("다시 로그인 해주세요.");
    window.location.href = "/";
    return;
  }
}
