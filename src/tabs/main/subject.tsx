import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../components/button.tsx";
import Nav from "../../components/nav.tsx";
import SideNav from "../../components/side_nav.tsx";

import GetUnsubmitAssignmentsAPI from "../../api/api/assignments/getUnsubmitAssignmentsAPI.tsx";

import "../../App.css";

const SIDENAV_WIDTH = 200;
const days = ["월", "화", "수", "목", "금", "토"];
const COLORS = [
  "#CEA95B",
  "#B87475",
  "#76A6CC",
  "#83BE92",
  "#5F7FB0",
  "#9191CF",
  "#777777",
];
const data = [
  {
    title: "자료구조",
    time: { 월: [7, 8, 9] },
    place: "G310",
    prof: "홍철의",
    color: "",
  },
  {
    title: "컴퓨터네트워크프로그래밍",
    time: { 수: [4, 5, 6] },
    place: "G311",
    prof: "정진우",
    color: "",
  },
  {
    title: "잉파",
    time: { 화: [4, 5], 목: [3] },
    place: "N202",
    prof: "줄리엔",
    color: "",
  },
  {
    title: "휴먼지능종합설계2",
    time: { 금: [1], 토: [1] },
    place: "G308",
    prof: "이의철, 김동근",
    color: "",
  },
];

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const [progress, setProgress] = useState(0);
  const [AssignList, setAssignList] = useState<any[]>([]);

  useEffect(() => {
    async function fetchSchedules() {
      const assignments = await GetUnsubmitAssignmentsAPI();
      setAssignList(assignments);
    }
    fetchSchedules();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(53);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const timetable: (null | {
    title: string;
    place: string;
    prof: string;
    color: string;
  })[][] = Array.from({ length: 12 }, () => Array(6).fill(null));

  const colorMap: Record<string, string> = {};
  let colorIndex = 0;

  data.forEach((subject) => {
    if (!colorMap[subject.title]) {
      colorMap[subject.title] = COLORS[colorIndex % COLORS.length];
      colorIndex++;
    }
    Object.entries(subject.time).forEach(([day, times]) => {
      const col = days.indexOf(day);
      times.forEach((t) => {
        timetable[t - 1][col] = {
          title: subject.title,
          place: subject.place,
          prof: subject.prof,
          color: colorMap[subject.title],
        };
      });
    });
  });

  return (
    <div>
      <Nav />
      <SideNav type="subject" open={open} setOpen={setOpen} />
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
            Subject
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
                width: "490px",
                minWidth: "350px",
              }}
            >
              <div
                style={{
                  boxSizing: "border-box",
                  width: "100%",
                  marginBottom: "10px",
                  border: "1px solid #444",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "separate",
                    borderSpacing: 0,
                    textAlign: "center",
                    fontFamily: "Suit-Regular",
                    fontSize: "14px",
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          width: "20px",
                          height: "30px",
                          border: "1px solid #444",
                        }}
                      ></th>
                      {days.map((d) => (
                        <th
                          key={d}
                          style={{
                            fontFamily: "Suit-SemiBold",
                            fontSize: "16px",
                            width: "40px",
                            border: "1px solid #444",
                          }}
                        >
                          {d}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 12 }, (_, i) => (
                      <tr key={i} style={{ height: "80px" }}>
                        <td
                          style={{
                            fontFamily: "Suit-SemiBold",
                            fontSize: "14px",
                            border: "1px solid #444",
                          }}
                        >
                          {i + 1}
                          <br />
                          <span
                            style={{
                              fontFamily: "Suit-Regular",
                              fontSize: "10px",
                            }}
                          >
                            ({i + 8}시)
                          </span>
                        </td>
                        {days.map((_, j) => {
                          const cell = timetable[i][j];
                          if (!cell)
                            return (
                              <td
                                key={j}
                                style={{ border: "1px solid #444" }}
                              ></td>
                            );

                          // 연속 블록 체크 → 첫 칸에서만 rowSpan
                          if (
                            i > 0 &&
                            timetable[i - 1][j]?.title === cell.title
                          ) {
                            return null; // 이미 위에서 rowSpan 처리됨
                          }

                          let span = 1;
                          while (
                            i + span < 12 &&
                            timetable[i + span][j]?.title === cell.title
                          ) {
                            span++;
                          }

                          return (
                            <td
                              key={j}
                              rowSpan={span}
                              style={{
                                border: "1px solid #444",
                                background: cell.color,
                                verticalAlign: "middle",
                              }}
                            >
                              <div>
                                <div style={{ fontFamily: "Suit-SemiBold" }}>
                                  {cell.title}
                                </div>
                                <div
                                  style={{
                                    fontFamily: "Suit-Regular",
                                    fontSize: "12px",
                                    color: "#eee",
                                  }}
                                >
                                  {cell.place}
                                </div>
                                <div
                                  style={{
                                    fontFamily: "Suit-Light",
                                    fontSize: "12px",
                                    color: "#eee",
                                  }}
                                >
                                  {cell.prof}
                                </div>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                width: "690px",
              }}
            >
              <div
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
                    width: "100%",
                    height: "330px",
                    borderRadius: "10px",
                    margin: "10px 0",
                    padding: "0 10px",
                    overflowY: "auto",
                  }}
                >
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
                          D-{assign.endDate}
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
                </div>
              </div>
              <div
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
                  미시청 영상
                </div>
                <div
                  style={{
                    boxSizing: "border-box",
                    width: "100%",
                    height: "330px",
                    borderRadius: "10px",
                    margin: "10px 0",
                    padding: "0 10px",
                    overflowY: "auto",
                  }}
                >
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
                          D-1
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
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
