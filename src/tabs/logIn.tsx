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

  const {
    register: registerSamul,
    handleSubmit: handleSubmitSamul,
    setFocus: setFocusSamul,
    formState: { errors: errorsSamul },
  } = useForm();

  useEffect(() => {
    setFocus("StudentNum");
  }, [setFocus]);

  useEffect(() => {
    setFocusSamul("Password");
  }, [setFocusSamul]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [studentNum, setStudentNum] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSamulSubmitting, setIsSamulSubmitting] = useState(false);

  useEffect(() => {
    if (isPopupOpen) {
      setTimeout(() => {
        setFocusSamul("PasswordSamul");
      }, 100);
    } else {
      setTimeout(() => {
        setFocus("StudentNum");
      }, 100);
    }
  }, [isPopupOpen, setFocusSamul, setFocus]);

  useEffect(() => {
    const handleEnterKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault(); // 기존 폼의 submit 방지
        if (isPopupOpen) {
          handleSubmitSamul(onSamulValid, onSamulInvalid)();
        } else {
          handleSubmit(onValid, onInvalid)();
        }
      }
    };
    window.addEventListener("keydown", handleEnterKey);
    return () => {
      window.removeEventListener("keydown", handleEnterKey);
    };
  }, [isPopupOpen, handleSubmit, handleSubmitSamul]);

  const onValid = async (e: any) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    console.log(e.StudentNum, e.Password);
    const email = e.StudentNum + "@sangmyung.kr";

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const res = await LogInAPI(email, e.Password);

      if (res instanceof Response) {
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(`HTTP ${res.status} ${text}`);
        }
      } else if (!res) {
        throw new Error("로그인 API 응답이 없습니다.");
      }

      if (e.StudentNum == "202010770") {
        window.location.href = "/dashboard";
      } else {
        setStudentNum(e.StudentNum);
        setIsPopupOpen(true);
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("아이디나 비밀번호를 확인하세요.");
      setIsPopupOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };
  const onInvalid = (e: any) => {
    console.log(e, "onInvalid");
    alert("로그인 실패");
  };

  const onSamulValid = async (e: any) => {
    if (isSamulSubmitting) return;
    setIsSamulSubmitting(true);

    console.log(studentNum, e.PasswordSamul);

    await fetch(
      "https://685hwzfiu3.execute-api.ap-northeast-2.amazonaws.com/funcionecampus/smu-dash",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: studentNum,
          userPw: e.PasswordSamul,
          action: "all",
          saveDB: true,
        }),
      }
    )
      .then((res) => {
        console.log(res.json());
        if (res.status !== 200) {
          throw new Error(`HTTP ${res.status}`);
        }
      })
      .then((data) => {
        window.location.href = "/dashboard";
        console.log(data);
      })
      .catch((error) => {
        console.error("LogIn failed:", error);
        alert("샘물 로그인 실패:\n샘물 비밀번호를 다시 확인해주세요.");
      })
      .finally(() => {
        setIsSamulSubmitting(false);
      });
  };
  const onSamulInvalid = (e: any) => {
    console.log(e, "onInvalid");
    alert("샘물 비밀번호를 확인해주세요.");
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
            opacity: "0.6",
          }}
        />
      </div>

      <div
        style={{
          maxWidth: "650px",
          margin: "15vh auto",
          border: "1px solid #777",
          background: "rgba(19, 37, 57, 0.6)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)", // 사파리
          borderRadius: "15px",
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
            src="..\logo\logo_w.png"
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
          {/* <hr
            style={{
              maxWidth: "1200px",
              height: "1px",
              border: "none",
              margin: "5px 0",
              backgroundColor: "#aaa",
            }}
          /> */}
          <div
            style={{
              marginTop: "10px",
              maxWidth: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              type={isSubmitting ? "disabled" : "secondary"}
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
              color: "#aaa",
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

      {isPopupOpen && !isSamulSubmitting ? (
        <form
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: "500px",
            maxHeight: "80vh",
            overflowY: "auto",
            backgroundColor: "#111015",
            padding: "30px 30px 20px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            textAlign: "left",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "80%",
                height: "40px",
                backgroundColor: "transparent",
                borderRadius: "10px",
                fontFamily: "Suit-Semibold",
                fontSize: "28px",
                color: "#fff",
              }}
            >
              샘물 비밀번호 입력
            </div>
            <div
              style={{
                width: "80%",
                height: "40px",
                backgroundColor: "transparent",
                borderRadius: "10px",
                fontFamily: "Suit-Regular",
                fontSize: "14px",
                color: "#fff",
              }}
            >
              알림 등의 정보를 가져오기 위한 것으로, 저장되지 않습니다.
            </div>
          </div>
          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "Suit-Regular",
              fontSize: "18px",
              gap: "10px",
            }}
          >
            <div style={{ width: "100%", borderBottom: "1px solid #fff" }}>
              <input
                id="passwordSamul"
                type="password"
                placeholder={`샘물 비밀번호`}
                autoComplete="off"
                {...registerSamul("PasswordSamul", {
                  required: `샘물 비밀번호를 입력하세요.`,
                })}
                style={{
                  width: "100%",
                  minWidth: "150px",
                  height: "40px",
                  borderRadius: "20px",
                  color: "#fff",
                }}
              />
            </div>
          </div>

          <div
            style={{
              width: "100%",
              marginTop: "20px",
              display: "flex",
              justifyContent: "right",
              gap: "10px",
            }}
          >
            <Button
              type="disabled"
              size="small"
              title="취소"
              onClick={() => {
                const deleteEnd = window.confirm(
                  "샘물 비밀번호 미 입력 시 정보가 업데이트 되지 않습니다."
                );
                if (deleteEnd) {
                  setIsPopupOpen(false);
                }
              }}
            />
            <Button
              type={isSamulSubmitting ? "disabled" : "primary"} // 중복 제출 방지
              size="small"
              title="저장"
              onClick={handleSubmitSamul(onSamulValid, onSamulInvalid)}
            />
          </div>
        </form>
      ) : isPopupOpen && isSamulSubmitting ? (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: "500px",
            maxHeight: "80vh",
            overflowY: "auto",
            backgroundColor: "#111015",
            padding: "30px 30px 20px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              border: "8px solid rgba(255, 255, 255, 0.3)",
              borderTop: "8px solid #4285F4",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              animation: "spin 1s linear infinite",
              marginRight: "30px",
            }}
          />
          <div>샘물에서 정보를 가져오는 중입니다...</div>

          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      ) : (
        <></>
      )}
      {isPopupOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            padding: "0 20px",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 999,
          }}
        />
      )}
    </div>
  );
}
