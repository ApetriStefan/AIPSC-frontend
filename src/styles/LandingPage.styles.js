// src/styles/LandingPage.styles.js
import { StyleSheet, Platform } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';

export const styles = StyleSheet.create({
  innerContainer: {
    minWidth: 794,
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
  /* Mobile title row */
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
    color: '#091413',
  },
  badgeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  badge: {
    backgroundColor: '#A3AFAE',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#091413',
    fontFamily: FONTS.sansSerif,
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  bodyText: {
    marginTop: 20,
    fontFamily: FONTS.sansSerif,
    fontSize: 18,
    fontWeight: '400',
    lineHeight: '145%',
    color: COLORS.textDark,
  },
  mobileBodyText: {
    marginTop: 16,
    fontFamily: FONTS.sansSerif,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: '145%',
    color: COLORS.textDark,
  },
  highlightLink: {
    color: '#011B36',
    fontWeight: '600',
    textDecorationLine: 'underline',
    cursor: 'pointer',
  },
  ctaRow: {
    marginTop: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flexWrap: 'wrap',
  },
  seeCoursesBtn: {
    backgroundColor: COLORS.navy,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    alignSelf: 'flex-start',
  },
  seeCoursesBtnText: {
    color: COLORS.white,
    fontFamily: FONTS.sansSerif,
    fontWeight: '500',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  btnIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  previewCard: {
    marginTop: 32,
    backgroundColor: '#CDD7D6',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#A3AFAE',
    padding: 24,
    width: '100%',
    maxWidth: 680,
    ...Platform.select({
      web: {
        backgroundImage: `url(${require('../../assets/images/grainy-background.svg')})`,
        backgroundRepeat: 'repeat',
      }
    }),
  },
  previewCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  previewTag: {
    backgroundColor: '#A3AFAE',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  previewTagText: {
    color: '#091413',
    fontFamily: FONTS.sansSerif,
    fontSize: 11,
    fontWeight: '500',
  },
  previewPlaces: {
    color: '#4E6578',
    fontFamily: FONTS.sansSerif,
    fontSize: 13,
  },
  previewTitle: {
    fontFamily: FONTS.serif,
    fontSize: 22,
    fontWeight: '600',
    color: '#091413',
    marginBottom: 6,
  },
  previewLocation: {
    fontFamily: FONTS.sansSerif,
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: 16,
  },
  previewLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  previewLinkText: {
    fontFamily: FONTS.sansSerif,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.navy,
  },
  previewArrow: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
  }
});
