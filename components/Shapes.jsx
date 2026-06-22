// Formes "papiers découpés" façon Matisse — composants SVG réutilisables.

export function Flower({ size = 80, petal = "#EF7BA9", center = "#E9A92E", className }) {
  return (
    <svg width={size} height={size} viewBox="-55 -55 110 110" className={className} aria-hidden="true">
      <g>
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse key={r} cx="0" cy="-30" rx="15" ry="29" fill={petal} transform={`rotate(${r})`} />
        ))}
        <circle r="13" fill={center} />
      </g>
    </svg>
  );
}

export function Spark({ size = 56, color = "#E9A92E", className }) {
  return (
    <svg width={size} height={size} viewBox="-55 -55 110 110" className={className} aria-hidden="true">
      <path
        d="M0,-52 C8,-20 20,-8 52,0 C20,8 8,20 0,52 C-8,20 -20,8 -52,0 C-20,-8 -8,-20 0,-52 Z"
        fill={color}
      />
    </svg>
  );
}

export function Leaf({ size = 80, color = "#92B29C", className }) {
  return (
    <svg width={size} height={size} viewBox="-55 -55 110 110" className={className} aria-hidden="true">
      <path d="M0,-50 C24,-22 24,22 0,50 C-24,22 -24,-22 0,-50 Z" fill={color} />
    </svg>
  );
}

export function Squiggle({ size = 100, color = "#B85C4A", className }) {
  return (
    <svg width={size} height={size * 0.4} viewBox="-60 -24 120 48" className={className} aria-hidden="true">
      <path
        d="M-55,0 C-38,-32 -18,32 0,0 C18,-32 38,32 55,0"
        fill="none"
        stroke={color}
        strokeWidth="11"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Arc({ size = 74, color = "#BCA9DE", className }) {
  return (
    <svg width={size} height={size} viewBox="-55 -55 110 110" className={className} aria-hidden="true">
      <path d="M28,-40 A46,46 0 1 0 28,40" fill="none" stroke={color} strokeWidth="14" strokeLinecap="round" />
    </svg>
  );
}

export const ShapeByName = ({ name, ...props }) => {
  const map = { flower: Flower, spark: Spark, leaf: Leaf, squiggle: Squiggle, arc: Arc };
  const C = map[name] || Spark;
  return <C {...props} />;
};
