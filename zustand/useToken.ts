import create from 'zustand';

type TokenStore = {
  token: string;
  setToken: (token: string) => void;
};

const getTokenFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token') || '';
  } else {
    return '';
  }
};

const useToken = create<TokenStore>(set => ({
  token: getTokenFromLocalStorage(),
  setToken: token => {
    localStorage.setItem('token', token);
    set({ token });
  },
}));

export default useToken;
