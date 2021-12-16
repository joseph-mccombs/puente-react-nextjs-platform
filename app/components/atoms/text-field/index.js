import TextField from '@material-ui/core/TextField';

export default function Text({
  variant, label, text, ...rest
}) {
  return (
    <div>
      <TextField
        {...rest}
        variant
        label
        placeholder={text}
      />
    </div>
  );
}
