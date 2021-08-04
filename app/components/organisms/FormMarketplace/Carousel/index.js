import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList as List } from 'react-window';

import styles from './index.module.scss';

function renderRow(props) {
  const { index, style, data } = props;

  const {
    name,
    description,
  } = data[index];

  return (
    <ListItem button style={style} key={index}>
      <ListItemText primary={name} />
      <ListItemText secondary={description} />
    </ListItem>
  );
}

const Carousel = ({ items }) => (
  <div className={styles.carousel}>
    <List
      className="List"
      height={400}
      itemCount={items.length}
      itemSize={400}
      itemData={items}
      layout="horizontal"
      width={1000}
    >
      {renderRow}
    </List>
  </div>
);

export default Carousel;
