export const replaceSpacesWithDash = (str: string) => {
  const splitString = str.split(" ");
  const newString = splitString.reduce((a, b) => `${a}-${b}`);
  return newString;
};
