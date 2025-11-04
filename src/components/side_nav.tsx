import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/button.tsx";
import "../App.css";

type NavType = "dashboard" | "calendar" | "subject" | "chatbot" | "setting";
type NavProps = {
  type?: NavType;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SideNav({ type, open, setOpen }: NavProps) {
  const WIDTH = 200;

  return (
    <>
      <div
        onClick={() => setOpen((v) => !v)}
        style={{
          boxSizing: "border-box",
          position: "fixed",
          top: "20px",
          left: open ? WIDTH - 40 : 20,
          width: 36,
          height: 36,
          color: "#fff",
          transition: "left .25s ease",
          zIndex: 102,
        }}
        title={open ? "사이드바 닫기" : "사이드바 열기"}
      >
        {open ? (
          <img
            src="../btn/sidebar_close.png"
            style={{ display: "block", width: "20px", cursor: "pointer" }}
          />
        ) : (
          <img
            src="../btn/sidebar_open.png"
            style={{ display: "block", width: "20px", cursor: "pointer" }}
          />
        )}
      </div>

      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          height: "100%",
          width: `${WIDTH}px`,
          textAlign: "left",
          background: "#1b1c1d",
          // boxShadow: "inset 0 0 5px rgba(255, 255, 255, 0.3)",
          borderRight: "1px solid #444",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "100",
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform .25s ease",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "15px",
            top: "20px",
            height: "30px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Link to="/">
            <img
              src="../logo/logo_w.png"
              style={{ display: "block", width: "100px" }}
            />
          </Link>
        </div>
        <div style={{ width: "80%", height: "70%" }}>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <div
              className="side_nav_list"
              style={
                type === "dashboard"
                  ? {
                      color: "#fff",
                      background: "#4285F4",
                      borderRadius: "5px",
                    }
                  : {}
              }
            >
              <img
                src={
                  type === "dashboard"
                    ? "../icon/dashboard_enabled.png"
                    : "../icon/dashboard_enabled.png"
                }
                alt="dashboard"
                style={{ width: "22px", objectFit: "contain" }}
              />
              <div style={{ marginLeft: "10px" }}>Dashboard</div>
            </div>
          </Link>
          <Link to="/calendar" style={{ textDecoration: "none" }}>
            <div
              className="side_nav_list"
              style={
                type === "calendar"
                  ? {
                      color: "#fff",
                      background: "#4285F4",
                      borderRadius: "5px",
                    }
                  : {}
              }
            >
              <img
                src={
                  type === "calendar"
                    ? "../icon/calendar_enabled.png"
                    : "../icon/calendar_enabled.png"
                }
                alt="calendar"
                style={{ width: "22px", objectFit: "contain" }}
              />
              <div style={{ marginLeft: "10px" }}>Calendar</div>
            </div>
          </Link>
          <Link to="/subject" style={{ textDecoration: "none" }}>
            <div
              className="side_nav_list"
              style={
                type === "subject"
                  ? {
                      color: "#fff",
                      background: "#4285F4",
                      borderRadius: "5px",
                    }
                  : {}
              }
            >
              <img
                src={
                  type === "subject"
                    ? "../icon/subject_enabled.png"
                    : "../icon/subject_enabled.png"
                }
                alt="subject"
                style={{ width: "22px", objectFit: "contain" }}
              />
              <div style={{ marginLeft: "10px" }}>Subject</div>
            </div>
          </Link>
          <Link to="/chatbot" style={{ textDecoration: "none" }}>
            <div
              className="side_nav_list"
              style={
                type === "chatbot"
                  ? {
                      color: "#fff",
                      background: "#4285F4",
                      borderRadius: "5px",
                    }
                  : {}
              }
            >
              <img
                src={
                  type === "chatbot"
                    ? "../icon/chatbot_enabled.png"
                    : "../icon/chatbot_enabled.png"
                }
                alt="chatbot"
                style={{ width: "22px", objectFit: "contain" }}
              />
              <div style={{ marginLeft: "10px" }}>AI Agent</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
