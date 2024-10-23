import { FC, ReactNode } from "react";
import styles from "./Button.module.scss";

export interface ButtonProps {
  variant?: "primary" | "secondary";
  type: "button" | "submit";
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  variant = "primary",
  type = "button",
  children,
  onClick,
  disabled = false,
}) => (
  <button
    className={`${styles.button} ${
      variant === "primary" ? styles.primary : styles.secondary
    }`}
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);
export default Button;
