// import I18n from '../../../modules/i18n';

import styles from './index.module.scss';

const PaperInputPicker = (props) => {
  const {
    provided, innerRef,
    item, setFormValue, removeValue,
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
      {fieldType === 'input' && (
        <div key={item.id}>
          <h1>Text Input</h1>
          <input type="text" value={label || ''} id={id} onChange={setFormValue} />
          <div onClick={() => removeValue(id)}>Remove</div>
        </div>
      )}
      {fieldType === 'numberInput' && (
        <div key={item.id}>
          <h1>Number Input</h1>
          <input type="text" value={label || ''} id={id} onChange={setFormValue} />
          <div onClick={() => removeValue(id)}>Remove</div>
        </div>
      )}
    </div>
  );
};

export default PaperInputPicker;
