// src/constants/theme.js

/**
 * Official Color Palette
 */
export const PALETTE = {
  // Gold / Yellow
  gold: {
    bright: '#F1CB25',
    primary: '#BA9842',
    muted: '#CABB91',
  },

  // Dark Blue / Navy
  navy: {
    steel: '#456D89',
    navbar: '#00254B',
    deep: '#01223C',
    darkest: '#011B36',
  },

  // Teal / Green-Gray
  tealGray: {
    darkest: '#091413',
    muted: '#546261',
    border: '#A3AFAE',
    card: '#CDD7D6',
    light: '#EEEEEE',
  },

  // Gradients
  gradients: {
    gold: {
      start: '#D0BC86',
      end: '#BA9842',
    },
  },

  // Functional
  functional: {
    red: '#D22B2B',
    yellow: '#F1CB25',
    green: '#33D22B',
  },
};

/**
 * Semantic Theme Colors mapped to the Official Palette
 */
export const COLORS = {
  // Gold / Yellow
  goldBright: PALETTE.gold.bright,     // #F1CB25
  gold: PALETTE.gold.primary,          // #BA9842
  goldMuted: PALETTE.gold.muted,        // #CABB91
  lightGold: PALETTE.gold.muted,        // #CABB91

  // Navy / Blue
  steelNavy: PALETTE.navy.steel,        // #456D89
  navyNavbar: PALETTE.navy.navbar,      // #00254B
  navy: PALETTE.navy.deep,              // #01223C
  darkNavy: PALETTE.navy.darkest,       // #011B36

  // Teal / Green-Gray & Typography
  textDark: PALETTE.tealGray.darkest,   // #091413
  textMuted: PALETTE.tealGray.muted,    // #546261
  tealBorder: PALETTE.tealGray.border,  // #A3AFAE
  tealCard: PALETTE.tealGray.card,      // #CDD7D6
  lightBg: PALETTE.tealGray.card,       // #CDD7D6
  border: PALETTE.tealGray.light,       // #EEEEEE
  borderGray: PALETTE.tealGray.border,  // #A3AFAE
  white: '#FFFFFF',
  textLight: '#E5E5EA',

  // Gradients
  gradientGoldStart: PALETTE.gradients.gold.start, // #D0BC86
  gradientGoldEnd: PALETTE.gradients.gold.end,     // #BA9842

  // Functional
  redAccent: PALETTE.functional.red,    // #D22B2B
  error: PALETTE.functional.red,        // #D22B2B
  warning: PALETTE.functional.yellow,   // #F1CB25
  success: PALETTE.functional.green,    // #33D22B
};

export const FONTS = {
  // Using standard web-safe system serif and sans-serif fallbacks
  numbers: 'Old Standard TT',
  serif: 'Noto Serif JP, serif',
  sansSerif: 'Noto Sans, sans-serif'
};
