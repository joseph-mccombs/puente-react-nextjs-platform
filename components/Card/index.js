import styles from './index.module.scss';

const Card = ({ title, description }) => (
  <div href="https://nextjs.org/docs" className={styles.card}>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

export default Card;
