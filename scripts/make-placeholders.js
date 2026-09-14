const fs = require("fs");
const path = require("path");

const items = [
  { file: "placeholder-amigurumi.svg", bg: "#f3e2d3", accent: "#c1694f", label: "Amigurumi Bunny" },
  { file: "placeholder-blanket.svg", bg: "#e9e2d0", accent: "#7c8c6e", label: "Granny Square Throw" },
  { file: "placeholder-beanie.svg", bg: "#f0d9c4", accent: "#a8543c", label: "Chunky Beanie" },
  { file: "placeholder-cardigan.svg", bg: "#e6ded2", accent: "#8a7458", label: "Cropped Cardigan" },
  { file: "placeholder-tutorial.svg", bg: "#f3e9da", accent: "#c1694f", label: "Reading a Pattern" },
  { file: "placeholder-tote.svg", bg: "#ece3d2", accent: "#7c8c6e", label: "Market Tote Bag" },
  { file: "placeholder-owl.svg", bg: "#e9e2d0", accent: "#8a7458", label: "Crochet Owl" },
  { file: "placeholder-baby-blanket.svg", bg: "#f0e3e6", accent: "#c1694f", label: "Ripple Baby Blanket" },
  { file: "placeholder-scarf.svg", bg: "#e6ded2", accent: "#7c8c6e", label: "Infinity Scarf" },
  { file: "placeholder-strawberry.svg", bg: "#f6e2dd", accent: "#c1694f", label: "Crochet Strawberry" },
  { file: "placeholder-hero.svg", bg: "#f3e2d3", accent: "#c1694f", label: "Crochet Haven" },
];

const outDir = path.join(__dirname, "..", "public", "images", "patterns");
fs.mkdirSync(outDir, { recursive: true });

function svg({ bg, accent, label }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <rect width="800" height="600" fill="${bg}"/>
  <circle cx="400" cy="260" r="130" fill="none" stroke="${accent}" stroke-width="6" stroke-dasharray="14 10" opacity="0.55"/>
  <circle cx="400" cy="260" r="90" fill="none" stroke="${accent}" stroke-width="6" stroke-dasharray="10 8" opacity="0.7"/>
  <circle cx="400" cy="260" r="50" fill="${accent}" opacity="0.85"/>
  <text x="400" y="460" font-family="Georgia, serif" font-size="34" fill="${accent}" text-anchor="middle">${label}</text>
</svg>`;
}

for (const item of items) {
  fs.writeFileSync(path.join(outDir, item.file), svg(item));
  console.log("wrote", item.file);
}
