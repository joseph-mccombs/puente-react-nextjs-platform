import { FixedSizeList as List } from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import styles from './index.module.scss';

function renderRow(props) {
  const { index, style, data } = props;

  return (
    // <div>
    // {data[index]?.type === 'card' &&
    //   <Card 
    //   title={data[index].primaryText}
    //   description={data[index].primaryText}
    //   />
    // }
    // {!data[index]?.type &&
      <ListItem button style={style} key={index}>
        <ListItemText primary={`Item ${data[index].primaryText}`} />
      </ListItem>
    // }
    // </div>
  );
}


const Carousel = ({ items }) =>{
  return (
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
  )
};

export default Carousel;
