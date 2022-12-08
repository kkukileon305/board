'use client';

import { axiosInstance } from '../lib/axios';

const Debug = () => {
  const onClick = async () => {
    const { data } = await axiosInstance.get('board');
    console.log(data);
  };

  return <button onClick={onClick}>Debug</button>;
};
export default Debug;
