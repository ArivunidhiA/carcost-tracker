export const log = (...args: any[]) => {
  // simple wrapper, replaceable by more advanced logger
  // eslint-disable-next-line no-console
  console.log(...args);
};