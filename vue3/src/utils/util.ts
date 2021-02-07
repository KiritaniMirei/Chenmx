export const arrToObj = <T extends { [key: string]: any }>(arr: Array<T>, key: string) => {
  return arr.reduce((total, current) => {
    if (current[key]) {
      total[current[key]] = current;
    }
    return total;
  }, {} as { [key: string]: T });
};

export const base64ToBlob = (base64: string) => {
  const parts = base64.split(';base64,');
  const rawData = atob(parts[1]);
  const length = rawData.length;
  const array = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    array[i] = rawData.charCodeAt(i);
  }
  const type = parts[0].split(':')[1];
  return new Blob([array], { type });
};

export const downloadFile = (fileName: string, blob: Blob) => {
  const a = document.createElement('a');
  a.download = fileName;
  a.href = URL.createObjectURL(blob);
  a.click();
};
