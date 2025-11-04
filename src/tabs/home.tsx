import React, { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/button.tsx";
import Nav from "../components/nav.tsx";
import BottomInfo from "../components/bottomInfo.tsx";
import "../App.css";

export default function Home() {
  const [fistText, setFirstText] = useState("");
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);
  const [secondText, setSecontText] = useState("");

  const vRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true); // 처음엔 자동재생 위해 음소거

  const fistFull = "Campus Life Assistant,";
  const secontFull = "powered by MCP";

  const handleToggleMute = async () => {
    const v = vRef.current;
    if (!v) return;

    try {
      if (isMuted) {
        // 🔊 언뮤트
        v.muted = false;
        v.removeAttribute("muted");
        v.volume = 1.0;
        await v.play(); // 사용자 제스처 안에서라 OK
        setIsMuted(false);
      } else {
        // 🔇 다시 음소거
        v.muted = true;
        v.setAttribute("muted", ""); // iOS/Safari 호환
        // 어떤 브라우저는 muted 변경 시 재생상태 흔들릴 수 있어 play 보강
        try {
          await v.play();
        } catch {}
        setIsMuted(true);
      }
    } catch {
      // 정책에 막히면 컨트롤 노출
      v.setAttribute("controls", "controls");
    }
  };

  const handleError = (e) => {
    const v = e.currentTarget;
    const hasAudio =
      (v.audioTracks && v.audioTracks.length > 0) ||
      v.mozHasAudio ||
      v.webkitAudioDecodedByteCount > 0;
    console.log("hasAudio:", !!hasAudio, v.error); // 콘솔에서 바로 확인
  };

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setFirstText(fistFull.slice(0, index + 1));
      index++;
      if (index >= fistFull.length) {
        clearInterval(interval);
        setTimeout(() => setShowSecond(true), 200);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!showSecond) return;
    let index = 0;
    const interval = setInterval(() => {
      setSecontText(secontFull.slice(0, index + 1));
      index++;
      if (index >= secontFull.length) {
        clearInterval(interval);
        setTimeout(() => setShowThird(true), 300);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [showSecond]);

  return (
    <div>
      <Nav type="home" />
      <div style={{ width: "100%" }}>
        <div
          style={{
            position: "absolute",
            top: " 0",
            left: "0",
            width: "100%",
            height: "100vh",
            opacity: "1",
            zIndex: "-2",
          }}
        >
          <img
            src="../../home_background3.png"
            alt="main_background"
            style={{
              width: "100%",
              height: "120%",
              objectFit: "cover",
            }}
          />
        </div>

        <motion.div
          id="home"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{
            ease: "easeInOut",
            duration: 0,
          }}
          style={{
            position: "relative",
            width: "100%",
            height: "120vh",
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "left", width: "800px", padding: "80px" }}>
            <div
              style={{
                fontFamily: "Suit-ExtraBold",
                fontSize: "clamp(40px, 6vw, 65px)",
                lineHeight: "1.5",
                color: "#fff",
                marginTop: "80px",
              }}
            >
              {fistText}
              <br />
              <span style={{ fontSize: "clamp(30px, 4.5vw, 50px)" }}>
                {showSecond && secondText}
              </span>
            </div>
            <div
              style={{
                marginTop: "40px",
              }}
            >
              {showThird && (
                <div
                  style={{
                    position: "relative",
                    display: "inline-block",
                    borderRadius: "12px",
                    animation: "spinGlow 3s linear infinite", // CSS 애니메이션만 외부로 분리
                    cursor: "pointer",
                  }}
                  onClick={() => (window.location.href = "/logIn")}
                >
                  <div
                    style={{
                      fontFamily: "Suit-SemiBold",
                      fontSize: "20px",
                      color: "#fff",
                      backgroundColor: "rgba(0,0,0,0.85)",
                      width: "100px",
                      height: "30px",
                      textAlign: "center",
                      border: " 1px solid #fff",
                      borderRadius: "10px",
                      padding: "8px 10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.fontSize = "22px";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.fontSize = "20px";
                    }}
                  >
                    Start
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "0",
              width: "100%",
              height: "150px",
              background:
                "linear-gradient(0deg, rgba(11, 15, 14, 1) -10%, rgba(11, 15, 14, 0) 100%",
              justifyContent: "right",
              alignItems: "center",
            }}
          >
            <motion.div
              animate={{
                y: [0, 10, 0], // 위아래 움직임
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity, // 무한 반복
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                bottom: "25vh",
                right: "80px",
                width: "100px",
              }}
            >
              <div
                style={{
                  fontFamily: "Suit-Light",
                  fontSize: "20px",
                  color: "#fff",
                  marginBottom: "5px",
                }}
              >
                Scroll
              </div>
              <div
                style={{
                  fontSize: "25px",
                  width: "40px",
                  height: "40px",
                  margin: "0 auto",
                  border: "2px solid #fff",
                  borderRadius: "50%",
                }}
              >
                ↓
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          id="introduction"
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease: "easeInOut", duration: 1 }}
          style={{
            position: "relative",
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "5",
          }}
        >
          <div style={{ width: "80%", textAlign: "left" }}>
            <div
              style={{
                fontFamily: "Suit-Bold",
                fontSize: "40px",
                marginBottom: "40px",
                color: "#fff",
                lineHeight: "1.6",
              }}
            >
              상명대학교 통합관리 LLM 서비스{" "}
              <span style={{ color: "#4285f4" }}>SMU's</span>는
              <br />
              학교 내 정보 통합과 MCP 기반 기능을 지원합니다.
            </div>
            <div
              style={{
                fontFamily: "Suit-Light",
                fontSize: "16px",
                color: "#fff",
                lineHeight: "1.8",
                margin: "0 auto",
              }}
            >
              SMU's는 상명대학교 학생들을 위한 AI 기반 통합관리 서비스로, 학교
              생활에 필요한 주요한 정보를 한 눈에 제공합니다.
              <br />
              MCP(Model Context Protocol)를 활용하여, 학사 일정, 강의 정보, 학교
              공지 등 다양한 데이터를 통합 관리하며, 학생들에게 보다 효율적인
              학교 생활을 지원합니다.
            </div>
          </div>
        </motion.div>

        <motion.div
          id="what_is_mcp"
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease: "easeInOut", duration: 0.8 }}
          style={{
            position: "relative",
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "0",
              width: "100%",
              height: "150px",
              justifyContent: "right",
              alignItems: "center",
            }}
          ></div>
          <div
            style={{
              alignItems: "center",
              width: "80%",
              maxWidth: "1100px",
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100vh",
                objectFit: "cover",
                opacity: "0.4",
                zIndex: "-1",
              }}
            >
              <source src="../../background_2.mp4" type="video/mp4" />
            </video>
            <motion.div
              id="introduction"
              initial={{ opacity: 0, y: 200 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ease: "easeInOut", duration: 1 }}
              style={{
                border: "1px solid rgba(99, 89, 191, 0.5)",
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)", // 사파리
                borderRadius: "15px",
                padding: "24px",
                zIndex: "2",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              }}
            >
              <div
                style={{
                  fontFamily: "Suit-Bold",
                  fontSize: "40px",
                  marginBottom: "50px",
                  color: "#fff",
                }}
              >
                What is MCP?
              </div>
              <div
                style={{
                  fontFamily: "Suit-Light",
                  fontSize: "18px",
                  lineHeight: "1.8",
                  marginBottom: "50px",
                }}
              >
                MCP (Model Context Protocol)란 대규모 언어 모델(LLM)과 외부
                시스템을 연결하여,
                <br />
                사용자의 자연어 요청을 이해 가능한 데이터로 변환하는 통합
                프로토콜 입니다.
              </div>
              <div
                style={{
                  maxWidth: "750px",
                  margin: "50px auto",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: "120px",
                    background: "#fff",
                    border: "1px solid #4285F4",
                    borderRadius: "10px",
                    color: "#000",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{ fontFamily: "suit-ExtrABold", fontSize: "20px" }}
                  >
                    LLM 모델
                    <br />
                    <span
                      style={{ fontFamily: "suit-Regular", fontSize: "16px" }}
                    >
                      GPT-4o
                    </span>
                  </div>
                </div>
                <div style={{ fontSize: "30px" }}>➩</div>
                <div
                  style={{
                    width: "200px",
                    height: "120px",
                    background: "#4285F4",
                    border: "1px solid #4285F4",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{ fontFamily: "suit-ExtrABold", fontSize: "20px" }}
                  >
                    MCP
                    <br />
                    <span
                      style={{ fontFamily: "suit-Regular", fontSize: "16px" }}
                    >
                      Model Context Protocol
                    </span>
                  </div>
                </div>
                <div style={{ fontSize: "30px" }}>➩</div>
                <div
                  style={{
                    width: "200px",
                    height: "120px",
                    background: "#fff",
                    border: "1px solid #4285F4",
                    borderRadius: "10px",
                    color: "#000",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{ fontFamily: "suit-ExtrABold", fontSize: "20px" }}
                  >
                    외부 시스템
                    <br />
                    <span
                      style={{ fontFamily: "suit-Regular", fontSize: "16px" }}
                    >
                      DB, API, 파일
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ fontFamily: "suit-SemiBold", fontSize: "18px" }}>
                SMU's는 MCP를 통해 분산된 학사•행정 정보를 하나의 대화형
                인터페이스로 통합하여 제공합니다.
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          id="demo"
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease: "easeInOut", duration: 0.8 }}
          style={{
            position: "relative",
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "80%",
              textAlign: "left",
              position: "relative",
            }}
          >
            <video
              ref={vRef}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onError={handleError}
              style={{ width: "100%", height: "88vh", objectFit: "contain" }}
            >
              <source src="/demo2.webm" type="video/webm" />
              <source src="/demo2.mp4" type="video/mp4" />
            </video>
            <div
              onClick={handleToggleMute}
              style={{
                position: "absolute",
                right: "0",
                bottom: "0",
                padding: "10px 16px",
                borderRadius: "10px",
                background: "rgba(0,0,0,1)",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              {isMuted ? (
                <img src="/btn/sound_enabled.png" style={{ width: 30 }} />
              ) : (
                <img src="/btn/sound_disabled.png" style={{ width: 30 }} />
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          id="start"
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease: "easeInOut", duration: 1 }}
          style={{
            position: "relative",
            width: "100%",
            height: "85vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ width: "80%", textAlign: "left" }}>
            <div
              style={{
                fontFamily: "Suit-Bold",
                fontSize: "40px",
                marginBottom: "20px",
                color: "#fff",
                lineHeight: "1.6",
              }}
            >
              똑똑한 캠퍼스 생활, 지금 바로 시작하세요.
            </div>
            <div
              style={{
                fontFamily: "Suit-Light",
                fontSize: "20px",
                color: "#fff",
                lineHeight: "1.8",
                margin: "0 auto",
                marginBottom: "60px",
              }}
            >
              흩어진 학교와 학생의 학사 정보를{" "}
              <span style={{ fontFamily: "Suit-SemiBold", color: "#4285f4" }}>
                하나로
              </span>
              !
              <br />
              AI Agent가 함께하는 스마트 캠퍼스 라이프의{" "}
              <span style={{ fontFamily: "Suit-SemiBold", color: "#4285f4" }}>
                중심
              </span>
              !
              <br />
              당신만의 캠퍼스 허브{" "}
              <span style={{ fontFamily: "Suit-SemiBold", color: "#4285f4" }}>
                SMU's
              </span>
              !
            </div>
            <div
              style={{
                position: "relative",
                display: "inline-block",
                animation: "spinGlow 3s linear infinite", // CSS 애니메이션만 외부로 분리
                cursor: "pointer",
              }}
              onClick={() => (window.location.href = "/logIn")}
            >
              <div
                style={{
                  fontFamily: "Suit-Regular",
                  fontSize: "14px",
                  color: "#fff",
                  backgroundColor: "rgba(0,0,0,0.85)",
                  width: "100px",
                  height: "25px",
                  textAlign: "center",
                  border: " 1px solid #fff",
                  borderRadius: "20px",
                  padding: "8px 10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.fontSize = "15px";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.fontSize = "14px";
                }}
              >
                시작하러 가기
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          id="team"
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease: "easeInOut", duration: 1 }}
          style={{
            position: "relative",
            width: "100%",
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 0 80px",
          }}
        >
          <div
            style={{
              fontFamily: "Suit-Bold",
              fontSize: "40px",
              marginBottom: "40px",
              color: "#fff",
            }}
          >
            Team
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              width: "80%",
              maxWidth: "1100px",
            }}
          >
            {[
              {
                name: "김재관",
                role: "Team Leader",
                img: "../team/kwan.jpg",
              },
              {
                name: "김정찬",
                role: "Team Member",
                img: "../team/chan.png",
              },
              {
                name: "김진석",
                role: "Team Member",
                img: "../team/seok.jpg",
              },
              {
                name: "맹의현",
                role: "Team Member",
                img: "../team/maeng.jpg",
              },
              {
                name: "염다인",
                role: "Team Member",
                img: "../team/youm.jpg",
              },
            ].map((member) => (
              <div
                key={member.name}
                style={{
                  border: "1px solid rgba(99, 89, 191, 0.5)",
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(6px)",
                  WebkitBackdropFilter: "blur(6px)", // 사파리
                  borderRadius: "15px",
                  padding: "20px",
                  textAlign: "center",
                  transition: "transform 0.2s",
                }}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  style={{
                    width: "120px",
                    height: "150px",
                    borderRadius: "10px",
                    objectFit: "cover",
                    marginBottom: "15px",
                  }}
                />
                <div
                  style={{
                    fontFamily: "Suit-SemiBold",
                    fontSize: "20px",
                    color: "#fff",
                    marginBottom: "8px",
                  }}
                >
                  {member.name}
                </div>
                <div
                  style={{
                    fontFamily: "Suit-Light",
                    fontSize: "16px",
                    color: "#666",
                  }}
                >
                  {member.role}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <BottomInfo />
      </div>
    </div>
  );
}
