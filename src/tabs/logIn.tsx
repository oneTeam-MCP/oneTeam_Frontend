import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import Button from "../components/button.tsx";

import LogInAPI from "../api/api/auth/loginAPI.tsx";
// import ExistsAPI from "../api/members/existsAPI.tsx";
// import VerificationRequestsAPI from "../api/emails/verificationReauestsAPI.tsx";
// import VerificationsAPI from "../api/emails/verificationsAPI.tsx";
// import PatchPasswordNonLoginAPI from "../api/members/patchPasswordNonLoginAPI.tsx";

import "../App.css";

export default function Login() {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setFocus("StudentNum");
  }, [setFocus]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onValid = async (e: any) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    console.log(e.StudentNum, e.Password);

    // fetch(
    //   "https://685hwzfiu3.execute-api.ap-northeast-2.amazonaws.com/funcionecampus/smu-dash",
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       userId: e.StudentNum,
    //       userPw: e.Password,
    //       action: "message",
    //       saveDB: true,
    //     }),
    //   }
    // )
    //   .then((res) => {
    //     console.log(res.json());
    //   })
    //   .then((data) => {
    //     alert("로그인 성공");
    //     window.location.href = "/dashboard";
    //     console.log(data);
    //   })
    //   .finally(() => {
    //     setIsSubmitting(false);
    //   });

    const email = e.StudentNum + "@sangmyung.kr";

    try {
      console.log(e, "onValid");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await LogInAPI(email, e.Password);
    } catch (error) {
      console.error("로그인 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const onInvalid = (e: any) => {
    console.log(e, "onInvalid");
    alert("로그인 실패");
  };

  const autoPattern = (id: string) => {
    const input = document.getElementById(id) as HTMLInputElement | null;
    if (!input) {
      console.error(`Element with id "${id}" not found.`);
      return;
    }
    let inputValue = input.value;
    inputValue = inputValue.replace(/[^0-9]/g, "");
    input.value = inputValue;
  };

  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          opacity: "1",
          zIndex: "-2",
        }}
      >
        <img
          src="..\login_background.png"
          alt="login_background"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          opacity: "0.2",
          zIndex: "-1",
          background: "#2156C6",
        }}
      ></div>

      <div
        style={{
          maxWidth: "650px",
          margin: "15vh auto",
          border: "1px solid #000",
          borderRadius: "20px",
          backgroundColor: "#fff",
        }}
      >
        <div
          style={{
            boxSizing: "border-box",
            maxWidth: "300px",
            margin: "100px auto",
            marginBottom: "160px",
          }}
        >
          <img
            src="..\logo\logo.png"
            alt="login_logo"
            style={{ width: "100%" }}
          />
        </div>

        <div
          style={{
            boxSizing: "border-box",
            maxWidth: "450px",
            padding: "0 20px",
            margin: "0 auto",
          }}
        >
          <form
            style={{ textAlign: "left", width: "100%" }}
            onSubmit={handleSubmit(onValid, onInvalid)}
          >
            <div
              style={{
                margin: "0 auto",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "40px",
                  borderBottom: "1px solid #777",
                  margin: "0 auto",
                  marginBottom: "30px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <input
                  id="studentNum"
                  placeholder="학 번"
                  type="text"
                  autoComplete="off"
                  onKeyUp={() => {
                    autoPattern("studentNum");
                  }}
                  {...register("StudentNum", {
                    required: "학번 혹은 비밀번호를 확인해주세요.",
                  })}
                  style={{
                    width: "100%",
                    maxWidth: "250px",
                    height: "40px",
                    borderRadius: "10px",
                  }}
                />
                <div
                  style={{
                    fontFamily: "Suit-Regular",
                    fontSize: "clamp(14px, 2vw, 16px)",
                    color: "#777",
                  }}
                >
                  @sangmyung.kr
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "40px",
                  borderBottom: "1px solid #777",
                  margin: "0 auto",
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <input
                  id="password"
                  placeholder="비밀번호"
                  type={isPasswordVisible ? "text" : "password"}
                  {...register("Password", {
                    required: "학번 혹은 비밀번호를 확인해주세요.",
                  })}
                  style={{
                    width: "100%",
                    maxWidth: "360px",
                    height: "40px",
                    borderRadius: "10px",
                  }}
                />
                {isPasswordVisible ? (
                  <img
                    src="../icon/eye_open.png"
                    alt="eye_open"
                    color="#777"
                    style={{
                      width: "25px",
                      cursor: "pointer",
                    }}
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  />
                ) : (
                  <img
                    src="../icon/eye_close.png"
                    alt="eye_close"
                    color="#777"
                    style={{
                      width: "25px",
                      cursor: "pointer",
                    }}
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  />
                )}
              </div>
              <div
                style={{
                  maxWidth: "400px",
                  height: "20px",
                  color: "#FF5005",
                  fontSize: "12px",
                  textAlign: "left",
                }}
              >
                {errors.StudentNum ? (
                  <span
                    style={{
                      display: "block",
                      paddingLeft: "20px",
                    }}
                  >
                    * {String(errors.StudentNum.message)}
                  </span>
                ) : errors.Password ? (
                  <span
                    style={{
                      display: "block",
                      paddingLeft: "20px",
                    }}
                  >
                    * {String(errors.Password.message)}
                  </span>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div
              style={{
                width: "100%",
                textAlign: "center",
              }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  maxWidth: "100%",
                  padding: "0",
                  border: "none",
                  backgroundColor: "transparent",
                }}
              >
                <div
                  style={{
                    maxWidth: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    type={isSubmitting ? "disabled" : "primary"}
                    size="large"
                    title="로그인"
                  />
                </div>
              </button>
            </div>
          </form>
          <hr
            style={{
              maxWidth: "1200px",
              height: "1px",
              border: "none",
              margin: "5px 0",
              backgroundColor: "#aaa",
            }}
          />
          <div
            style={{
              maxWidth: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              type={isSubmitting ? "disabled" : "third"}
              size="large"
              title="회원가입"
              onClick={() => {
                window.location.href = "/signup";
              }}
            />
          </div>
          <div
            style={{
              fontFamily: "Suit-Light",
              fontSize: "14px",
              color: "#333",
              marginTop: "80px",
              marginBottom: "50px",
            }}
          >
            비밀번호를 잊었을 때는,{" "}
            <span
              style={{ color: "#114df0", cursor: "pointer" }}
              onClick={() => {}}
            >
              여기
            </span>
            를 눌러주세요.
          </div>
        </div>
      </div>
    </div>
  );
}
