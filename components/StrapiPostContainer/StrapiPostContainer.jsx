import styles from "./StrapiPostContainer.module.css";

export default function StrapiPostContainer({ children }) {
  return <div className={styles.grid}>{children}</div>;
}
