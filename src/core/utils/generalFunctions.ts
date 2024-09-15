export const fistLetterToLowerCase = (inputString: string) => {
  if (inputString.length === 0) {
    return inputString;
  }

  return inputString.charAt(0).toLowerCase() + inputString.slice(1);
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

export const snakeToCamel = <T>(obj: T): any => {
  if (Array.isArray(obj)) {
    return obj.map(snakeToCamel);
  } else if (typeof obj === 'object' && obj !== null) {
    const camelObj: Record<string, any> = {};

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        let camelKey = key.replace(/_[a-z]/g, (match) => match.slice(1).toUpperCase());
        camelKey = camelKey[0].toLowerCase() + camelKey.slice(1);
        camelObj[camelKey] = snakeToCamel(obj[key]);
      }
    }

    return camelObj;
  } else {
    return obj;
  }
};

export const convertStringToHTML = (htmlString: string) => {
  const parser = new DOMParser();
  const html = parser.parseFromString(htmlString, 'text/html');

  return html.body;
};

export const getMinUserName = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0].toUpperCase())
    .join('');
}
