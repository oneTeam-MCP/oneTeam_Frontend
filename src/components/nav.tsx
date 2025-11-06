import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../components/button.tsx";

import { getCookie, removeCookie } from "../api/cookies.tsx";

import "../App.css";

type NavType = "home" | "inner";
type NavProps = {
  type?: NavType;
};

export default function Nav({ type }: NavProps) {
  const [checkAuth, setCheckAuth] = useState<number>(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" }); // 🔹 부드럽게 이동
    }
  };

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      setCheckAuth(0);
    } else {
      setCheckAuth(1);
    }
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        width: "100%",
        zIndex: "99",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor:
            type == "home" ? "rgba(11,15,14, 0.85)" : "rgba(11,15,14, 0)",
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
          {type === "home" ? (
            <Link to="/">
              <img
                src="../logo/logo_w.png"
                style={{ display: "block", width: "100px" }}
              />
            </Link>
          ) : (
            <></>
          )}
        </div>

        <div
          style={{
            position: "absolute",
            right: "0",
            display: "flex",
            alignItems: "center",
          }}
        >
          {type == "home" ? (
            <>
              <div
                className="nav_text"
                onClick={() => scrollToSection("home")}
                style={{ width: "50px", margin: "30px" }}
              >
                Home
              </div>
              <div
                className="nav_text"
                onClick={() => scrollToSection("introduction")}
                style={{ width: "100px", margin: "30px" }}
              >
                Introduction
              </div>
              <div
                className="nav_text"
                onClick={() => scrollToSection("what_is_mcp")}
                style={{ width: "120px", margin: "30px" }}
              >
                What is MCP
              </div>
              <div
                className="nav_text"
                onClick={() => scrollToSection("demo")}
                style={{ width: "50px", margin: "30px" }}
              >
                Teaser
              </div>
              <div
                className="nav_text"
                onClick={() => scrollToSection("team")}
                style={{ width: "50px", margin: "30px" }}
              >
                Team
              </div>
              {!checkAuth ? (
                <Link to="/login">
                  <div
                    className="nav_text"
                    style={{ width: "60px", margin: "30px" }}
                  >
                    Log In
                  </div>
                </Link>
              ) : (
                <Link to="/dashboard">
                  <div
                    className="nav_text"
                    style={{ width: "60px", margin: "30px" }}
                  >
                    Start
                  </div>
                </Link>
              )}
            </>
          ) : (
            <>
              <div
                style={{
                  marginRight: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src="../icon/profile.png"
                  style={{ width: "35px", cursor: "pointer" }}
                  onClick={() => setIsPopupOpen(!isPopupOpen)}
                />
              </div>
            </>
          )}
        </div>
      </div>
      {isPopupOpen && (
        <div
          style={{
            position: "absolute",
            top: "50px",
            right: "30px",
            width: "200px",
            background: "#1b1c1d",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            zIndex: 10,
          }}
        >
          <div
            style={{
              padding: "10px",
              borderBottom: "1px solid #444",
              cursor: "pointer",
              fontFamily: "Suit-SemiBold",
              fontSize: "18px",
              color: "#4285f4",
            }}
            onClick={() => alert("개발 중...")}
          >
            개인 설정
          </div>
          <div
            style={{
              padding: "10px",
              cursor: "pointer",
              fontFamily: "Suit-SemiBold",
              fontSize: "18px",
              color: "#f44336",
            }}
            onClick={async () => {
              await removeCookie("accessToken");
              window.location.href = "/";
            }}
          >
            로그아웃
          </div>
        </div>
      )}
    </div>
  );
}
