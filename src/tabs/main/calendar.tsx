import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import moment from "moment";
import Nav from "../../components/nav.tsx";
import SideNav from "../../components/side_nav.tsx";
import BigCalendar from "../../components/bigCalendar.tsx";

import PlanData from "../../mockup/planData.tsx";

import "../../App.css";

const SIDENAV_WIDTH = 200;
const today = new Date();

export default function Calendar() {
  const [open, setOpen] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const calendarPlanList = PlanData();

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

  return (
    <div>
      <Nav />
      <SideNav type="calendar" open={open} setOpen={setOpen} />
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
              fontFamily: "Suit-SemiBold",
              fontSize: "25px",
              width: "250px",
              minWidth: "200px",
              height: "6vh",
            }}
          >
            Calendar
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
                width: "370px",
                background: "#FAFAFC",
                border: "1px solid #CED0F8",
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
                  borderBottom: "1px solid #CED0F8",
                  marginBottom: "20px",
                }}
              >
                {formatDate(selectedDate).yearMonthDay}
              </div>
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
                        color: "#888",
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
                          width: "100%",
                          padding: "10px",
                          textAlign: "left",
                          display: "flex",
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
                              fontFamily: "Suit-Regular",
                              fontSize: "12px",
                              padding: "5px 0",
                              background: "#eee",
                            }}
                          >
                            {event.category}
                          </div>
                        </div>
                        <div>
                          <div
                            style={{
                              fontFamily: "Suit-SemiBold",
                              fontSize: "18px",
                            }}
                          >
                            {event.title}
                          </div>
                          <div
                            style={{
                              fontFamily: "Suit-Regular",
                              fontSize: "12px",
                              color: "#888",
                              marginTop: "5px",
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
          </div>
        </div>
      </div>
    </div>
  );
}
