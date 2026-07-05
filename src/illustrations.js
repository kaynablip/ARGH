// Visual asset library for Plate
// Composed of flat geometric shapes, solid colors, and bold compositions.

// Shared utility: generate inline style & attributes
const svgWrapper = (content, viewBox = '0 0 100 100', className = '') => {
  return `<svg viewBox="${viewBox}" class="plate-illustration ${className}" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;
};

export const ILLUSTRATIONS = {
  // TABLE ELEMENT: FORK
  fork: () => svgWrapper(`
    <!-- Fork Handle -->
    <path d="M 50,60 L 50,95" stroke="#361e1c" stroke-width="5" stroke-linecap="round" />
    <!-- Fork Neck & Body -->
    <path d="M 38,35 C 38,55 62,55 62,35 Z" fill="#f5c443" />
    <rect x="47" y="45" width="6" height="18" fill="#f5c443" />
    <!-- Prongs -->
    <rect x="38" y="15" width="4" height="23" fill="#f5c443" rx="2" />
    <rect x="46" y="15" width="4" height="23" fill="#f5c443" rx="2" />
    <rect x="54" y="15" width="4" height="23" fill="#f5c443" rx="2" />
    <rect x="62" y="15" width="4" height="23" fill="#f5c443" rx="2" />
  `, '0 0 100 100', 'svg-fork'),

  // TABLE ELEMENT: KNIFE
  knife: () => svgWrapper(`
    <!-- Knife Handle -->
    <path d="M 50,60 L 50,95" stroke="#361e1c" stroke-width="8" stroke-linecap="round" />
    <!-- Knife Blade -->
    <path d="M 50,60 L 50,15 C 50,15 38,15 38,30 L 38,60 Z" fill="#361e1c" />
    <!-- Highlight -->
    <path d="M 48,58 L 48,17 C 48,17 44,22 44,30 L 44,58 Z" fill="rgba(255,255,255,0.08)" />
  `, '0 0 100 100', 'svg-knife'),

  // SPOON
  spoon: () => svgWrapper(`
    <path d="M 50,55 L 50,95" stroke="#361e1c" stroke-width="5" stroke-linecap="round" />
    <ellipse cx="50" cy="35" rx="15" ry="22" fill="#f5c443" />
    <ellipse cx="48" cy="35" rx="11" ry="18" fill="rgba(255,255,255,0.1)" />
  `),

  // PANEER CUBES (For protein indicator)
  paneer: () => svgWrapper(`
    <!-- Leaf Backing -->
    <path d="M 20,60 C 20,40 50,30 65,55 C 50,80 20,80 20,60 Z" fill="#1b4d3e" />
    <!-- Cube 1 (Back Left) -->
    <rect x="25" y="42" width="32" height="32" rx="4" fill="#fefdfa" stroke="#d5ceb8" stroke-width="1.5" />
    <path d="M 25,46 L 57,46" stroke="#e9e5d4" stroke-width="2" />
    <!-- Cube 2 (Front Right) -->
    <rect x="45" y="25" width="32" height="32" rx="4" fill="#ffffff" stroke="#e0dabf" stroke-width="1.5" />
    <!-- Cube Details -->
    <circle cx="53" cy="33" r="1.5" fill="#d5ceb8" />
    <circle cx="68" cy="48" r="1.5" fill="#d5ceb8" />
  `, '0 0 100 100', 'svg-paneer'),

  // TOFU
  tofu: () => svgWrapper(`
    <rect x="25" y="25" width="50" height="50" rx="3" fill="#faf6eb" stroke="#d5cbb3" stroke-width="2" />
    <!-- Grid texture lines -->
    <line x1="37" y1="25" x2="37" y2="75" stroke="#e8e0cc" stroke-width="1" />
    <line x1="50" y1="25" x2="50" y2="75" stroke="#e8e0cc" stroke-width="1" />
    <line x1="63" y1="25" x2="63" y2="75" stroke="#e8e0cc" stroke-width="1" />
    <line x1="25" y1="37" x2="75" y2="37" stroke="#e8e0cc" stroke-width="1" />
    <line x1="25" y1="50" x2="75" y2="50" stroke="#e8e0cc" stroke-width="1" />
    <line x1="25" y1="63" x2="75" y2="63" stroke="#e8e0cc" stroke-width="1" />
  `),

  // TOMATO
  tomato: () => svgWrapper(`
    <!-- Tomato Main Body -->
    <circle cx="50" cy="53" r="32" fill="#e84118" />
    <!-- Stem/Leaf Base -->
    <path d="M 50,23 C 50,23 46,12 35,16 C 45,20 48,25 48,25 Z" fill="#78a54a" />
    <path d="M 50,23 C 50,23 54,12 65,16 C 55,20 52,25 52,25 Z" fill="#78a54a" />
    <path d="M 50,23 C 50,23 50,8 50,8 Z" stroke="#361e1c" stroke-width="3" stroke-linecap="round" />
    <!-- Highlights -->
    <circle cx="36" cy="38" r="5" fill="#ffffff" opacity="0.3" />
    <!-- Seed details -->
    <circle cx="50" cy="23" r="3" fill="#361e1c" />
  `, '0 0 100 100', 'svg-tomato'),

  // BANANA
  banana: () => svgWrapper(`
    <!-- Banana Curve -->
    <path d="M 20,20 C 45,20 80,45 80,80 C 65,75 55,60 20,20 Z" fill="#f5c443" />
    <!-- Tips -->
    <path d="M 20,20 C 22,22 25,20 20,20 Z" stroke="#361e1c" stroke-width="5" stroke-linecap="round" />
    <path d="M 80,80 C 81,81 83,82 82,85 C 80,84 79,81 80,80 Z" fill="#361e1c" />
    <path d="M 75,77 L 82,85" stroke="#361e1c" stroke-width="4" stroke-linecap="round" />
  `, '0 0 100 100', 'svg-banana'),

  // APPLE
  apple: () => svgWrapper(`
    <!-- Apple Body -->
    <path d="M 50,30 C 32,25 20,40 20,60 C 20,80 40,88 50,82 C 60,88 80,80 80,60 C 80,40 68,25 50,30 Z" fill="#d63031" />
    <!-- Stem -->
    <path d="M 50,30 C 50,20 58,12 58,12" stroke="#361e1c" stroke-width="3" fill="none" stroke-linecap="round" />
    <!-- Leaf -->
    <path d="M 50,28 C 42,22 42,14 50,16 C 52,22 50,28 50,28 Z" fill="#78a54a" />
    <!-- Highlight -->
    <path d="M 28,50 A 18 18 0 0 1 45,35" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.25" />
  `, '0 0 100 100', 'svg-apple'),

  // LEMON / ORANGE WIDGET
  lemon: () => svgWrapper(`
    <circle cx="50" cy="50" r="32" fill="#f5c443" />
    <!-- Inner segments -->
    <circle cx="50" cy="50" r="28" fill="#fffbf5" />
    <path d="M 50,50 L 50,22 M 50,50 L 50,78 M 50,50 L 22,50 M 50,50 L 78,50" stroke="#f5c443" stroke-width="2" />
    <path d="M 50,50 L 30,30 M 50,50 L 70,70 M 50,50 L 30,70 M 50,50 L 70,30" stroke="#f5c443" stroke-width="2" />
    <circle cx="50" cy="50" r="6" fill="#f5c443" />
  `),

  // ONION RINGS
  onion: () => svgWrapper(`
    <!-- Purple concentric rings -->
    <circle cx="50" cy="50" r="36" fill="none" stroke="#d3b0ff" stroke-width="4" />
    <circle cx="50" cy="50" r="28" fill="none" stroke="rgba(211,176,255,0.7)" stroke-width="3" />
    <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(211,176,255,0.4)" stroke-width="2.5" />
    <circle cx="50" cy="50" r="12" fill="none" stroke="rgba(211,176,255,0.2)" stroke-width="2" />
  `, '0 0 100 100', 'svg-onion'),

  // SPINACH
  spinach: () => svgWrapper(`
    <!-- Leaf -->
    <path d="M 50,85 C 45,70 20,60 20,40 C 20,20 40,15 50,38 C 60,15 80,20 80,40 C 80,60 55,70 50,85 Z" fill="#78a54a" />
    <!-- Stem Line -->
    <path d="M 50,85 L 50,30" stroke="#5d8534" stroke-width="2.5" stroke-linecap="round" fill="none" />
    <path d="M 50,65 Q 40,58 32,58" stroke="#5d8534" stroke-width="1.5" stroke-linecap="round" fill="none" />
    <path d="M 50,55 Q 62,48 68,50" stroke="#5d8534" stroke-width="1.5" stroke-linecap="round" fill="none" />
    <path d="M 50,45 Q 38,38 35,38" stroke="#5d8534" stroke-width="1.5" stroke-linecap="round" fill="none" />
  `),

  // PEAS
  peas: () => svgWrapper(`
    <!-- Pod back -->
    <path d="M 15,50 C 40,25 70,25 85,50 C 70,75 40,75 15,50 Z" fill="#5a8c32" />
    <!-- Peas -->
    <circle cx="30" cy="50" r="8" fill="#78a54a" />
    <circle cx="48" cy="50" r="8" fill="#78a54a" />
    <circle cx="66" cy="50" r="8" fill="#78a54a" />
    <!-- Pod front leaf wrapper -->
    <path d="M 15,50 C 40,32 70,32 85,50 L 80,50 C 65,37 40,37 15,50 Z" fill="#78a54a" />
  `),

  // DAL BOWL
  dal: () => svgWrapper(`
    <!-- Bowl Background -->
    <ellipse cx="50" cy="55" rx="35" ry="25" fill="#f5c443" />
    <ellipse cx="50" cy="40" rx="35" ry="10" fill="#dbad2a" />
    <!-- Liquid Dal -->
    <ellipse cx="50" cy="40" rx="31" ry="8" fill="#d35400" />
    <!-- Herbs on Dal -->
    <circle cx="42" cy="40" r="1.5" fill="#78a54a" />
    <circle cx="48" cy="38" r="1.5" fill="#78a54a" />
    <circle cx="54" cy="41" r="1.5" fill="#78a54a" />
    <!-- Spoon sticking out -->
    <path d="M 32,35 L 20,12" stroke="#361e1c" stroke-width="4" stroke-linecap="round" />
    <ellipse cx="32" cy="35" rx="5" ry="3" fill="#361e1c" />
  `),

  // RICE BOWL
  rice: () => svgWrapper(`
    <!-- Bowl -->
    <path d="M 15,45 C 15,75 85,75 85,45 Z" fill="#023ca6" />
    <ellipse cx="50" cy="45" rx="35" ry="10" fill="#002773" />
    <!-- Heap of Rice -->
    <path d="M 18,44 C 18,25 82,25 82,44 Z" fill="#ffffff" />
    <!-- Grains texture dots -->
    <circle cx="35" cy="38" r="1" fill="#e9e5d4" />
    <circle cx="45" cy="32" r="1" fill="#e9e5d4" />
    <circle cx="50" cy="36" r="1" fill="#e9e5d4" />
    <circle cx="58" cy="30" r="1" fill="#e9e5d4" />
    <circle cx="65" cy="39" r="1" fill="#e9e5d4" />
  `),

  // CHAPATI
  chapati: () => svgWrapper(`
    <!-- Textured Roti -->
    <circle cx="50" cy="50" r="38" fill="#e6cca2" stroke="#d2b48c" stroke-width="1" />
    <!-- Brown spots of baking -->
    <circle cx="35" cy="35" r="3" fill="#a0522d" opacity="0.6" />
    <circle cx="65" cy="45" r="2.5" fill="#a0522d" opacity="0.5" />
    <circle cx="48" cy="62" r="3.5" fill="#8b5a2b" opacity="0.6" />
    <circle cx="55" cy="32" r="2" fill="#8b5a2b" opacity="0.4" />
    <!-- Fold mark -->
    <path d="M 20,40 Q 50,55 80,40" stroke="#cd853f" stroke-width="2" fill="none" opacity="0.5" />
  `),

  // KHICHDI
  khichdi: () => svgWrapper(`
    <path d="M 15,48 C 15,78 85,78 85,48 Z" fill="#eb4d4b" />
    <ellipse cx="50" cy="48" rx="35" ry="10" fill="#c0392b" />
    <!-- Yellow khichdi heap -->
    <path d="M 18,47 C 18,28 82,28 82,47 Z" fill="#f1c40f" />
    <!-- Peas on top -->
    <circle cx="38" cy="38" r="2.5" fill="#78a54a" />
    <circle cx="50" cy="35" r="2.5" fill="#78a54a" />
    <circle cx="60" cy="41" r="2.5" fill="#78a54a" />
  `),

  // TEA
  tea: () => svgWrapper(`
    <!-- Cup -->
    <path d="M 25,35 L 30,75 C 32,80 68,80 70,75 L 75,35 Z" fill="#023ca6" />
    <!-- Handle -->
    <path d="M 72,42 C 85,42 85,62 72,62" stroke="#023ca6" stroke-width="5" fill="none" stroke-linecap="round" />
    <!-- Liquid Tea -->
    <ellipse cx="50" cy="35" rx="25" ry="6" fill="#8e5d38" />
    <!-- Steam lines -->
    <path d="M 40,22 Q 43,12 40,5" stroke="#361e1c" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.3" />
    <path d="M 50,22 Q 53,12 50,5" stroke="#361e1c" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.3" />
    <path d="M 60,22 Q 63,12 60,5" stroke="#361e1c" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.3" />
  `, '0 0 100 100', 'svg-tea'),

  // COFFEE
  coffee: () => svgWrapper(`
    <path d="M 25,35 L 30,75 C 32,80 68,80 70,75 L 75,35 Z" fill="#361e1c" />
    <path d="M 72,42 C 85,42 85,62 72,62" stroke="#361e1c" stroke-width="5" fill="none" stroke-linecap="round" />
    <ellipse cx="50" cy="35" rx="25" ry="6" fill="#583d28" />
    <ellipse cx="50" cy="35" rx="21" ry="4" fill="#fffbf5" opacity="0.15" />
  `),

  // CURD
  curd: () => svgWrapper(`
    <path d="M 15,45 C 15,75 85,75 85,45 Z" fill="#78a54a" />
    <ellipse cx="50" cy="45" rx="35" ry="10" fill="#5b8233" />
    <ellipse cx="50" cy="43" rx="32" ry="8" fill="#ffffff" />
  `),

  // DOSA
  dosa: () => svgWrapper(`
    <!-- Rolled golden brown triangle -->
    <path d="M 15,75 L 85,25 L 60,85 Z" fill="#e5ad35" stroke="#cc9622" stroke-width="1.5" />
    <!-- Swirl brown lines -->
    <path d="M 28,70 Q 50,45 75,30" stroke="#a0522d" stroke-width="2.5" fill="none" opacity="0.4" stroke-linecap="round" />
    <path d="M 40,75 Q 60,55 70,40" stroke="#a0522d" stroke-width="2" fill="none" opacity="0.3" stroke-linecap="round" />
  `),

  // IDLI
  idli: () => svgWrapper(`
    <!-- Plate -->
    <ellipse cx="50" cy="55" rx="42" ry="25" fill="#fdfaf2" stroke="#e3dbcb" stroke-width="1" />
    <!-- Idli 1 (Left) -->
    <ellipse cx="38" cy="52" rx="20" ry="14" fill="#ffffff" stroke="#eee" stroke-width="0.5" />
    <!-- Idli 2 (Right) -->
    <ellipse cx="62" cy="52" rx="20" ry="14" fill="#fdfdfd" stroke="#eee" stroke-width="0.5" />
    <!-- Chutney Bowls -->
    <circle cx="32" cy="70" r="7" fill="#78a54a" />
    <circle cx="48" cy="73" r="7" fill="#eb4d4b" />
  `),

  // POHA
  poha: () => svgWrapper(`
    <!-- Yellow Poha heap -->
    <ellipse cx="50" cy="55" rx="40" ry="22" fill="#f4d03f" />
    <!-- Peanuts (brown ovals) -->
    <ellipse cx="38" cy="50" rx="4" ry="2.5" fill="#582f0e" transform="rotate(15, 38, 50)" />
    <ellipse cx="62" cy="56" rx="4" ry="2.5" fill="#582f0e" transform="rotate(-30, 62, 56)" />
    <ellipse cx="48" cy="62" rx="4" ry="2.5" fill="#582f0e" transform="rotate(45, 48, 62)" />
    <!-- Coriander/Curry Leaves -->
    <path d="M 30,48 C 28,45 28,40 32,44 C 36,40 35,45 32,48 Z" fill="#78a54a" />
    <path d="M 58,48 C 56,45 56,40 60,44 C 64,40 63,45 60,48 Z" fill="#78a54a" />
  `),

  // LENTILS / SEEDS (For protein elements)
  lentils: () => svgWrapper(`
    <circle cx="40" cy="45" r="5" fill="#a0522d" />
    <circle cx="52" cy="42" r="5" fill="#cd853f" />
    <circle cx="46" cy="55" r="5" fill="#8b4513" />
    <circle cx="58" cy="52" r="5" fill="#d2b48c" />
    <circle cx="34" cy="52" r="5" fill="#cd853f" />
  `),

  // HERBS / DECORATIVE LEAVES
  leaves: () => svgWrapper(`
    <path d="M 50,85 C 40,65 30,55 35,35 C 45,50 48,60 50,85 Z" fill="#78a54a" />
    <path d="M 50,85 C 60,65 70,55 65,35 C 55,50 52,60 48,85 Z" fill="#5b8233" />
  `),

  // DECORATIVE BACKGROUND ARCH (For widgets/cards)
  decorative_shape_1: () => svgWrapper(`
    <path d="M 10,90 A 40 40 0 0 1 90 90 Z" fill="rgba(251,194,200,0.4)" />
  `),

  // DECORATIVE SUN
  decorative_shape_2: () => svgWrapper(`
    <circle cx="50" cy="50" r="25" fill="#f5c443" opacity="0.8" />
    <line x1="50" y1="15" x2="50" y2="85" stroke="#f5c443" stroke-width="4" stroke-dasharray="10 40 10" />
    <line x1="15" y1="50" x2="85" y2="50" stroke="#f5c443" stroke-width="4" stroke-dasharray="10 40 10" />
  `)
};

export const getFoodIllustration = (illustrationName) => {
  if (ILLUSTRATIONS[illustrationName]) {
    return ILLUSTRATIONS[illustrationName]();
  }
  // Default fallback is a decorative leaf or shape
  return ILLUSTRATIONS.leaves();
};
