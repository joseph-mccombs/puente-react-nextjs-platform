import styles from './index.module.scss';

const Card = ({ title, description, nextLink }) => (
  <a href={nextLink ? nextLink : ""} className={styles.card}>
    <h3>{title}</h3>
    <p>{description}</p>
  </a>

);

export default Card;
