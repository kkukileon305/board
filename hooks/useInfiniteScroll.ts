import { Board } from '@prisma/client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

type InfiniteScrollProps = { fetcher: (pageParam: number) => Promise<Board[]>; key: string };

const useInfiniteScroll = ({ fetcher, key }: InfiniteScrollProps) => {
  const [spinnerElement, setSpinnerElement] = useState<HTMLDivElement | null>(null);
  const {
    data: boardsInfinite,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<Board[]>({
    queryFn: ({ pageParam = 1 }) => fetcher(pageParam),
    queryKey: [key],
    getNextPageParam: (lastPage, allPage) => (lastPage.length < 16 ? undefined : allPage.length + 1),
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const spinner = entries[0];

        if (spinner.intersectionRatio > 0 && spinner.isIntersecting) {
          hasNextPage && fetchNextPage();
        }
      },
      {
        threshold: 1,
      }
    );

    spinnerElement && observer.observe(spinnerElement);

    return () => observer.disconnect();
  }, [spinnerElement]);

  return { setSpinnerElement, boardsInfinite, hasNextPage };
};

export default useInfiniteScroll;
