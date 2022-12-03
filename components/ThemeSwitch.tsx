'use client';

import { useTheme } from 'next-themes';

const ThemeSwitch = () => {
  const { setTheme, theme } = useTheme();

  return <button onClick={() => setTheme(theme === 'dark' ? 'white' : 'dark')}>ThemeSwitch</button>;
};
export default ThemeSwitch;
