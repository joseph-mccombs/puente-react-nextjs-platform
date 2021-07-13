import styles from './index.module.scss';
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';

const Card = ({ title, description }) => (
  <a className={styles.card}>
    <FolderOpenOutlinedIcon 
        fontSize='large'
    />
    <hr></hr>
    <p>{title}</p>
    <p>{description}</p>
  </a>

);

export default Card;
