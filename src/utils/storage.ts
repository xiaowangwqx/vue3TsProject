// 封装本地存储 存储数据 读取数据

export const setToken = (token: string) => {
  localStorage.setItem('TOKEN', token);
};

export const getToken = () => {
  return localStorage.getItem('TOKEN');
};

export const removeToken = (key: string) => {
  return localStorage.removeItem(key);
};
