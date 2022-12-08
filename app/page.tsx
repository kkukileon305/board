import { Board } from '@prisma/client';
import Debug from '../components/Debug';

const getPosts = async (): Promise<Board[]> => {
  const res = await fetch('http://localhost:3000/api/board');

  return res.json();
};

const HomePage = async () => {
  const posts = await getPosts();

  return (
    <div className='mx-auto max-w-[1060px] p-3 w-full'>
      <h2 className='font-bold'>good</h2>
      {posts.map(post => (
        <div key={post.id}>
          <p>{post.categoryName}</p>
          <h2>{post.title}</h2>
          <p>{post.username}</p>
        </div>
      ))}
    </div>
  );
};
export default HomePage;
