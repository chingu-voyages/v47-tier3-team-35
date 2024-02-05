export function removeExtension(filename: string): [string, string] {
  const splitArr = filename.split(".");
  if (splitArr.length < 2) return [filename, ""];
  const newName = splitArr
    .slice(0, splitArr.length - 1)
    .reduce((a, b) => a + "." + b);
  const extension = splitArr[splitArr.length - 1];
  return [newName, extension];
}
