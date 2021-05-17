export function omit(object: object, propsToRemove: string[] = []) {
  const draft = { ...object };
  propsToRemove.forEach((prop) => delete draft[prop]);
  return draft;
}
