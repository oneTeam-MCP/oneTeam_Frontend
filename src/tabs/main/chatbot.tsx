import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Button from "../../components/button.tsx";
import Nav from "../../components/nav.tsx";
import SideNav from "../../components/side_nav.tsx";

import PostChat from "../../api/mcp/postChat.tsx";
import GetMember from "../../api/api/members/getMemberAPI.tsx";

import "../../App.css";

const SIDENAV_WIDTH = 200;
const LINE_HEIGHT_PX = 26;
const MAX_LINES = 5;
const MAX_HEIGHT = LINE_HEIGHT_PX * MAX_LINES;

type ChatMsg = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

function IntroBubble({
  text,
  animate,
  style,
  onClick,
}: {
  text: string;
  animate: "upDown" | "upDown2";
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  return (
    <div
      style={{
        position: "absolute",
        width: "35%",
        height: "40px",
        border: "#444",
        // boxShadow: "0 0 8px rgba(255,255,255,0.3)",
        background: "#3c4043",
        borderRadius: "20px",
        fontFamily: "Suit-Light",
        fontSize: "16px",
        color: "#fff",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        animation: `${animate} 1.5s ease-in-out infinite`,
        cursor: "pointer",
        ...style,
      }}
      onClick={onClick}
    >
      {text}
    </div>
  );
}
function Bubble({
  role,
  content,
  typing,
}: {
  role: "user" | "assistant";
  content: string;
  typing?: boolean;
}) {
  const isUser = role === "user";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        width: "100%",
      }}
    >
      <div
        className="md"
        style={{
          maxWidth: "70%",
          wordBreak: "break-word",
          padding: "12px 15px",
          borderRadius: "16px",
          background: isUser ? "#4285F4" : "#3c4043",
          color: "#fff",
          boxShadow: "0 0 5px rgba(0,0,0,0.3)",
        }}
      >
        {typing && !content ? (
          <TypingIndicator />
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: (props) => (
                <a
                  {...props}
                  style={{ color: "#4285F4" }}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              ),
              p: (props) => <p {...props} style={{ margin: "0" }} />,
              ul: (props) => (
                <ul
                  {...props}
                  style={{ margin: "10px 0", paddingLeft: "30px" }}
                />
              ),
              ol: (props) => (
                <ol
                  {...props}
                  style={{ margin: "10px 0", paddingLeft: "30px" }}
                />
              ),
              li: (props) => (
                <li
                  {...props}
                  style={{
                    lineHeight: "200%",
                    position: "relative",
                  }}
                />
              ),
              img: (props) => <img {...props} loading="lazy" />,
              // 필요하면 ul/ol/li, code 등 커스터마이즈 가능
            }}
          >
            {content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}
function TypingIndicator() {
  return (
    <div style={{ display: "flex", gap: 6, padding: "8px 12px" }}>
      <Dot /> <Dot style={{ animationDelay: "0.15s" }} />{" "}
      <Dot style={{ animationDelay: "0.3s" }} />
    </div>
  );
}
function Dot({ style }: { style?: React.CSSProperties }) {
  return (
    <span
      style={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: "#fff",
        display: "inline-block",
        animation: "blink 1.1s infinite ease-in-out",
        ...style,
      }}
    />
  );
}

export function normalizeNoticesMarkdown(text: string) {
  let out = text;

  // 1) 제목 뒤 콜론 다음에 바로 목록이 오면, 목록 앞에 빈 줄 1개 추가 (Markdown 목록 인식에 도움)
  out = out.replace(/:\s*(?=\d+\.\s)/, ":\n\n");
  // 2) "…입니다:1. ..." 처럼 붙은 번호목록 앞에 줄바꿈 강제
  //    (lookbehind 없는 안전 버전)
  out = out.replace(/(^|[^\n])(\d+\.\s)/g, (m, a, b) => `${a}\n${b}`);
  // 3) "공지 링크" 뒤에 다음 항목(숫자 목록)이 바로 붙으면 줄바꿈
  out = out.replace(/공지 링크\s*(?=(\d+)\.\s|$)/g, "공지 링크\n");
  // 4) "공지 링크 http://..." 패턴을 실제 링크로 변환 (같은 줄/다음 줄 모두 허용)
  out = out.replace(
    /공지 링크[\t ]*[\r\n]*\s*(https?:\/\/\S+)/gi,
    "[공지 링크]($1)"
  );
  // 5) 과도한 연속 개행 정리
  out = out.replace(/\n{3,}/g, "\n\n").trim();

  return out;
}

