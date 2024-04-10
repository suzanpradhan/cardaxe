import { FieldConfig, FieldInputProps } from 'formik';

export type InputFieldProps = {
  getFieldProps: (
    nameOrOptions: string | FieldConfig<any>
  ) => FieldInputProps<any>;
  setFormikFieldValue?: (field: string, value: any) => void;
  zSchemaName: string;
  inputType?: string;
  inputValue: string;
  inputCompType?:
  | 'select'
  | 'textArea'
  | 'switch'
  | 'file'
  | 'normal'
  | 'color'
  | 'multiSelect';
  placeholder?: string;
  onChange?: (e: any) => void;
  disableInput?: boolean;
  inputLabel?: string;
  className?: string;
  options?: { value: string; label: string }[];
  socialLinkName?: string;
};



// export type StateObjectType =
//   | {
//       prefix: string;
//       firstName: string;
//       middleName: string;
//       lastName: string;
//       suffix: string;
//       bio: string;
//       designation: string;
//       department: string;
//       company: string;
//       phone: string;
//       website: string;
//       email: string;
//       isDefault: boolean;
//     }
//   | {
//       backgroundColor: string;
//       backgroundImage: string | null;
//       logoUrl: string | null;
//       showSocialIcons: boolean;
//       showLogo: boolean;
//       darkMode: boolean;
//     }
//   | {
//       cardId: number;
//       cardInfosId: number;
//       url: string[];
//       displayText: string[];
//     };
