
const localStorageKey = 'budgetApp';

export const saveDataToLocalStorage = (data: any) => {
  localStorage.setItem(localStorageKey, JSON.stringify(data));
};

export const getDataFromLocalStorage = () => {
  const data = localStorage.getItem(localStorageKey);
  return data ? JSON.parse(data) : null;
};

export const clearLocalStorage = () => {
  localStorage.removeItem(localStorageKey);
};
