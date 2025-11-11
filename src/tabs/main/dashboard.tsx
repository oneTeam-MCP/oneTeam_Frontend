import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import moment from "moment";
import Button from "../../components/button.tsx";
import Nav from "../../components/nav.tsx";
import SideNav from "../../components/side_nav.tsx";

import GetSchedulesAPI from "../../api/api/schedules/getSchedulesAPI.tsx";
import GetNoticesAPI from "../../api/api/notices/getNoticesAPI.tsx";
import GetMessagesAPI from "../../api/api/messages/getMessagesAPI.tsx";
import GetUnsubmitAssignmentsAPI from "../../api/api/assignments/getUnsubmitAssignmentsAPI.tsx";
import GetNotificationsAPI from "../../api/api/notifications/getNotificationsAPI.tsx";

import "../../App.css";

const SIDENAV_WIDTH = 200;
const today = new Date();

export default function Dashboard() {
  const [open, setOpen] = useState(true);

  const [assignTab, setAssignTab] = useState<"미제출 과제" | "미시청 영상">(
    "미제출 과제"
  );
  const [alertTab, setAlertTab] = useState<"e캠퍼스 알림" | "e캠퍼스 메세지">(
    "e캠퍼스 알림"
  );
  const [noticeTab, setNoticeTab] = useState<"통합" | "학과">("통합");

  const [adIdx, setAdIdx] = useState(0);
  // const [progress, setProgress] = useState(0); // 현재 width (%)

  const ADS: string[] = ["../ad/ad_2.png", "../ad/ad_3.png"];
  const ADS_LINK: any[] = [
    "https://biohealth.smu.ac.kr/biohealth/index.do",
    "https://smu-bamboo.com/",
  ];
  const [calendarPlanList, setCalendarPlanList] = useState<any[]>([]);
  const [noticeList, setNoticeList] = useState<any[]>([]);
  const [notificationList, setNotificationList] = useState<any[]>([]);
  const [messageList, setMessageList] = useState<any[]>([]);
  const [AssignList, setAssignList] = useState<any[]>([]);

  useEffect(() => {
    async function fetchSchedules() {
      const schedules = await GetSchedulesAPI();
      setCalendarPlanList(schedules);
      const notices = await GetNoticesAPI();
      setNoticeList(notices);
      const messages = await GetMessagesAPI();
      setMessageList(messages);
      const assignments = await GetUnsubmitAssignmentsAPI();
      setAssignList(assignments);
      const notifications = await GetNotificationsAPI();
      setNotificationList(notifications);
    }
    fetchSchedules();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setAdIdx((i) => (i + 1) % ADS.length);
    }, 3000); // 5초마다 다음 배너
    return () => clearInterval(id);
  }, []);

  const formatDate = (selectedDate: Date) => {
    const year = selectedDate.getFullYear();
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
    const date = selectedDate.getDate().toString().padStart(2, "0");
    const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
    const weekDay = weekDays[selectedDate.getDay()];

    const yearMonthDay = `${year}년 ${month}월 ${date}일 (${weekDay})`;
    const basic = `${year}-${month}-${date}`;
    return { yearMonthDay, weekDay, basic };
  };

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
                  {formatDate(today).yearMonthDay} TODO
                </div>
                <div>
                  {calendarPlanList.filter((event) =>
                    moment(today).isBetween(
                      event.startDate,
                      event.endDate,
                      "day",
                      "[]"
                    )
                  ).length === 0 ? (
                    <div
                      style={{
                        width: "100%",
                        height: "180px",
                        borderRadius: "20px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Suit-SemiBold",
                          fontSize: "20px",
                          paddingTop: "50px",
                        }}
                      >
                        계획된 일정이 없습니다.
                      </div>
                    </div>
                  ) : (
                    calendarPlanList
                      .filter((event) =>
                        moment(today).isBetween(
                          event.startDate,
                          event.endDate,
                          "day",
                          "[]"
                        )
                      )
                      .map((event) => (
                        <div
                          key={event.id}
                          style={{
                            boxSizing: "border-box",
                            width: "90%",
                            margin: "0 5% 10px",
                            textAlign: "left",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              width: "60px",
                              marginRight: "20px",
                              textAlign: "center",
                            }}
                          >
                            <div
                              style={{
                                boxSizing: "border-box",
                                fontFamily: "Suit-SemiBold",
                                fontSize: "14px",
                                color: "#000",
                                padding: "5px 0",
                                background:
                                  event.type == "common"
                                    ? "#82ABEB"
                                    : "#EC8E90",
                                border: "1px solid #444",
                                borderRadius: "10px",
                              }}
                            >
                              {event.type == "common" ? "학사" : "개인"}
                            </div>
                          </div>
                          <div>
                            <div
                              style={{
                                fontFamily: "Suit-SemiBold",
                                fontSize: "18px",
                              }}
                            >
                              {event.content}
                            </div>
                            <div
                              style={{
                                fontFamily: "Suit-Regular",
                                fontSize: "12px",
                                color: "#888",
                              }}
                            >
                              {event.startDate} ~ {event.endDate}
                            </div>
                          </div>
                        </div>
                      ))
                  )}
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
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {["미제출 과제", "미시청 영상"].map((tab) => (
                    <div
                      key={tab}
                      onClick={() =>
                        setAssignTab(tab as "미제출 과제" | "미시청 영상")
                      }
                      style={{
                        boxSizing: "border-box",
                        width: "50%",
                        textAlign: "center",
                        marginBottom: "20px",
                        padding: "12px 0",
                        cursor: "pointer",
                        fontFamily:
                          assignTab === tab ? "Suit-SemiBold" : "Suit-Regular",
                        fontSize: "18px",
                        background: assignTab === tab ? "#1b1c1d" : "#222",
                        color: assignTab === tab ? "#4285f4" : "#aaa",
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                        boxShadow:
                          assignTab === tab && tab === "미제출 과제"
                            ? "2px -4px 4px rgba(255,255,255,0.1)"
                            : assignTab === tab && tab === "미시청 영상"
                            ? "-2px -4px 4px rgba(255,255,255,0.1)"
                            : assignTab !== tab
                            ? "inset 0 -4px 4px rgba(255,255,255,0.08)"
                            : "none",
                        zIndex: alertTab === tab ? "10" : "0",
                      }}
                    >
                      {tab}
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    height: "329px",
                    overflowY: "auto",
                  }}
                >
                  {assignTab == "미제출 과제" ? (
                    <>
                      {AssignList.length > 0 ? (
                        AssignList.map((assign) => (
                          <div
                            style={{
                              boxSizing: "border-box",
                              width: "94%",
                              height: "80px",
                              background: "#3c4043",
                              borderRadius: "10px",
                              margin: "0px 3% 10px",
                              padding: "0 20px",
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
                              {assign.daysLeft === null
                                ? `기한X`
                                : assign.daysLeft > 0
                                ? `D-${assign.daysLeft}`
                                : `D+${-assign.daysLeft}`}
                            </div>
                            <div
                              style={{
                                boxSizing: "border-box",
                                width: "90%",
                                padding: "0 20px",
                                fontFamily: "Suit-Regular",
                                fontSize: "18px",
                              }}
                            >
                              <div
                                style={{
                                  fontFamily: "Suit-SemiBold",
                                  fontSize: "18px",
                                }}
                              >
                                [{assign.courseName}] {assign.assignmentName}
                              </div>
                              <div
                                style={{
                                  fontFamily: "Suit-Light",
                                  fontSize: "12px",
                                  color: "#888",
                                }}
                              >
                                {assign.week}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <>
                      <div
                        style={{
                          boxSizing: "border-box",
                          width: "94%",
                          height: "80px",
                          background: "#3c4043",
                          borderRadius: "10px",
                          margin: "0 3% 10px",
                          padding: "0 20px",
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
                            width: "70%",
                            padding: "0 20px",
                            fontFamily: "Suit-Regular",
                            fontSize: "18px",
                          }}
                        >
                          <div
                            style={{
                              fontFamily: "Suit-SemiBold",
                              fontSize: "18px",
                            }}
                          >
                            [인문학특강] 이승택 교수님
                          </div>
                          <div
                            style={{
                              fontFamily: "Suit-Regular",
                              fontSize: "12px",
                              color: "#888",
                            }}
                          >
                            2025-11-07 ~ 2025-11-12
                          </div>
                        </div>
                        <div
                          style={{
                            width: "20%",
                            fontFamily: "Suit-Regular",
                            fontSize: "14px",
                            color: "#aaa",
                            textAlign: "right",
                          }}
                        >
                          진도욜: 57%
                        </div>
                      </div>
                    </>
                  )}
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
                            : undefined
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
                  height: "310px",
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
                  {["e캠퍼스 알림", "e캠퍼스 메세지"].map((tab) => (
                    <div
                      key={tab}
                      onClick={() =>
                        setAlertTab(tab as "e캠퍼스 알림" | "e캠퍼스 메세지")
                      }
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
                        color: alertTab === tab ? "#4285f4" : "#aaa",
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                        boxShadow:
                          alertTab === tab && tab === "e캠퍼스 알림"
                            ? "2px -4px 4px rgba(255,255,255,0.1)"
                            : alertTab === tab && tab === "e캠퍼스 메세지"
                            ? "-2px -4px 4px rgba(255,255,255,0.1)"
                            : alertTab !== tab
                            ? "inset 0 -4px 4px rgba(255,255,255,0.08)"
                            : "none",
                        zIndex: alertTab === tab ? "10" : "0",
                      }}
                    >
                      {tab}
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    height: "239px",
                    overflowY: "scroll",
                  }}
                >
                  {alertTab === "e캠퍼스 알림" ? (
                    <>
                      {notificationList.length > 0 ? (
                        notificationList.map((notification) => (
                          <div
                            style={{
                              boxSizing: "border-box",
                              width: "94%",
                              minHeight: "60px",
                              borderBottom: "1px solid #777",
                              margin: "0 3% 10px",
                            }}
                          >
                            <div
                              style={{
                                fontFamily: "Suit-SemiBold",
                                fontSize: "16px",
                                marginBottom: "5px",
                              }}
                            >
                              {notification.title}
                            </div>
                            <div
                              style={{
                                fontFamily: "Suit-Light",
                                fontSize: "14px",
                                color: "#bbb",
                                marginBottom: "5px",
                              }}
                            >
                              {notification.content}
                            </div>
                            <div
                              style={{
                                fontFamily: "Suit-Light",
                                fontSize: "12px",
                                color: "#bbb",
                                marginBottom: "5px",
                              }}
                            >
                              {notification.timeInfo}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            borderRadius: "20px",
                            textAlign: "center",
                          }}
                        >
                          <div
                            style={{
                              fontFamily: "Suit-Regular",
                              fontSize: "16px",
                              paddingTop: "30px",
                            }}
                          >
                            알림이 없습니다.
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {messageList.length > 0 ? (
                        messageList.map((message) => (
                          <div
                            style={{
                              boxSizing: "border-box",
                              width: "94%",
                              minHeight: "60px",
                              borderBottom: "1px solid #777",
                              margin: "0 3% 10px",
                            }}
                          >
                            <div
                              style={{
                                fontFamily: "Suit-Light",
                                fontSize: "14px",
                                marginBottom: "5px",
                              }}
                            >
                              {message.content}
                            </div>
                            <div
                              style={{
                                fontFamily: "Suit-Light",
                                fontSize: "14px",
                                color: "#bbb",
                                marginBottom: "5px",
                              }}
                            >
                              {message.sendTime} {message.sender}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            borderRadius: "20px",
                            textAlign: "center",
                          }}
                        >
                          <div
                            style={{
                              fontFamily: "Suit-Regular",
                              fontSize: "16px",
                              paddingTop: "30px",
                            }}
                          >
                            메세지가 없습니다.
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  width: "100%",
                  height: "400px",
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
                        color: noticeTab === tab ? "#4285f4" : "#aaa",
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
                <div
                  style={{
                    height: "329px",
                    overflowY: "auto",
                  }}
                >
                  {noticeTab === "통합" ? (
                    <>
                      {noticeList.length > 0 ? (
                        noticeList?.map((notice) => (
                          <div
                            key={notice.id}
                            style={{
                              boxSizing: "border-box",
                              width: "94%",
                              minHeight: "80px",
                              borderBottom: "1px solid #777",
                              margin: "0 3% 10px",
                            }}
                          >
                            <div
                              style={{
                                fontFamily: "Suit-Light",
                                fontSize: "14px",
                                color:
                                  notice.campus == "서울"
                                    ? "#99A3D5"
                                    : notice.campus == "천안"
                                    ? "#D5AE99"
                                    : "#EC8E90",
                              }}
                            >
                              {notice.campus} {notice.category}
                            </div>
                            <div
                              style={{
                                fontFamily: "Suit-SemiBold",
                                fontSize: "18px",
                                cursor: "pointer",
                                marginBottom: "5px",
                              }}
                              onClick={() =>
                                window.open(
                                  notice.link,
                                  "_blank",
                                  "noopener,noreferrer"
                                )
                              }
                            >
                              {notice.title}
                            </div>
                          </div>
                        ))
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <>
                      {/* <div
                        style={{
                          boxSizing: "border-box",
                          width: "94%",
                          minHeight: "85px",
                          borderBottom: "1px solid #777",
                          margin: "0 3% 10px",
                        }}
                      >
                        학과 공지
                      </div> */}
                      <div
                        style={{
                          boxSizing: "border-box",
                          width: "94%",
                          minHeight: "85px",
                          margin: "5% 3% 10px",
                          textAlign: "center",
                        }}
                      >
                        준비 중...
                      </div>
                    </>
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
