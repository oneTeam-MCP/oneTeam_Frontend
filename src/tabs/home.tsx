import React, { useState, useEffect } from "react";
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

  const fistFull = "Campus Life Assistant,";
  const secontFull = "powered by MCP";

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
      <Nav type="login" />
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
                fontSize: "65px",
                lineHeight: "1.5",
                color: "#fff",
                marginTop: "80px",
              }}
            >
              {fistText}
              <br />
              <span style={{ fontSize: "50px" }}>
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
                    padding: "2px",
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
              상명대학교 통합관리 LLM 서비스
              <br />
              SMU's는 학교 내 정보 통합과 MCP 기반 기능을 지원합니다.
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
            <div
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
                  marginBottom: "20px",
                  color: "#fff",
                }}
              >
                What is MCP?
              </div>
              <div style={{}}></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          id="team"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease: "easeInOut", duration: 0.8 }}
          style={{
            position: "relative",
            width: "100%",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "60px 20px",
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
                img: "../team/chan.jpg",
              },
              {
                name: "김진석",
                role: "Team Member",
                img: "../team/seok.png",
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
                    height: "120px",
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
