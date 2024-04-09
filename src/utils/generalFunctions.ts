import { CardState } from '@/modules/card/cardReducer';
import { CardContentType, SnakeCardContentType } from '@/core/types/appTypes';

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

export const camelToSnake = <T>(obj: T): Record<string, any> => {
  const snakeObj: Record<string, any> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const snakeKey = key.replace(
        /[A-Z]/g,
        (match) => `_${match.toLowerCase()}`
      );
      snakeObj[snakeKey] = obj[key];
    }
  }

  return snakeObj;
};

// export const camelToSnake = <T>(obj: T): T => {
//   const snakeObjTest: Record<string, any> = {};

//   for (const key in obj) {
//     if (Object.prototype.hasOwnProperty.call(obj, key)) {
//       const snakeKey = key.replace(
//         /[A-Z]/g,
//         (match) => `_${match.toLowerCase()}`
//       );
//       snakeObjTest[snakeKey as keyof typeof snakeObj] =
//         obj[key as keyof typeof obj];
//     }
//   }

//   const snakeObj = {
//     ...snakeObjTest,
//   };

//   return snakeObj;
// };

export const convertStringToHTML = (htmlString: string) => {
  const parser = new DOMParser();
  const html = parser.parseFromString(htmlString, 'text/html');

  return html.body;
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
