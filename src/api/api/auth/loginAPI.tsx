import { setCookie } from "../../cookies.tsx";

const API_SERVER_DOMAIN = "https://api.oneteam-mcp.site";

export default async function LogInAPI(
  email: string,
  password: string
): Promise<Response> {
  const response = await fetch(`${API_SERVER_DOMAIN}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  // 실패 응답이면 예외 발생시켜 호출자에서 catch가 동작하게 함
  if (!response.ok) {
    let text = "";
    try {
      text = await response.text();
    } catch {
      /* ignore */
    }
    throw new Error(`HTTP ${response.status} ${text || response.statusText}`);
  }

  // 응답 body를 로그하고 싶다면 clone을 사용(원본 body 보존)
  try {
    const cloned = response.clone();
    const data = await cloned.json().catch(() => null);
    console.log("Login response body:", data);
  } catch {
    /* ignore */
  }

  // 헤더에서 토큰 추출
  const accessToken = response.headers
    .get("authorization")
    ?.replace("Bearer ", "");
  const refreshToken = response.headers.get("refresh-token");

  if (!accessToken || !refreshToken) {
    throw new Error("Tokens are missing from the response headers.");
  }

  // 쿠키 저장
  setCookie("accessToken", accessToken, {
    path: "/",
    expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
  });
  setCookie("refreshToken", refreshToken, {
    path: "/",
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
  });

  return response;
}