export default function Chatbot() {
  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [inputHeight, setInputHeight] = useState(50);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const [showIntro, setShowIntro] = useState(true);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const [helloText, setHelloText] = useState("");
  const [showLogo, setShowLogo] = useState(false);
  const [endText, setEndText] = useState("");

  const [myData, setMyData] = useState<any>(null);

  const helloFull = "안녕하세요,";
  const endFull = "입니다.";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setHelloText(helloFull.slice(0, index + 1));
      index++;
      if (index >= helloFull.length) {
        clearInterval(interval);
        setTimeout(() => setShowLogo(true), 500);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!showLogo) return;
    let index = 0;
    const interval = setInterval(() => {
      setEndText(endFull.slice(0, index + 1));
      index++;
      if (index >= endFull.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, [showLogo]);

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const newHeight = Math.min(el.scrollHeight, MAX_HEIGHT);
    el.style.height = `${newHeight}px`;
    el.style.overflowY = el.scrollHeight > MAX_HEIGHT ? "auto" : "hidden";
    setInputHeight(newHeight + 24);
  };

  useEffect(() => {
    GetMember().then((data) => {
      setMyData(data);
    });
  }, []);

  useEffect(() => {
    autoResize();
  }, [message]);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  const handleSubmit = async (e?: React.FormEvent, customText?: string) => {
    e?.preventDefault();

    const text = (customText ?? message).trim();
    if (!text) return;

    const newUserMsg: ChatMsg = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setMessage("");
    setShowIntro(false);
    setIsTyping(true);

    // 1) 먼저 빈 assistant 버블 하나 추가
    const assistantId = crypto.randomUUID();
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "assistant", content: "" },
    ]);

    let rawBeforeNormalize = "";

    // 2) 스트리밍 시작
    const controller = new AbortController();

    const email = myData.email;
    const studentNum = email.split("@")[0];

    try {
      await PostChat(
        text,
        studentNum,
        (delta) => {
          rawBeforeNormalize += delta;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: m.content + delta } : m
            )
          );
        },
        controller.signal
      );
    } catch (err) {
      console.error(err);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content: (m.content || "") + "\n\n(응답 중 오류가 발생했어요.)",
              }
            : m
        )
      );
    } finally {
      console.groupCollapsed(`[STREAM DONE] assistantId=${assistantId}`);
      console.log("%cRAW (before normalize):", "color:#888");
      console.log(rawBeforeNormalize);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: normalizeNoticesMarkdown(m.content) }
            : m
        )
      );
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div>
      <Nav />
      <SideNav type="chatbot" open={open} setOpen={setOpen} />
      <div
        style={{
          width: `calc(100% - ${open ? SIDENAV_WIDTH : 0}px)`,
          marginLeft: open ? `${SIDENAV_WIDTH}px` : "0px",
          height: "92vh",
          marginTop: "4vh",
          marginBottom: "8vh",
          display: "flex",
          justifyContent: "center",
          transition: "width .25s ease, margin-left .25s ease",
        }}
      >
        <div
          style={{
            width: "1200px",
            minWidth: "40vw",
            padding: "0 20px",
            textAlign: "left",
          }}
        >
          <div
            style={{
              fontFamily: "Suit-SemiBold",
              fontSize: "30px",
              color: "#fff",
              width: "250px",
              minWidth: "200px",
              height: "6vh",
              marginBottom: "10px",
            }}
          >
            Chatbot AI
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "relative",
            }}
          >
            <div
              style={{
                boxSizing: "border-box",
                width: "100%",
                height: "100%",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "2px 2px 5px rgba(0,0,0,0.08)",
              }}
            >
              {showIntro ? (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                    paddingTop: "80px",
                    position: "relative",
                    animation:
                      messages.length > 0
                        ? "fadeOutUp .4s ease forwards"
                        : "none",
                  }}
                >
                  <div style={{ height: "100px", marginBottom: "20px" }}>
                    <div
                      style={{
                        fontFamily: "Suit-SemiBold",
                        fontSize: "30px",
                      }}
                    >
                      {helloText}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontFamily: "Suit-SemiBold",
                        fontSize: "50px",
                      }}
                    >
                      {showLogo && (
                        <>
                          <img
                            src="../logo/logo_w.png"
                            style={{ width: "150px" }}
                          />
                          <span style={{ marginLeft: "10px" }}>{endText}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      position: "relative",
                      fontFamily: "Suit-Regular",
                      fontSize: "16px",
                      width: "100%",
                      height: "300px",
                    }}
                  >
                    <IntroBubble
                      style={{ top: 30, left: "2.5vw" }}
                      animate="upDown"
                      text="오늘 올라온 새로운 공지 알려줘."
                      onClick={() =>
                        handleSubmit(
                          undefined,
                          "오늘 올라온 새로운 공지 알려줘."
                        )
                      }
                    />
                    <IntroBubble
                      style={{ top: 50, right: "2.5vw" }}
                      animate="upDown2"
                      text="알림 온 거 있어?"
                      onClick={() =>
                        handleSubmit(undefined, "알림 온 거 있어?")
                      }
                    />
                    <IntroBubble
                      style={{ top: 120, left: "25vw" }}
                      animate="upDown2"
                      text="오늘 학식은 뭐야?"
                      onClick={() =>
                        handleSubmit(undefined, "오늘 학식은 뭐야?")
                      }
                    />
                    <IntroBubble
                      style={{ top: 200, left: "5vw" }}
                      animate="upDown"
                      text="교환학생 관련 공지 찾아줘."
                      onClick={() =>
                        handleSubmit(undefined, "교환학생 관련 공지 찾아줘.")
                      }
                    />
                    <IntroBubble
                      style={{ top: 230, right: "7vw" }}
                      animate="upDown"
                      text="딥러닝 중간고사 문제 알려줘."
                      onClick={() =>
                        handleSubmit(undefined, "딥러닝 중간고사 문제 알려줘.")
                      }
                    />
                  </div>
                </div>
              ) : (
                <div
                  ref={listRef}
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "24px 24px 120px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {messages.map((m) => (
                    <Bubble
                      key={m.id}
                      role={m.role}
                      content={m.content}
                      typing={isTyping}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: open ? `${SIDENAV_WIDTH}px` : "0px",
          width: `calc(100% - ${open ? SIDENAV_WIDTH : 0}px)`,
          display: "flex",
          justifyContent: "center",
          transition: "width .25s ease, left .25s ease",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            width: "1200px",
            minWidth: "40vw",
            padding: "0 20px",
          }}
        >
          <div
            style={{
              width: "100%",
              height: `${inputHeight}px`,
              borderRadius: "15px",
              background: "#0b0f0e",
              boxShadow: "0 0 8px rgba(255,255,255,0.6)",
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div style={{ width: "5%", height: "100%", maxHeight: "150px" }} />
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onInput={autoResize}
              onKeyDown={handleKeyDown}
              placeholder="메시지를 입력하세요..."
              style={{
                fontFamily: "Suit-Regular",
                fontSize: "18px",
                lineHeight: `${LINE_HEIGHT_PX}px`,
                width: "90%",
                minHeight: `${LINE_HEIGHT_PX}px`,
                maxHeight: `${MAX_HEIGHT}px`,
                overflowY: "hidden",
                resize: "none",
                border: "none",
                outline: "none",
                boxShadow: "none",
                padding: "0",
                marginBottom: "12px",
                background: "#0b0f0e",
                color: "#fff",
              }}
              rows={1}
            />
            <div
              style={{
                position: "relative",
                width: "5%",
                minWidth: "35px",
                paddingRight: "5px",
                height: "50px",
              }}
            >
              <img
                onClick={() => handleSubmit()}
                alt="send"
                src="../btn/upload_enabled.png"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "35px",
                  cursor: message.trim() ? "pointer" : "default",
                  opacity: message.trim() ? 1 : 0.5,
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
