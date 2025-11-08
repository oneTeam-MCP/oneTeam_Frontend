import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import moment from "moment";

import Nav from "../../components/nav.tsx";
import SideNav from "../../components/side_nav.tsx";
import BigCalendar from "../../components/bigCalendar.tsx";
import Button from "../../components/button.tsx";

// import PlanData from "../../mockup/planData.tsx";

import GetSchedulesAPI from "../../api/api/schedules/getSchedulesAPI.tsx";
import PostSchedulesAPI from "../../api/api/schedules/postSchedulesAPI.tsx";
import DeleteSchedulesAPI from "../../api/api/schedules/deleteSchedulesAPI.tsx";

import "../../App.css";

const SIDENAV_WIDTH = 200;
const today = new Date();

type CalendarList = {
  id: number;
  type: string;
  userId: number | null;
  startDate: number[];
  endDate: number[];
  content: string;
  createdAt: number[];
};

export default function Calendar() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [open, setOpen] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [calendarPlanList, setCalendarPlanList] = useState<CalendarList[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    async function fetchSchedules() {
      const schedules = await GetSchedulesAPI();
      setCalendarPlanList(schedules);
    }
    fetchSchedules();
  }, []);

  const handleDateSelect = (selectedDate: Date) => {
    setSelectedDate(selectedDate); // Update the selected date in the state
  };

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

  const handleCancel = () => {
    if (window.confirm("정말 취소하시겠습니까?")) {
      window.location.href = "/calendar";
      setIsPopupOpen(false);
    }
  };

  const onValid = (e) => {
    PostSchedulesAPI(e.Content, e.StartDate, e.EndDate);
  };

  const onInvalid = (e) => {
    console.log(e, "onInvalid");
    alert("입력한 정보를 다시 확인해주세요.");
  };

  return (
    <div>
      <Nav />
      <SideNav type="calendar" open={open} setOpen={setOpen} />
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
              width: "100%",
              minWidth: "200px",
              height: "6vh",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div>Calendar</div>
            <div style={{ fontFamily: "Suit-Light", fontSize: "12px" }}>
              <span style={{ width: "50px", background: "#82ABEB" }}>
                &emsp;&emsp;
              </span>
              &emsp;학사 일정&emsp;&emsp;
              <span style={{ width: "50px", background: "#EC8E90" }}>
                &emsp;&emsp;
              </span>
              &emsp;개인 일정
            </div>
          </div>
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                width: "810px",
              }}
            >
              <BigCalendar onDateSelect={handleDateSelect} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                position: "relative",
                width: "370px",
                background: "#1b1c1d",
                border: "1px solid #444",
                borderRadius: "20px",
              }}
            >
              <div
                style={{
                  boxSizing: "border-box",
                  fontFamily: "Suit-SemiBold",
                  fontSize: "20px",
                  width: "100%",
                  padding: "10px 15px",
                  borderBottom: "1px solid #444",
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>{formatDate(selectedDate).yearMonthDay}</div>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsPopupOpen(!isPopupOpen)}
                >
                  +
                </div>
              </div>
              {isPopupOpen ? (
                <form
                  style={{
                    width: "100%",
                    height: "230px",
                    backgroundColor: "#1b1c1d",
                    position: "absolute",
                    top: "51px",
                    borderBottomRightRadius: "20px",
                    borderBottomLeftRadius: "20px",
                    boxShadow: "0 5px 5px rgba(0, 0, 0, 0.5)",
                    // border: "1px solid #aaa",
                  }}
                >
                  <div
                    style={{
                      boxSizing: "border-box",
                      width: "80%",
                      height: "35px",
                      margin: "20px auto",
                      padding: "0 5px",
                      borderRadius: "10px",
                      border: "1px solid #777",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="일정 내용을 입력하세요."
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "10px",
                        fontFamily: "Suit-Regular",
                        fontSize: "18px",
                      }}
                      {...register("Content", {
                        required: "일정을 입력해주세요.",
                      })}
                    />
                  </div>
                  <div
                    style={{
                      boxSizing: "border-box",
                      width: "80%",
                      height: "70px",
                      margin: "20px auto",
                      borderRadius: "10px",
                      position: "relative",
                      marginBottom: "30px",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "50%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Suit-Regular",
                          fontSize: "18px",
                        }}
                      >
                        시작
                      </div>
                      <input
                        type="date"
                        style={{
                          width: "150px",
                          borderRadius: "4px",
                          border: "1px solid #777",
                          fontSize: "18px",
                        }}
                        {...register("StartDate", {
                          required: "시작일을 입력해주세요.",
                        })}
                      />
                    </div>
                    <hr
                      style={{
                        width: "100%",
                        height: "1px",
                        backgroundColor: "#777",
                        border: "none",
                        margin: "5px 0",
                      }}
                    />
                    <div
                      style={{
                        width: "100%",
                        height: "50%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Suit-Regular",
                          fontSize: "18px",
                        }}
                      >
                        종료
                      </div>
                      <input
                        type="date"
                        style={{
                          width: "150px",
                          borderRadius: "4px",
                          border: "1px solid #777",
                          fontSize: "18px",
                        }}
                        {...register("EndDate", {
                          required: "시작일을 입력해주세요.",
                        })}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      width: "80%",
                      margin: "5px auto",
                      display: "flex",
                      justifyContent: "right",
                    }}
                  >
                    <Button
                      type="primary"
                      size="xsmall"
                      title="추가"
                      onClick={handleSubmit(onValid, onInvalid)}
                    />
                  </div>
                </form>
              ) : (
                <></>
              )}
              <div>
                {calendarPlanList.filter((event) =>
                  moment(selectedDate).isBetween(
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
                        paddingTop: "150px",
                      }}
                    >
                      계획된 일정이 없습니다.
                    </div>
                    <div
                      style={{
                        fontFamily: "Suit-Regular",
                        fontSize: "13px",
                        color: "#aaa",
                        marginTop: "8px",
                      }}
                    >
                      <div>오른쪽 상단의 버튼을 클릭하면</div>
                      <div> 일정을 생성할 수 있습니다.</div>
                    </div>
                  </div>
                ) : (
                  calendarPlanList
                    .filter((event) =>
                      moment(selectedDate).isBetween(
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
                          width: "100%",
                          padding: "10px 15px",
                          textAlign: "left",
                          display: "flex",
                          justifyContent: "space-between",
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
                                event.type == "common" ? "#82ABEB" : "#EC8E90",
                              border: "1px solid #444",
                              borderRadius: "10px",
                            }}
                          >
                            {event.type == "common" ? "학사" : "개인"}
                          </div>
                        </div>
                        <div style={{ width: "80%" }}>
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
                        <div
                          style={{
                            fontFamily: "Suit-SemiBold",
                            fontSize: "20px",
                            color: "#fff",
                          }}
                        >
                          <img
                            src="../btn/delete_disabled.png"
                            style={{ width: "14px", cursor: "pointer" }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.src =
                                "../btn/delete_enabled.png")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.src =
                                "../btn/delete_disabled.png")
                            }
                            onClick={async () => {
                              const confirm =
                                window.confirm("일정을 삭제하시겠습니까?");
                              if (confirm) {
                                await DeleteSchedulesAPI(event.id);
                              }
                            }}
                          />
                        </div>
                      </div>
                    ))
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
