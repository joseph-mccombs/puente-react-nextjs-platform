// import I18n from '../../../modules/i18n';

import styles from './index.module.scss';
import Input from './Input';
import Select from './Select';

const PaperInputPicker = (props) => {
  const {
    provided, innerRef,
    item,
    formItems, setFormItems,
    removeValue,
  } = props;
  const {
    label, text, fieldType, id,
  } = item;

  return (
    <div
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={innerRef}
    >
      <Input
        item={item}
        formItems={formItems}
        setFormItems={setFormItems}
        removeValue={removeValue}
        fieldType={fieldType}
      />
      <Select
        item={item}
        formItems={formItems}
        setFormItems={setFormItems}
        removeValue={removeValue}
        fieldType={fieldType}
      />
    </div>
  );
};

export default PaperInputPicker;
