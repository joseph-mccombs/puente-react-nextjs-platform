import Header from './Header';
import styles from './index.module.scss';
import Input from './Input';
import Select from './Select';
import Geolocation from './Geolocation';

const PaperInputPicker = (props) => {
  const {
    provided, innerRef,
    item,
    formItems, setFormItems,
    removeValue,
  } = props;

  return (
    <div
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={innerRef}
      className={styles.block}
    >
      <Input
        item={item}
        formItems={formItems}
        setFormItems={setFormItems}
        removeValue={removeValue}
      />
      <Select
        item={item}
        formItems={formItems}
        setFormItems={setFormItems}
        removeValue={removeValue}
      />
      <Header
        item={item}
        formItems={formItems}
        setFormItems={setFormItems}
        removeValue={removeValue}
      />
      <Geolocation
        item={item}
        formItems={formItems}
        setFormItems={setFormItems}
        removeValue={removeValue}
      />
    </div>
  );
};

export default PaperInputPicker;
