// import React from "react";
import "../App.css";

export default function BottomInfo() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "190px",
        padding: "30px 0",
        backgroundColor: "#171A1F",
        textAlign: "left",
        zIndex: "99",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontFamily: "Pretendard-Light",
            fontSize: "14px",
            color: "#fff",
          }}
        >
          Copyright ⓒ oneTeam. All Rights Reserved.
        </div>
        <div></div>
      </div>
      <hr
        style={{
          maxWidth: "1200px",
          height: "1px",
          border: "none",
          backgroundColor: "#fff",
        }}
      />
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px 20px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            fontFamily: "Pretendard-SemiBold",
            fontSize: "18px",
            color: "#fff",
            marginBottom: "20px",
          }}
        >
          Made by oneTeam
          <br />
          <span
            style={{
              fontFamily: "Pretendard-Regular",
              fontSize: "14px",
              color: "#fff",
            }}
          >
            Ver1.0 Created by 김재관, 김정찬, 김진석, 맹의현, 염다인 in 2025
          </span>
          <br />
          <br />
          <span
            style={{
              fontFamily: "Pretendard-Regular",
              fontSize: "14px",
              color: "#fff",
            }}
          >
            Started at 상명대학교 휴먼지능정보공학전공
            <br />
            서울시 종로구 홍지문2길 20 상명대학교 휴먼지능정보공학전공(제1공학관
            G101-2호)
            <br />
            oneTeam@gmail.com
          </span>
        </div>
        <div
          style={{
            fontFamily: "Pretendard-SemiBold",
            fontSize: "18px",
            color: "#fff",
          }}
        >
          hah
        </div>
      </div>
    </div>
  );
}
