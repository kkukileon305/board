'use client';

const Debug = () => {
  const onClick = async () => {
    console.log(process.env.NODE_ENV);
  };

  return <button onClick={onClick}>Debug</button>;
};
export default Debug;
