import React from "react";
// import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/button.tsx";
import Nav from "../components/nav.tsx";
import BottomInfo from "../components/bottomInfo.tsx";
import "../App.css";

export default function Home() {
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
          {/* <video
            className="main"
            autoPlay
            muted
            loop
            playsInline
            style={{
              filter: "grayscale(1)",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          >
            <source src="../../main_background.mp4" type="video/mp4" />
          </video> */}
        </div>
        {/* <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100vh",
            border: "none",
            opacity: "0.3",
            backgroundColor: "#000",
            zIndex: "-1",
          }}
        ></div> */}

        <motion.div
          id="home"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{
            ease: "easeInOut",
            duration: 1,
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
              Campus Life Assistant,
              <br />
              powered by MCP
            </div>
            <div
              style={{
                marginTop: "40px",
              }}
            >
              <div
                style={{
                  fontFamily: "Suit-SemiBold",
                  fontSize: "20px",
                  color: "#fff",
                  width: "100px",
                  border: "1px solid #fff",
                  borderRadius: "10px",
                  textAlign: "center",
                  padding: "5px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  window.location.href = "/logIn";
                }}
              >
                Start
              </div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "0",
              width: "100%",
              height: "150px",
              // background:
              //   "linear-gradient(0deg, #111015 -10%, rgba(255, 255, 255, 0) 100%",
              display: "flex",
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
              <img
                src="../icon/scroll.png"
                alt="scroll"
                style={{ width: "30px" }}
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          id="introduction"
          initial={{ opacity: 0, y: 40 }}
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
          }}
        >
          <div style={{ width: "70%", textAlign: "center" }}>
            <div
              style={{
                fontFamily: "Suit-Bold",
                fontSize: "40px",
                marginBottom: "20px",
                color: "#fff",
              }}
            >
              Introduction
            </div>
            <div
              style={{
                fontFamily: "Suit-Regular",
                fontSize: "20px",
                color: "#555",
                lineHeight: "1.6",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              상명대학교 통합관리 LLM 서비스는{" "}
              <span style={{ fontFamily: "Suit-SemiBold", color: "#4E7AF4" }}>
                학내 정보 통합
              </span>
              과{" "}
              <span style={{ fontFamily: "Suit-SemiBold", color: "#4E7AF4" }}>
                AI 기반 지원
              </span>
              을 통해 학생과 교직원 모두에게 더 편리한 환경을 제공합니다.
              <br />
              이제 행정, 공지, 상담까지 하나의 플랫폼에서 해결하세요.
            </div>
          </div>
        </motion.div>

        <motion.div
          id="what_is_mcp"
          initial={{ opacity: 0, y: 40 }}
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
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "50px",
              alignItems: "center",
              width: "80%",
              maxWidth: "1100px",
            }}
          >
            <img
              src="../mcp.png"
              alt="mcp"
              style={{
                width: "100%",
                borderRadius: "20px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            />
            <div>
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
              <div
                style={{
                  fontFamily: "Suit-Regular",
                  fontSize: "20px",
                  color: "#555",
                  lineHeight: "1.6",
                }}
              >
                MCP(Model Context Protocol)은{" "}
                <span style={{ fontFamily: "Suit-SemiBold", color: "#4F46E5" }}>
                  모델과 애플리케이션을 안전하고 일관된 방식으로 연결
                </span>
                하기 위한 오픈 표준입니다.
                <br />
                이를 통해 다양한 서비스가 손쉽게 LLM과 통신하며, 확장성과
                보안성을 동시에 확보할 수 있습니다.
              </div>
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
                img: "../team/kwan.png",
              },
              {
                name: "김정찬",
                role: "Team Member",
                img: "../team/chan.png",
              },
              {
                name: "김진석",
                role: "Team Member",
                img: "../team/seok.png",
              },
              {
                name: "맹의현",
                role: "Team Member",
                img: "../team/maeng.png",
              },
              {
                name: "염다인",
                role: "Team Member",
                img: "../team/youm.png",
              },
            ].map((member) => (
              <div
                key={member.name}
                style={{
                  border: "1px solid #fff",
                  borderRadius: "16px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
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
