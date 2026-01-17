import { useEffect, useRef } from "react";

type Options = {
  enabled: boolean;
  onLoadMore: () => void;
};

export function useInfiniteScroll({ enabled, onLoadMore }: Options) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onLoadMore();
      },
      { root: null, rootMargin: "200px", threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled, onLoadMore]);

  return ref;
}
