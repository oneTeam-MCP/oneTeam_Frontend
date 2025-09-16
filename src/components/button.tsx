import React from "react";
import { useState } from "react";
import styled, { css } from "styled-components";
import "../App.css";

type ButtonType =
  | "primary"
  | "secondary"
  | "third"
  | "logIn"
  | "submit"
  | "disabled";
type Size = "xsmall" | "small" | "medium" | "large" | "xlarge" | "logIn";

type ButtonProps = {
  onClick?: () => void;
  type?: ButtonType;
  size?: Size;
  title: string;
};

const ButtonContainer = styled.div<{
  type: "primary" | "secondary" | "third" | "logIn" | "submit" | "disabled";
  size: "xsmall" | "small" | "medium" | "large" | "xlarge" | "logIn";
}>`
  border: ${(props) => (props.type === "logIn" ? "none" : "none")};
  border-radius: ${(props) => (props.type === "logIn" ? "0" : "15px")};
  justify-content: center;
  align-items: center;
  display: flex;
  opacity: ${(props) => (props.type === "disabled" ? 1 : 0.8)};
  transition: all 0.3s ease;
  background-color: ${(props) =>
    props.type === "primary"
      ? "#114DF0"
      : props.type === "secondary"
      ? "#8AA7F8"
      : props.type === "third"
      ? "#EEF0FE"
      : props.type === "disabled"
      ? "#555"
      : "#2156C6"};
  color: ${(props) =>
    props.type === "primary"
      ? "#fff"
      : props.type === "secondary"
      ? "#114DF0"
      : props.type === "third"
      ? "#114DF0"
      : props.type === "disabled"
      ? "#999"
      : "#fff"};
  cursor: ${(props) => (props.type === "disabled" ? "default" : "pointer")};

  ${(props) =>
    props.size === "xlarge" &&
    css`
      height: 45px;
      font-size: 18px;
      font-weight: 700;
      width: 500px;
      text-align: center;
    `}
  ${(props) =>
    props.size === "large" &&
    css`
      height: 50px;
      font-size: 18px;
      font-weight: 700;
      width: 450px;
      text-align: center;
    `}
  ${(props) =>
    props.size === "medium" &&
    css`
      height: 40px;
      font-size: 18px;
      font-weight: 600;
      width: 200px;
      text-align: center;
    `}
    ${(props) =>
    props.size === "small" &&
    css`
      height: 30px;
      font-size: 16px;
      width: 120px;
      text-align: center;
    `}
    ${(props) =>
    props.size === "xsmall" &&
    css`
      height: 25px;
      font-size: 16px;
      width: 80px;
      text-align: center;
    `}
    ${(props) =>
    props.size === "logIn" &&
    css`
      height: 60px;
      font-size: 18px;
      width: 180px;
      text-align: center;
    `}
    &:hover {
    opacity: 1;
    // & p {
    //   transition: all 0.3s ease;
    //   text-shadow: 0 0 0.1em, 0 0 0.3em;
    // }
  }
`;

const ButtonTitle = styled.p`
  font-family: Pretendard-Regular;
`;

export default function Button(props: ButtonProps) {
  const { type, size, title, onClick = () => {} } = props;
  const [hover, setHover] = useState(false);
  return (
    <ButtonContainer
      type={type}
      size={size}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <ButtonTitle>{title}</ButtonTitle>
    </ButtonContainer>
  );
}
