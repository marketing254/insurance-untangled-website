"use client";

import { useEffect, useRef, useState } from "react";

interface CounterAnimationProps {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
  suffixClassName?: string;
}

export default function CounterAnimation({
  target,
  suffix = "",
  duration = 2000,
  className,
  suffixClassName,
}: CounterAnimationProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);
  const prevCount = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const startTime = performance.now();

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const next = Math.round(eased * target);
            // Only call setState when the displayed integer actually changes
            if (next !== prevCount.current) {
              prevCount.current = next;
              setCount(next);
            }
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <div ref={ref} className={className}>
      {count}
      {suffix && <span className={suffixClassName}>{suffix}</span>}
    </div>
  );
}
