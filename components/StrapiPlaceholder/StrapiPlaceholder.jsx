import styles from "./StrapiPlaceholder.module.css";

export default function StrapiPlaceholder() {
  return (
    <div className={styles.placeholder}>
      <p>Il Server Strapi non è attivo al momento!</p>
    </div>
  );
}
