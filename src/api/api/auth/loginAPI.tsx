import { setCookie } from "../../cookies.tsx";

const API_SERVER_DOMAIN = "https://api.oneteam-mcp.site";

export default function LogInAPI(email: string, password: string) {
  fetch(`${API_SERVER_DOMAIN}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then(async (response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error("LogIn failed");
      }

      // JSON 데이터를 파싱해 로그 데이터 출력 (필요하다면 추가 작업)
      const data = await response.json();
      console.log("Data:", data);

      console.log("Response Headers:", [...response.headers.entries()]);

      // 토큰을 응답 헤더에서 가져옴
      const accessToken = response.headers
        .get("authorization")
        ?.replace("Bearer ", "");
      const refreshToken = response.headers.get("refresh-token");

      if (!accessToken || !refreshToken) {
        throw new Error("Tokens are missing from the response headers.");
      }

      // 쿠키에 토큰 저장
      setCookie("accessToken", accessToken, {
        path: "/",
        expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1시간 뒤 삭제
      });
      setCookie("refreshToken", refreshToken, {
        path: "/",
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1일 뒤 삭제
      });

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 100); // 100ms 딜레이
    })
    .catch((error) => {
      console.error("LogIn failed:", error);
      alert("아이디나 비밀번호를 다시 확인해주세요.");
    });
}
