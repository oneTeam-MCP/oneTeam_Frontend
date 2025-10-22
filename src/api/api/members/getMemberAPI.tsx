import { getCookie, removeCookie } from "../../cookies.tsx";
// import getAccessTokenWithRefreshToken from "../../getAccessTokenWithRefreshToken.tsx";

const API_SERVER_DOMAIN = "https://api.oneteam-mcp.site";

async function getMember(accessToken) {
  return fetch(API_SERVER_DOMAIN + `/api/v1/members`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to logout");
    }
    return response.json();
  });
}

export default async function GetMember() {
  const accessToken = getCookie("accessToken");
  // const refreshToken = getCookie("refreshToken");

  if (accessToken) {
    try {
      const data = await getMember(accessToken);
      console.log(data.result);

      return data.result;
    } catch (error) {
      // if (refreshToken) {
      //   try {
      //     console.error("accessToken expiration: ", error);

      //     let newAccessToken = await getAccessTokenWithRefreshToken(
      //       accessToken,
      //       refreshToken
      //     );
      //     let data = await getMember(newAccessToken);
      //     console.log(data.result);

      //     return data.result;
      //   } catch (error) {
      //     console.error("Failed to refresh access token:", error);
      //     alert("다시 로그인해주세요.");
      //     removeCookie("accessToken");
      //     removeCookie("refreshToken");
      //     window.location.href = "/";
      //   }
      // } else {
      //   console.error("No RefreshToken");
      //   alert("다시 로그인 해주세요.");
      //   removeCookie("accessToken");
      //   window.location.href = "/";
      // }
      console.error("No RefreshToken");
      alert("다시 로그인 해주세요.");
      removeCookie("accessToken");
      window.location.href = "/";
    }
  } else {
    console.error("No AccessToken");
    alert("다시 로그인 해주세요.");
    window.location.href = "/";
  }
}
