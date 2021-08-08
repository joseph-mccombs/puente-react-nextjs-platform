import styles from './index.module.scss';

const Card = ({
  title, description, nextLink, action,
}) => (
  <a href={nextLink || null} className={styles.card}>
    <h3>{title}</h3>
    <p>{description}</p>
    {action
    && <button onClick={action}>Click me!</button>}
  </a>

);

export default Card;
