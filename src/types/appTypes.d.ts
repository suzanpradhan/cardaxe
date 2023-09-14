import { CardState } from '@/app/GlobalRedux/Features/cardSlice';

export type InputFieldProps = {
  zSchemaName: string;
  inputType?: string;
  inputCompType?:
    | 'select'
    | 'textArea'
    | 'switch'
    | 'file'
    | 'normal'
    | 'color'
    | 'multiSelect';
  placeholder?: string;
  register?: any;
  disableInput?: boolean;
  inputLabel?: string;
  className?: string;
  options?: string[];
  onHandleChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    stateObject:
      | CardState['contentForm']
      | CardState['designForm']
      | CardState['infosForm']
  ) => void;
};

export type CardTemplatesType = {
  id: number;
  name: string;
  html_code: string;
  version: string;
  card_template_category: {
    id: number;
    name: string;
  };
  default_card_fields: {
    id: number;
    prefix: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    designation: string;
    department: string;
    company: string;
    suffix: string;
    bio: string;
    website: string;
    phone: string;
    email: string;
  };
};

export type CardContentType = {
  id?: number;
  prefix: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  designation?: string;
  department?: string;
  company?: string;
  suffix: string;
  bio: string;
  website?: string;
  phone: string;
  email: string;
};

export type SnakeCardContentType = {
  id?: number;
  prefix: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  designation?: string;
  department?: string;
  company?: string;
  suffix: string;
  bio: string;
  website?: string;
  phone: string;
  email: string;
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
