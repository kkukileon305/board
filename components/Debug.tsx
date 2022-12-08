'use client';

import { axiosInstance } from '../lib/axios';
import useToken from '../zustand/useToken';

const Debug = () => {
  const token = useToken(store => store.token);
  const onClick = async () => {
    console.log(token);
  };

  return <button onClick={onClick}>Debug</button>;
};
export default Debug;
