import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/button.tsx";
import "../App.css";

type NavType = "login" | "logout";
type NavProps = {
  type?: NavType;
};

export default function Nav({ type }: NavProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" }); // 🔹 부드럽게 이동
    }
  };

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
          backgroundColor: "#fff",
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
              style={{ display: "block", width: "80px" }}
            />
          </Link>
        </div>

        <div
          style={{
            position: "absolute",
            right: "0",
            display: "flex",
            alignItems: "center",
          }}
        >
          {type === "login" ? (
            <>
              <div
                className="nav_text"
                onClick={() => scrollToSection("home")}
                style={{ width: "120px" }}
              >
                Home
              </div>
              <div
                className="nav_text"
                onClick={() => scrollToSection("introduction")}
                style={{ width: "140px" }}
              >
                Introduction
              </div>
              <div
                className="nav_text"
                onClick={() => scrollToSection("what_is_mcp")}
                style={{ width: "150px" }}
              >
                What is MCP
              </div>
              <div
                className="nav_text"
                onClick={() => scrollToSection("team")}
                style={{ width: "120px" }}
              >
                Team
              </div>
              <Link to="/login">
                <div className="nav_text" style={{ width: "120px" }}>
                  Log In
                </div>
              </Link>
            </>
          ) : (
            <>
              <div
                onClick={() => scrollToSection("team")}
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
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
