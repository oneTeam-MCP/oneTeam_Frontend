import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../components/button.tsx";
import Nav from "../../components/nav.tsx";
import SideNav from "../../components/side_nav.tsx";

import "../../App.css";

const SIDENAV_WIDTH = 200;

export default function Dashboard() {
  const [open, setOpen] = useState(true);

  const [alertTab, setAlertTab] = useState<"샘물" | "이캠">("샘물");
  const [noticeTab, setNoticeTab] = useState<"통합" | "학과">("통합");

  const [adIdx, setAdIdx] = useState(0);
  const [progress, setProgress] = useState(0); // 현재 width (%)

  const ADS: string[] = ["../ad/ad_1.png", "../ad/ad_2.png", "../ad/ad_3.png"];
  const ADS_LINK: any[] = [
    NaN,
    "https://biohealth.smu.ac.kr/biohealth/index.do",
    "https://smu-bamboo.com/",
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setAdIdx((i) => (i + 1) % ADS.length);
    }, 3000); // 5초마다 다음 배너
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(53);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Nav />
      <SideNav type="dashboard" open={open} setOpen={setOpen} />
      <div
        style={{
          width: `calc(100% - ${open ? SIDENAV_WIDTH : 0}px)`,
          marginLeft: open ? `${SIDENAV_WIDTH}px` : "0px",
          minHeight: "92vh",
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
            Dashboard
          </div>
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "590px",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  width: "100%",
                  height: "400px",
                  marginBottom: "20px",
                  background: "#1b1c1d",
                  border: "1px solid #444",
                  borderRadius: "20px",
                }}
              >
                <div
                  style={{
                    boxSizing: "border-box",
                    fontFamily: "Suit-SemiBold",
                    fontSize: "22px",
                    width: "100%",
                    padding: "10px 3%",
                    marginBottom: "20px",
                  }}
                >
                  TODO 리스트
                </div>
                <div
                  style={{
                    boxSizing: "border-box",
                    width: "94%",
                    height: "80px",
                    background: "#3c4043",
                    borderRadius: "10px",
                    margin: "10px 3%",
                    padding: "0 10px",
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "10%",
                      padding: "3px 0",
                      background: "#FFD9CF",
                      fontFamily: "Suit-SemiBold",
                      fontSize: "18px",
                      color: "#E82E2E",
                      borderRadius: "10px",
                      textAlign: "center",
                      border: "1px solid #FFD9CF",
                    }}
                  >
                    D-1
                  </div>
                  <div
                    style={{
                      boxSizing: "border-box",
                      width: "40%",
                      padding: "0 10px",
                      fontFamily: "Suit-Regular",
                      fontSize: "16px",
                    }}
                  >
                    컴퓨터네트워크프로그래밍
                  </div>
                  <div
                    style={{
                      width: "40%",
                      height: "10px",
                      background: "#ddd",
                      borderRadius: "8px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        width: `${progress}%`,
                        height: "10px",
                        background: "#4285F4",
                        borderRadius: "8px",
                        transition: "width 0.8s ease-in-out",
                      }}
                    ></div>
                  </div>
                  <div
                    style={{
                      boxSizing: "border-box",
                      width: "5%",
                      padding: "0 10px",
                      fontFamily: "Suit-Light",
                      fontSize: "12px",
                      color: "#fff",
                    }}
                  >
                    53%
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  width: "100%",
                  height: "400px",
                  marginBottom: "10px",
                  background: "#1b1c1d",
                  border: "1px solid #444",
                  borderRadius: "20px",
                }}
              >
                <div
                  style={{
                    boxSizing: "border-box",
                    fontFamily: "Suit-SemiBold",
                    fontSize: "22px",
                    width: "100%",
                    padding: "10px 3%",
                    marginBottom: "20px",
                  }}
                >
                  미제출 과제
                </div>
                <div
                  style={{
                    boxSizing: "border-box",
                    width: "94%",
                    height: "80px",
                    background: "#3c4043",
                    borderRadius: "10px",
                    margin: "10px 3%",
                    padding: "0 10px",
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "10%",
                      padding: "3px 0",
                      background: "#FFD9CF",
                      fontFamily: "Suit-SemiBold",
                      fontSize: "18px",
                      color: "#E82E2E",
                      borderRadius: "10px",
                      textAlign: "center",
                      border: "1px solid #FFD9CF",
                    }}
                  >
                    D-1
                  </div>
                  <div
                    style={{
                      boxSizing: "border-box",
                      width: "40%",
                      padding: "0 10px",
                      fontFamily: "Suit-Regular",
                      fontSize: "16px",
                    }}
                  >
                    컴퓨터네트워크프로그래밍
                  </div>
                  <div
                    style={{
                      width: "40%",
                      height: "10px",
                      background: "#ddd",
                      borderRadius: "8px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        width: `${progress}%`,
                        height: "10px",
                        background: "#4285F4",
                        borderRadius: "8px",
                        transition: "width 0.8s ease-in-out",
                      }}
                    ></div>
                  </div>
                  <div
                    style={{
                      boxSizing: "border-box",
                      width: "5%",
                      padding: "0 10px",
                      fontFamily: "Suit-Light",
                      fontSize: "12px",
                      color: "#fff",
                    }}
                  >
                    53%
                  </div>
                </div>
                <div
                  style={{
                    boxSizing: "border-box",
                    width: "94%",
                    height: "80px",
                    background: "#3c4043",
                    borderRadius: "10px",
                    margin: "10px 3%",
                    padding: "0 10px",
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "10%",
                      padding: "3px 0",
                      background: "#FFD9CF",
                      fontFamily: "Suit-SemiBold",
                      fontSize: "18px",
                      color: "#E82E2E",
                      borderRadius: "10px",
                      textAlign: "center",
                      border: "1px solid #FFD9CF",
                    }}
                  >
                    D-1
                  </div>
                  <div
                    style={{
                      boxSizing: "border-box",
                      width: "40%",
                      padding: "0 10px",
                      fontFamily: "Suit-Regular",
                      fontSize: "16px",
                    }}
                  >
                    컴퓨터
                  </div>
                  <div
                    style={{
                      width: "40%",
                      height: "10px",
                      background: "#ddd",
                      borderRadius: "8px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        width: `${progress}%`,
                        height: "10px",
                        background: "#4285F4",
                        borderRadius: "8px",
                        transition: "width 0.8s ease-in-out",
                      }}
                    ></div>
                  </div>
                  <div
                    style={{
                      boxSizing: "border-box",
                      width: "5%",
                      padding: "0 10px",
                      fontFamily: "Suit-Light",
                      fontSize: "12px",
                      color: "#fff",
                    }}
                  >
                    53%
                  </div>
                </div>
              </motion.div>
            </div>

            <div
              style={{
                width: "590px",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: "relative",
                  width: "100%",
                  height: "70px",
                  marginBottom: "20px",
                  overflow: "hidden",
                  borderRadius: "10px",
                }}
              >
                {/* 슬라이드 트랙 */}
                <div
                  style={{
                    display: "flex",
                    width: `${ADS.length * 100}%`,
                    height: "100%",
                    transform: `translateX(-${adIdx * (100 / ADS.length)}%)`,
                    transition: "transform 0.6s ease",
                  }}
                >
                  {ADS.map((src, i) => {
                    const hasLink = !!ADS_LINK[i]; // 링크 존재 여부 확인

                    return (
                      <img
                        key={src}
                        src={src}
                        alt={`ad-${i}`}
                        style={{
                          width: `${100 / ADS.length}%`,
                          height: "100%",
                          objectFit: "cover",
                          flexShrink: 0,
                          cursor: hasLink ? "pointer" : "default", // 링크 없으면 커서 기본
                          opacity: hasLink ? 1 : 0.8, // 시각적으로 비활성화 느낌 (선택)
                        }}
                        onClick={
                          hasLink
                            ? () =>
                                window.open(
                                  ADS_LINK[i],
                                  "_blank",
                                  "noopener,noreferrer"
                                )
                            : undefined // 없으면 클릭 무효
                        }
                      />
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  width: "100%",
                  height: "360px",
                  marginBottom: "20px",
                  background: "#1b1c1d",
                  border: "1px solid #444",
                  borderRadius: "20px",
                  boxShadow: "2px 2px 5px rgba(0,0,0,0.08)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {["샘물", "이캠"].map((tab) => (
                    <div
                      key={tab}
                      onClick={() => setAlertTab(tab as "샘물" | "이캠")}
                      style={{
                        boxSizing: "border-box",
                        width: "50%",
                        textAlign: "center",
                        marginBottom: "20px",
                        padding: "12px 0",
                        cursor: "pointer",
                        fontFamily:
                          alertTab === tab ? "Suit-SemiBold" : "Suit-Regular",
                        fontSize: "18px",
                        background: alertTab === tab ? "#1b1c1d" : "#222",
                        color: alertTab === tab ? "#4285f3" : "#aaa",
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                        boxShadow:
                          alertTab === tab && tab === "샘물"
                            ? "2px -4px 4px rgba(255,255,255,0.1)"
                            : alertTab === tab && tab === "이캠"
                            ? "-2px -4px 4px rgba(255,255,255,0.1)"
                            : alertTab !== tab
                            ? "inset 0 -4px 4px rgba(255,255,255,0.08)"
                            : "none",
                        zIndex: alertTab === tab ? "10" : "0",
                      }}
                    >
                      {tab} 알림
                    </div>
                  ))}
                </div>
                <div>
                  {alertTab === "샘물" ? (
                    <div
                      style={{
                        boxSizing: "border-box",
                        width: "96%",
                        height: "60px",
                        border: "1px solid #000",
                        margin: "0 2% 10px",
                      }}
                    >
                      샘물 알림
                    </div>
                  ) : (
                    <div
                      style={{
                        boxSizing: "border-box",
                        width: "96%",
                        height: "60px",
                        border: "1px solid #000",
                        margin: "0 2% 10px",
                      }}
                    >
                      이캠 알림
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  width: "100%",
                  height: "350px",
                  background: "#1b1c1d",
                  border: "1px solid #444",
                  borderRadius: "20px",
                  boxShadow: "2px 2px 5px rgba(0,0,0,0.08)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {["통합", "학과"].map((tab) => (
                    <div
                      key={tab}
                      onClick={() => setNoticeTab(tab as "통합" | "학과")}
                      style={{
                        boxSizing: "border-box",
                        width: "50%",
                        textAlign: "center",
                        marginBottom: "20px",
                        padding: "12px 0",
                        cursor: "pointer",
                        fontFamily:
                          noticeTab === tab ? "Suit-SemiBold" : "Suit-Regular",
                        fontSize: "18px",
                        background: noticeTab === tab ? "#1b1c1d" : "#222",
                        color: noticeTab === tab ? "#4285f3" : "#aaa",
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                        boxShadow:
                          noticeTab === tab && tab === "통합"
                            ? "2px -4px 6px rgba(255,255,255,0.08)"
                            : noticeTab === tab && tab === "학과"
                            ? "-2px -4px 6px rgba(255,255,255,0.08)"
                            : noticeTab !== tab
                            ? "inset 0 -4px 4px rgba(255,255,255,0.08)"
                            : "none",
                        zIndex: noticeTab === tab ? "10" : "0",
                      }}
                    >
                      {tab} 공지
                    </div>
                  ))}
                </div>
                <div>
                  {noticeTab === "통합" ? (
                    <div
                      style={{
                        boxSizing: "border-box",
                        width: "96%",
                        height: "60px",
                        border: "1px solid #000",
                        margin: "0 2% 10px",
                      }}
                    >
                      통합 공지
                    </div>
                  ) : (
                    <div
                      style={{
                        boxSizing: "border-box",
                        width: "96%",
                        height: "60px",
                        border: "1px solid #000",
                        margin: "0 2% 10px",
                      }}
                    >
                      학과 공지
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
