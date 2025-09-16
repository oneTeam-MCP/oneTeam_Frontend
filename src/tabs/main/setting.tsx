import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/button.tsx";
import Nav from "../../components/nav.tsx";
import SideNav from "../../components/side_nav.tsx";

import "../../App.css";

const SIDENAV_WIDTH = 200;

export default function Dashboard() {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <Nav />
      <SideNav type="setting" open={open} setOpen={setOpen} />
      <div
        style={{
          width: `calc(100% - ${open ? SIDENAV_WIDTH : 0}px)`,
          marginLeft: open ? `${SIDENAV_WIDTH}px` : "0px",
          height: "92vh",
          marginTop: "8vh",
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
            Setting
          </div>
        </div>
      </div>
    </div>
  );
}
