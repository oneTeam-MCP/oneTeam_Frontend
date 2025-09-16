import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import Button from "../components/button.tsx";

import "../App.css";

const majors = [
  "휴먼지능정보공학전공",
  "컴퓨터과학전공",
  "핀테크·빅데이터융합·스마트생산전공",
  "지능IOT융합전공",
  "애니메이션전공",
  "전기공학전공",
  "한일문화콘텐츠전공",
  "생명공학전공",
  "화공신소재전공",
  "화학에너지공학전공",
  "기타",
];

export default function SignUp() {
  const {
    register,
    handleSubmit,
    setFocus,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setFocus("StudentNum");
  }, [setFocus]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRePasswordVisible, setIsRePasswordVisible] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState("학과 선택");

  const onValid = async (e: any) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    e.PhoneNum = e.PhoneNum.replace(/-/g, "");
    try {
      console.log(e, "onValid");
      //   await SignupAPI(email, e.Password, e.Name, e.Major, e.PhoneNum);
    } catch (error) {
      console.error("회원가입 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const onInvalid = (e: any) => {
    console.log(e, "onInvalid");
    alert("회원가입 실패");
  };

  const handleChange = (e) => {
    setSelectedMajor(e.target.value);
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

  const passwordPattern =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*.,/])[a-zA-Z\d!@#$%^&*.,/]{8,24}$/;

  const autoSeparate = (id: string) => {
    let input = document.getElementById(id) as HTMLInputElement | null;

    if (!input) {
      console.error(`Element with id "${id}" not found.`);
      return;
    }
    let inputValue = input.value;

    inputValue = inputValue.replace(/[^0-9]/g, "");
    if (inputValue.length > 3 && inputValue.charAt(3) !== "-") {
      inputValue = inputValue.slice(0, 3) + "-" + inputValue.slice(3);
    }
    if (inputValue.length > 8 && inputValue.charAt(8) !== "-") {
      inputValue = inputValue.slice(0, 8) + "-" + inputValue.slice(8);
    }
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
            maxWidth: "200px",
            margin: "50px auto",
            marginBottom: "100px",
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
                marginBottom: "50px",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "Pretendard-Regular",
                    fontSize: "16px",
                  }}
                >
                  학번
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "30px",
                    borderBottom: "1px solid #777",
                    margin: "0 auto",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <input
                    id="studentNum"
                    placeholder="ex) 202511111"
                    type="text"
                    autoComplete="off"
                    onKeyUp={() => {
                      autoPattern("studentNum");
                    }}
                    {...register("StudentNum", {
                      required: "학번을 입력해주세요.",
                      pattern: {
                        value: /^[0-9]{9,9}$/,
                        message: "학번 9자리만 입력해주세요.",
                      },
                    })}
                    style={{
                      width: "100%",
                      maxWidth: "250px",
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "Pretendard-Regular",
                      fontSize: "clamp(14px, 2vw, 16px)",
                      color: "#777",
                    }}
                  >
                    @sangmyung.kr
                  </div>
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "Pretendard-Regular",
                    fontSize: "16px",
                  }}
                >
                  비밀번호
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "30px",
                    borderBottom: "1px solid #777",
                    margin: "0 auto",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <input
                    id="password"
                    placeholder="비밀번호 입력"
                    type={isPasswordVisible ? "text" : "password"}
                    {...register("Password", {
                      required: "비밀번호를 입력해주세요.",
                      pattern: {
                        value: passwordPattern,
                        message:
                          "영어, 숫자, 특수문자 포함 8-24자리를 입력해주세요.",
                      },
                    })}
                    style={{
                      width: "100%",
                      maxWidth: "360px",
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
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "Pretendard-Regular",
                    fontSize: "16px",
                  }}
                >
                  비밀번호 확인
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "30px",
                    borderBottom: "1px solid #777",
                    margin: "0 auto",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <input
                    id="rePassword"
                    placeholder="비밀번호 확인"
                    type={isRePasswordVisible ? "text" : "password"}
                    {...register("RePassword", {
                      required: "비밀번호를 확인해주세요.",
                      validate: (value) =>
                        value === getValues("Password") ||
                        "비밀번호가 일치하지 않습니다.",
                    })}
                    style={{
                      width: "100%",
                      maxWidth: "360px",
                    }}
                  />
                  {isRePasswordVisible ? (
                    <img
                      src="../icon/eye_open.png"
                      alt="eye_open"
                      color="#777"
                      style={{
                        width: "25px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        setIsRePasswordVisible(!isRePasswordVisible)
                      }
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
                      onClick={() =>
                        setIsRePasswordVisible(!isRePasswordVisible)
                      }
                    />
                  )}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "Pretendard-Regular",
                    fontSize: "16px",
                  }}
                >
                  학과
                </div>
                <select
                  defaultValue="학과 선택"
                  id="major"
                  style={{
                    width: "100%",
                    height: "30px",
                    backgroundColor: "transparent",
                    border: "none",
                    borderBottom: "1px solid #777",
                    marginBottom: "20px",
                    fontFamily: "Pretendard-Light",
                    fontSize: "clamp(14px, 2.2vw, 18px)",
                    color: selectedMajor === "학과 선택" ? "#aaa" : "#000",
                    cursor: "pointer",
                  }}
                  {...register("Major", {
                    validate: (value) =>
                      value !== "학과 선택" || "학과를 선택해주세요.",
                    onChange: handleChange,
                  })}
                >
                  <option
                    disabled
                    value="학과 선택"
                    style={{ background: "#fff", cursor: "pointer" }}
                  >
                    학과 선택
                  </option>
                  {majors.map((major) => (
                    <option
                      key={major}
                      value={major}
                      style={{
                        color: "#000",
                        background: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      {major}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "Pretendard-Regular",
                    fontSize: "16px",
                  }}
                >
                  전화번호
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "30px",
                    borderBottom: "1px solid #777",
                    margin: "0 auto",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <input
                    id="phoneNum"
                    placeholder="전화번호 입력 (숫자만)"
                    type="text"
                    autoComplete="off"
                    onKeyUp={() => autoSeparate("phoneNum")}
                    {...register("PhoneNum", {
                      required: "전화번호를 입력해주세요.",
                      minLength: {
                        value: 13,
                        message:
                          "전화번호는 '-'를 제외한 11자리를 입력해주세요.",
                      },
                      maxLength: {
                        value: 13,
                        message:
                          "전화번호는 '-'를 제외한 11자리를 입력해주세요.",
                      },
                    })}
                    style={{
                      width: "100%",
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              style={{
                width: "100%",
                textAlign: "center",
                marginBottom: "40px",
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
                    title="회원가입"
                    onClick={handleSubmit(onValid, onInvalid)}
                  />
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
