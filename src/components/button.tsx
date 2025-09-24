// src/components/button.tsx
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

const ButtonContainer = styled.div<{ $variant: ButtonType; $size: Size }>`
  border: ${(p) => (p.$variant === "logIn" ? "none" : "none")};
  border-radius: ${(p) => (p.$variant === "logIn" ? "0" : "15px")};
  justify-content: center;
  align-items: center;
  display: flex;
  opacity: ${(p) => (p.$variant === "disabled" ? 1 : 0.8)};
  transition: all 0.3s ease;

  background-color: ${(p) =>
    p.$variant === "primary"
      ? "#114DF0"
      : p.$variant === "secondary"
      ? "#8AA7F8"
      : p.$variant === "third"
      ? "#EEF0FE"
      : p.$variant === "disabled"
      ? "#555"
      : "#2156C6"};

  color: ${(p) =>
    p.$variant === "primary"
      ? "#fff"
      : p.$variant === "secondary"
      ? "#114DF0"
      : p.$variant === "third"
      ? "#114DF0"
      : p.$variant === "disabled"
      ? "#999"
      : "#fff"};

  cursor: ${(p) => (p.$variant === "disabled" ? "default" : "pointer")};

  ${(p) =>
    p.$size === "xlarge" &&
    css`
      height: 45px;
      font-size: 18px;
      font-weight: 700;
      width: 500px;
      text-align: center;
    `}
  ${(p) =>
    p.$size === "large" &&
    css`
      height: 50px;
      font-size: 18px;
      font-weight: 700;
      width: 450px;
      text-align: center;
    `}
  ${(p) =>
    p.$size === "medium" &&
    css`
      height: 40px;
      font-size: 18px;
      font-weight: 600;
      width: 200px;
      text-align: center;
    `}
  ${(p) =>
    p.$size === "small" &&
    css`
      height: 30px;
      font-size: 16px;
      width: 120px;
      text-align: center;
    `}
  ${(p) =>
    p.$size === "xsmall" &&
    css`
      height: 25px;
      font-size: 16px;
      width: 80px;
      text-align: center;
    `}
  ${(p) =>
    p.$size === "logIn" &&
    css`
      height: 60px;
      font-size: 18px;
      width: 180px;
      text-align: center;
    `}

  &:hover {
    opacity: 1;
  }
`;

const ButtonTitle = styled.p`
  font-family: Pretendard-Regular;
`;

export default function Button(props: ButtonProps) {
  // 기본값을 지정해 undefined를 제거
  const {
    type = "primary",
    size = "medium",
    title,
    onClick = () => {},
  } = props;

  const [hover, setHover] = useState(false); // 현재 미사용. 필요없다면 제거해도 OK.

  return (
    <ButtonContainer
      $variant={type}
      $size={size}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <ButtonTitle>{title}</ButtonTitle>
    </ButtonContainer>
  );
}
