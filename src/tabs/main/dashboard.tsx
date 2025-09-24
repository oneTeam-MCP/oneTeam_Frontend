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

  const [progress, setProgress] = useState(0); // 현재 width (%)

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
          marginTop: "8vh",
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
              fontFamily: "Pretendard-SemiBold",
              fontSize: "25px",
              width: "250px",
              minWidth: "200px",
              height: "6vh",
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
                  height: "70px",
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    fontFamily: "Pretendard-SemiBold",
                    fontSize: "18px",
                    marginBottom: "10px",
                    background: "#FAFAFC",
                    border: "1px solid #CED0F8",
                    borderRadius: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    boxShadow: "2px 2px 5px rgba(0,0,0,0.08)",
                  }}
                  onClick={() => {
                    window.location.href = "/subject";
                  }}
                >
                  오늘 수업 {`1`}개
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    fontFamily: "Pretendard-SemiBold",
                    fontSize: "18px",
                    marginBottom: "10px",
                    background: "#FFD9CF",
                    border: "1px solid #F8CEDB",
                    borderRadius: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    boxShadow: "2px 2px 5px rgba(0,0,0,0.08)",
                  }}
                  onClick={() => {
                    window.location.href = "/subject";
                  }}
                >
                  마감 임박 {`3`}개
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  width: "100%",
                  height: "350px",
                  marginBottom: "10px",
                  background: "#FAFAFC",
                  border: "1px solid #CED0F8",
                  borderRadius: "20px",
                  boxShadow: "2px 2px 5px rgba(0,0,0,0.08)",
                }}
              >
                <div
                  style={{
                    boxSizing: "border-box",
                    fontFamily: "Pretendard-SemiBold",
                    fontSize: "20px",
                    width: "100%",
                    padding: "10px 15px",
                    borderBottom: "1px solid #CED0F8",
                    marginBottom: "20px",
                  }}
                >
                  미시청 강의
                </div>
                <div
                  style={{
                    boxSizing: "border-box",
                    width: "96%",
                    height: "60px",
                    background: "#fff",
                    borderRadius: "10px",
                    margin: "10px 2%",
                    padding: "0 10px",
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    border: "1px solid #eee",
                  }}
                >
                  <div
                    style={{
                      width: "10%",
                      padding: "3px 0",
                      background: "#FFD9CF",
                      fontFamily: "Pretendard-SemiBold",
                      fontSize: "18px",
                      color: "#E82E2E",
                      borderRadius: "10px",
                      textAlign: "center",
                      border: "1px solid #F8CEDB",
                    }}
                  >
                    D-1
                  </div>
                  <div
                    style={{
                      boxSizing: "border-box",
                      width: "35%",
                      padding: "0 10px",
                      fontFamily: "Pretendard-Regular",
                      fontSize: "16px",
                    }}
                  >
                    컴퓨터네트워크프로그래밍
                  </div>
                  <div
                    style={{
                      width: "45%",
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
                        background: "green",
                        borderRadius: "8px",
                        transition: "width 0.8s ease-in-out",
                      }}
                    ></div>
                  </div>
                  <div
                    style={{
                      boxSizing: "border-box",
                      width: "10%",
                      padding: "0 10px",
                      fontFamily: "Pretendard-Light",
                      fontSize: "12px",
                      color: "#555",
                    }}
                  >
                    53%
                  </div>
                </div>
                <div
                  style={{
                    boxSizing: "border-box",
                    width: "96%",
                    height: "50px",
                    background: "#fff",
                    borderRadius: "10px",
                    margin: "0 2%",
                    padding: "0 10px",
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    border: "1px solid #eee",
                  }}
                >
                  <div
                    style={{
                      width: "10%",
                      padding: "3px 0",
                      background: "#FFD9CF",
                      fontFamily: "Pretendard-SemiBold",
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
                      width: "35%",
                      padding: "0 10px",
                      fontFamily: "Pretendard-Regular",
                      fontSize: "16px",
                    }}
                  >
                    컴퓨터네트워크프로그래밍
                  </div>
                  <div
                    style={{
                      width: "45%",
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
                        background: "green",
                        borderRadius: "8px",
                        transition: "width 0.8s ease-in-out",
                      }}
                    ></div>
                  </div>
                  <div
                    style={{
                      boxSizing: "border-box",
                      width: "10%",
                      padding: "0 10px",
                      fontFamily: "Pretendard-Light",
                      fontSize: "12px",
                      color: "#555",
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
                  background: "#FAFAFC",
                  border: "1px solid #CED0F8",
                  borderRadius: "20px",
                  boxShadow: "2px 2px 5px rgba(0,0,0,0.08)",
                }}
              >
                <div
                  style={{
                    boxSizing: "border-box",
                    fontFamily: "Pretendard-SemiBold",
                    fontSize: "20px",
                    width: "100%",
                    padding: "10px 15px",
                    borderBottom: "1px solid #CED0F8",
                    marginBottom: "20px",
                  }}
                >
                  미제출 과제
                </div>
                <div
                  style={{
                    boxSizing: "border-box",
                    width: "96%",
                    height: "60px",
                    background: "#fff",
                    borderRadius: "10px",
                    margin: "10px 2%",
                    padding: "0 10px",
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    border: "1px solid #eee",
                  }}
                >
                  <div
                    style={{
                      width: "10%",
                      padding: "3px 0",
                      background: "#FFD9CF",
                      fontFamily: "Pretendard-SemiBold",
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
                      width: "35%",
                      padding: "0 10px",
                      fontFamily: "Pretendard-Regular",
                      fontSize: "16px",
                    }}
                  >
                    컴퓨터네트워크프로그래밍
                  </div>
                  <div
                    style={{
                      width: "45%",
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
                        background: "green",
                        borderRadius: "8px",
                        transition: "width 0.8s ease-in-out",
                      }}
                    ></div>
                  </div>
                  <div
                    style={{
                      boxSizing: "border-box",
                      width: "10%",
                      padding: "0 10px",
                      fontFamily: "Pretendard-Light",
                      fontSize: "12px",
                      color: "#555",
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
                  width: "100%",
                  height: "70px",
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src="../add/add_1.png"
                  alt="add"
                  style={{
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  width: "100%",
                  height: "400px",
                  marginBottom: "10px",
                  background: "#FAFAFC",
                  border: "1px solid #CED0F8",
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
                        fontFamily: "Pretendard",
                        fontWeight: alertTab === tab ? 600 : 400,
                        fontSize: "16px",
                        background: alertTab === tab ? "#FAFAFC" : "#FAFAFC",
                        borderBottom:
                          alertTab === tab
                            ? "1px solid #CED0F8"
                            : "1px solid #CED0F8",
                        color: alertTab === tab ? "#4C6EF5" : "#aaa",
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                        boxShadow:
                          alertTab === tab && tab === "샘물"
                            ? "2px -4px 6px rgba(0,0,0,0.08)"
                            : alertTab === tab && tab === "이캠"
                            ? "-2px -4px 6px rgba(0,0,0,0.08)"
                            : alertTab !== tab
                            ? "inset 0 -4px 4px rgba(0,0,0,0.08)"
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
                  background: "#FAFAFC",
                  border: "1px solid #CED0F8",
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
                        fontFamily: "Pretendard",
                        fontWeight: noticeTab === tab ? 600 : 400,
                        fontSize: "16px",
                        background: noticeTab === tab ? "#FAFAFC" : "#FAFAFC",
                        borderBottom:
                          noticeTab === tab
                            ? "1px solid #CED0F8"
                            : "1px solid #CED0F8",
                        color: noticeTab === tab ? "#4C6EF5" : "#aaa",
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                        boxShadow:
                          noticeTab === tab && tab === "통합"
                            ? "2px -4px 6px rgba(0,0,0,0.08)"
                            : noticeTab === tab && tab === "학과"
                            ? "-2px -4px 6px rgba(0,0,0,0.08)"
                            : noticeTab !== tab
                            ? "inset 0 -4px 4px rgba(0,0,0,0.08)"
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
