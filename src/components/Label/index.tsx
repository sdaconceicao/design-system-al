import { FC, ReactNode } from "react";
import styles from "./Label.module.scss";

export interface LabelProps {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
}

const Label: FC<LabelProps> = ({ htmlFor, required = false, children }) => (
  <label htmlFor={htmlFor} className={styles.label}>
    {children}
    {required && (
      <span aria-hidden="true" className={styles.required}>
        *
      </span>
    )}
  </label>
);

export default Label;
