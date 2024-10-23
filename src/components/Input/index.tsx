import { FC, ChangeEvent, ReactNode } from "react";
import Label from "../Label";
import styles from "./Input.module.scss";

export interface InputProps {
  id: string;
  label: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  errorMessage?: ReactNode;
  ariaDescribedby?: string;
}

const Input: FC<InputProps> = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  required = false,
  errorMessage = "",
  ariaDescribedby = "",
  ...rest
}) => {
  return (
    <div className={styles.inputWrapper}>
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        aria-required={required}
        aria-describedby={ariaDescribedby || `${id}-error`}
        aria-invalid={!!errorMessage}
        className={styles.input}
        {...rest}
      />

      {errorMessage && (
        <span id={`${id}-error`} className={styles.error}>
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default Input;
