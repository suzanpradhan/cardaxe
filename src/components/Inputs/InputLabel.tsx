const InputLable = ({
  htmlFor,
  inputLabel,
}: {
  htmlFor: string;
  inputLabel: string;
}) => (
  <label htmlFor={htmlFor} className="pb-2 text-sm font-medium">
    {inputLabel}
  </label>
);

export default InputLable;
