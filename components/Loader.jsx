"use client";
import { useEffect, useState } from "react";

export default function Loader() {
  const [stage, setStage] = useState("init"); // init -> fill -> done -> gone

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setStage("fill"), 80);
    const t2 = setTimeout(() => setStage("done"), 1300);
    const t3 = setTimeout(() => { setStage("gone"); document.body.style.overflow = ""; }, 2200);
    return () => { [t1, t2, t3].forEach(clearTimeout); document.body.style.overflow = ""; };
  }, []);

  if (stage === "gone") return null;
  const cls = "loader" + (stage === "fill" ? " fill" : "") + (stage === "done" ? " fill done" : "");

  return (
    <div className={cls} aria-hidden="true">
      <img className="l-wordmark" src="/wordmark.png" alt="EP Communication" />
      <div className="l-bar"><i /></div>
    </div>
  );
}
