export const arrToObj = <T extends { [key: string]: any }>(arr: Array<T>, key: string) => {
  return arr.reduce((total, current) => {
    if (current[key]) {
      total[current[key]] = current;
    }
    return total;
  }, {} as { [key: string]: T });
};
