 // src/styles/Hero.styles.js
import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';

export const styles = StyleSheet.create({
  innerContainer: {
    maxWidth: 1018,
    gap: 32,
    width: '100%',
  },
  /* Mobile wrapper & vertical gold border */
  mobileOuterContainer: {
    position: 'relative',
    paddingHorizontal: '6%',
    width: '100%',
  },
  mobileVerticalBorder: {
    position: 'absolute',
    left: '6%',
    top: -32,
    bottom: -32,
    width: 2,
    backgroundColor: COLORS.gold,
    zIndex: 10,
  },
  mobileInnerContainer: {
    paddingLeft: 16,
    width: '100%',
  },
  /* Mobile title row: title + logo side-by-side */
  mobileTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  mobileHeroLogo: {
    width: 54,
    height: 54,
    resizeMode: 'contain',
    marginTop: 4,
    flexShrink: 0,
  },
  mainTitle: {
    fontFamily: FONTS.serif,
    fontSize: 48,
    fontStyle: 'normal',
    lineHeight: '125%',
    fontWeight: '600',
    color: '#091413',
  },
  mobileMainTitle: {
    fontFamily: FONTS.serif,
    fontSize: 32,
    lineHeight: '125%',
    fontWeight: '600',
  },
  bodyTextRed: {
    marginTop: 26,
    textAlign: 'justify',
    fontFamily: FONTS.sansSerif,
    fontSize: 18,
    fontWeight: '400',
    lineHeight: '145%',
    color: COLORS.textDark,
  },
  underlinedRedText: {
    color: COLORS.textDark,
    textDecorationLine: 'underline',
    lineHeight: '145%',
    fontWeight: '400',
    cursor: 'pointer',
  },
  mobileBodyTextRed: {
    marginTop: 16,
    fontFamily: FONTS.sansSerif,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: '145%',
    color: COLORS.textDark,
  },
  mobileUnderlinedRedText: {
    color: COLORS.textDark,
    textDecorationLine: 'underline',
    lineHeight: '145%',
    fontWeight: '400',
  },
  /* Tooltip card — matches the ipsc-card.svg / misia-card.svg design */
  tooltipCard: {
    position: 'absolute',
    width: 246,
    maxWidth: '100%',
    backgroundColor: '#CDD7D6',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#A3AFAE',
    padding: 16,
    zIndex: 100,
    pointerEvents: 'none',
    // Drop shadow matching feOffset dx=4 dy=4, feGaussianBlur stdDeviation=2, opacity 0.08
    shadowColor: '#091413',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  mobileTooltipCard: {
    position: 'relative',
    top: undefined,
    left: undefined,
    marginTop: 8,
    width: '100%',
    maxWidth: 300,
    alignSelf: 'flex-start',
  },
  tooltipTitle: {
    fontFamily: FONTS.sansSerif,
    fontSize: 16,
    fontWeight: '500',
    color: '#091413',
    marginBottom: 8,
  },
  tooltipBody: {
    fontFamily: FONTS.sansSerif,
    fontSize: 14,
    fontWeight: '400',
    color: '#091413',
    lineHeight: '145%',
  },
  infoIcon: {
    width: 15,
    height: 15,
    marginHorizontal: 4,
    resizeMode: 'contain',
  },
});

