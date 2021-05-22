import styles from './index.module.scss';
import Input from './Input';
import Select from './Select';
import SelectMulti from './MultiSelect';

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
      <SelectMulti
        item={item}
        formItems={formItems}
        setFormItems={setFormItems}
        removeValue={removeValue}
      />
    </div>
  );
};

export default PaperInputPicker;
