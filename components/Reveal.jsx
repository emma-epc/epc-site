"use client";
import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, className = "", as = "div", delay = 0, ...rest }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setVis(true); io.unobserve(el); } }),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as;
  return (
    <Tag ref={ref} className={`reveal${vis ? " in" : ""} ${className}`.trim()} style={{ transitionDelay: `${delay}s` }} {...rest}>
      {children}
    </Tag>
  );
}
