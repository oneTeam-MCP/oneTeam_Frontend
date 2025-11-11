// import { getCookie, removeCookie } from "../cookies.tsx";
// import getAccessTokenWithRefreshToken from "../getAccessTokenWithRefreshToken.tsx";

const API_SERVER_DOMAIN = "https://mcp.oneteam-mcp.site";

export default async function postChat(
  text: string,
  studentNum: string,
  onDelta: (delta: string) => void,
  signal?: AbortSignal
): Promise<void> {
  console.log(`학번: ${studentNum}, question: 올해는 2025년이야. ` + text);

  const res = await fetch(`${API_SERVER_DOMAIN}/chat/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      question: `user_id: ${studentNum}, question: ` + text,
    }),
    signal,
  });

  if (!res.ok || !res.body) {
    const raw = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} ${raw}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    // \n 기준으로 한 줄씩 처리
    let nl;
    while ((nl = buffer.indexOf("\n")) >= 0) {
      // 줄 끝 CR 제거만 (공백 유지!)
      const rawLine = buffer.slice(0, nl).replace(/\r$/, "");
      buffer = buffer.slice(nl + 1);

      if (rawLine === "") {
        onDelta("\n");
        continue;
      }
      // onDelta(rawLine.slice(6));

      if (rawLine.startsWith("data:")) {
        const payload = rawLine.startsWith("data: ")
          ? rawLine.slice(6)
          : rawLine.slice(5);
        onDelta(payload);
      }
      // 그 외 라인은 무시
    }
  }

  // 남은 조각 처리
  if (buffer.startsWith("data:")) {
    const payload = buffer.startsWith("data: ")
      ? buffer.slice(6)
      : buffer.slice(5);
    onDelta(payload === "" ? "\n" : payload);
  }
}
