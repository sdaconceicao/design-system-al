import { FC, ReactNode } from "react";
import styles from "./Messages.module.scss";

export interface MessageProps {
  type?: "default" | "error" | "success";
  children: ReactNode;
}

const Message: FC<MessageProps> = ({ type = "default", children }) => (
  <div className={`${styles.messages} ${styles[type]}`}>{children}</div>
);
export default Message;
