import { useEffect, useState } from 'react';

type ScrollDirection = 'up' | 'down';

interface ScrollInfo {
  direction: ScrollDirection;
  position: number;
}

export function useScroll(): ScrollInfo {
  const [scrollInfo, setScrollInfo] = useState<ScrollInfo>({ direction: 'up', position: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const direction: ScrollDirection = scrollY > scrollInfo.position ? 'down' : 'up';
      setScrollInfo({ direction, position: scrollY });
    };

    // Attach the scroll event listener to the window
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollInfo.position]);

  return scrollInfo;
}