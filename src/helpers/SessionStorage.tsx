
export const setValue = (key: string, value: string | number | boolean | object) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getValue = (key: string) => {
  const result = sessionStorage.getItem(key);

  if (!result) {
    return null;
  }

  return JSON.parse(result);
};

export const clearValue = (key: string) => {
  sessionStorage.removeItem(key);
}