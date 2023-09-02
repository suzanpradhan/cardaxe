export type InputFieldProps = {
  zSchemaName: string;
  inputType?: string;
  inputCompType?:
    | 'select'
    | 'textArea'
    | 'switch'
    | 'file'
    | 'normal'
    | 'color';
  placeholder?: string;
  register?: any;
  disableInput?: boolean;
  inputLabel?: string;
  className?: string;
};
