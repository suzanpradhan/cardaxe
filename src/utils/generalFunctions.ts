import { CardState } from '@/app/GlobalRedux/Features/cardSlice';
import { CardContentType, SnakeCardContentType } from '@/types/appTypes';
import { TypeOf } from 'zod';

export const fistLetterToLowerCase = (inputString: string) => {
  if (inputString.length === 0) {
    return inputString;
  }

  return inputString.charAt(0).toLowerCase() + inputString.slice(1);
};

export const findObjectContainingElement = (
  elementToFind: string,
  initialState: CardState
) => {
  for (const objectName in initialState) {
    if (Object.prototype.hasOwnProperty.call(initialState, objectName)) {
      const object = initialState[objectName as keyof typeof initialState];
      if (Object.values(object).includes(elementToFind)) {
        return objectName;
      }
    }
  }
  return null; // Return null if the element was not found in any object.
};

export const camelToSnake = (obj: CardContentType): SnakeCardContentType => {
  const snakeObjTest: Record<string, any> = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const snakeKey = key.replace(
        /[A-Z]/g,
        (match) => `_${match.toLowerCase()}`
      );
      snakeObjTest[snakeKey as keyof typeof snakeObj] =
        obj[key as keyof typeof obj];
    }
  }

  const snakeObj: SnakeCardContentType = {
    ...snakeObjTest,
  } as SnakeCardContentType;

  return snakeObj;
};

// export const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const dispatch = useDispatch();
//   const cardState: CardState = useSelector((state: RootState) => state.card);

//   const { name, value, type, files } = e.target;
//   const stateValue =
//     type === 'file' && files ? window.URL.createObjectURL(files[0]) : value;

//   if (cardState.contentForm.hasOwnProperty(name)) {
//     const updatedFormState: CardState['contentForm'] = {
//       ...cardState.contentForm,
//       [name]: stateValue,
//     };
//     dispatch(updateContentForm(updatedFormState));
//   } else if (cardState.designForm.hasOwnProperty(name)) {
//     const updatedFormState: CardState['designForm'] = {
//       ...cardState.designForm,
//       [name]: stateValue,
//     };
//     dispatch(updateDesignForm(updatedFormState));
//   } else if (cardState.designForm.hasOwnProperty(name)) {
//     const updatedFormState: CardState['infosForm'] = {
//       ...cardState.infosForm,
//       [name]: stateValue,
//     };
//     dispatch(updateInfosForm(updatedFormState));
//   }
// };
