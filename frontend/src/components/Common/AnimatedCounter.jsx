import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const AnimatedCounter = ({ from = 0, to, duration = 1.6, suffix = '' }) => {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });

  useEffect(() => {
    if (!inView) return;

    const end = parseInt(to, 10);
    if (isNaN(end)) return;

    const totalSteps = 45;
    const stepTime = (duration * 1000) / totalSteps;
    const increment = (end - from) / totalSteps;

    let current = from;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, from, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;