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
          position: "fixed",
          top: "15px",
          left: open ? WIDTH + 5 : 130,
          width: 36,
          height: 36,
          color: "#fff",
          transition: "left .25s ease",
          zIndex: 100,
        }}
        title={open ? "사이드바 닫기" : "사이드바 열기"}
      >
        {open ? (
          <img
            src="../btn/sidebar_close.png"
            style={{ display: "block", width: "30px", cursor: "pointer" }}
          />
        ) : (
          <img
            src="../btn/sidebar_open.png"
            style={{ display: "block", width: "30px", cursor: "pointer" }}
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
          background: "#fff",
          textAlign: "left",
          boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
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
            left: "30px",
            top: "15px",
            height: "30px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Link to="/">
            <img
              src="../logo/logo.png"
              style={{ display: "block", width: "100px" }}
            />
          </Link>
        </div>
        <div style={{ width: "80%", height: "80%" }}>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <div
              className="side_nav_list"
              style={
                type === "dashboard"
                  ? {
                      color: "#fff",
                      background: "#8AA7F8",
                      borderRadius: "5px",
                    }
                  : {}
              }
            >
              <img
                src={
                  type === "dashboard"
                    ? "../icon/dashboard_enabled.png"
                    : "../icon/dashboard_disabled.png"
                }
                alt="dashboard"
                style={{ width: "20px" }}
              />
              <div style={{ marginLeft: "5px" }}>Dashboard</div>
            </div>
          </Link>
          <Link to="/calendar" style={{ textDecoration: "none" }}>
            <div
              className="side_nav_list"
              style={
                type === "calendar"
                  ? {
                      color: "#fff",
                      background: "#8AA7F8",
                      borderRadius: "5px",
                    }
                  : {}
              }
            >
              <img
                src={
                  type === "calendar"
                    ? "../icon/calendar_enabled.png"
                    : "../icon/calendar_disabled.png"
                }
                alt="calendar"
                style={{ width: "20px" }}
              />
              <div style={{ marginLeft: "5px" }}>Calendar</div>
            </div>
          </Link>
          <Link to="/subject" style={{ textDecoration: "none" }}>
            <div
              className="side_nav_list"
              style={
                type === "subject"
                  ? {
                      color: "#fff",
                      background: "#8AA7F8",
                      borderRadius: "5px",
                    }
                  : {}
              }
            >
              <img
                src={
                  type === "subject"
                    ? "../icon/subject_enabled.png"
                    : "../icon/subject_disabled.png"
                }
                alt="subject"
                style={{ width: "20px" }}
              />
              <div style={{ marginLeft: "5px" }}>Subject</div>
            </div>
          </Link>
          <Link to="/chatbot" style={{ textDecoration: "none" }}>
            <div
              className="side_nav_list"
              style={
                type === "chatbot"
                  ? {
                      color: "#fff",
                      background: "#8AA7F8",
                      borderRadius: "5px",
                    }
                  : {}
              }
            >
              <img
                src={
                  type === "chatbot"
                    ? "../icon/chatbot_enabled.png"
                    : "../icon/chatbot_disabled.png"
                }
                alt="chatbot"
                style={{ width: "20px" }}
              />
              <div style={{ marginLeft: "5px" }}>Chatbot AI</div>
            </div>
          </Link>
          <Link to="/setting" style={{ textDecoration: "none" }}>
            <div
              className="side_nav_list"
              style={
                type === "setting"
                  ? {
                      color: "#fff",
                      background: "#8AA7F8",
                      borderRadius: "5px",
                    }
                  : {}
              }
            >
              <img
                src={
                  type === "setting"
                    ? "../icon/setting_enabled.png"
                    : "../icon/setting_disabled.png"
                }
                alt="setting"
                style={{ width: "20px" }}
              />
              <div style={{ marginLeft: "5px" }}>Setting</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
