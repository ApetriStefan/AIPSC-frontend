// src/styles/Experience.styles.js
import { StyleSheet, Platform } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';

export const styles = StyleSheet.create({
  innerContainer: {
    maxWidth: 1086,
    gap: 16,
    width: '100%',
  },
  mainTitle: {
    fontFamily: FONTS.serif,
    fontSize: 48,
    lineHeight: '125%',
    fontWeight: '600',
    color: COLORS.textDark,
  },
  subtitle: {
    fontFamily: FONTS.sansSerif,
    fontSize: 16,
    fontStyle: 'normal',
    lineHeight: '125%',
    color: COLORS.textMuted,
    marginTop: -6,
    marginBottom: 20,
  },
  bodyText: {
    fontFamily: FONTS.sansSerif,
    fontSize: 18,
    lineHeight: '145%',
    color: COLORS.textDark,
    maxWidth: 800,
    paddingBottom: '5%',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gold,
    marginLeft: '-4%',
    width: '100%',
  },
  dayRow: {
    maxWidth: 1018,
    paddingVertical: 32,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  dayLabel: {
    fontFamily: FONTS.numbers,
    fontSize: 84,
    fontWeight: '700',
    color: COLORS.gold,
    lineHeight: '125%',
    width: 280,
    ...Platform.select({
      web: {
        backgroundImage: 'linear-gradient(180deg, #CABB91 0%, #BA9842 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }
    }),
  },
  dayDescription: {
    flex: 1,
    minWidth: 260,
    alignSelf: 'center',
    fontFamily: FONTS.sansSerif,
    fontSize: 16,
    lineHeight: '125%',
    paddingRight: 200,
    color: COLORS.textDark,
  },

  /* Mobile Experience styles */
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
  mobileMainTitle: {
    fontFamily: FONTS.serif,
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: '125%',
    color: '#091413',
  },
  mobileSubtitle: {
    fontFamily: FONTS.sansSerif,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '125%',
    color: '#546261',
    marginTop: 8,
    marginBottom: 16,
  },
  mobileBodyText: {
    fontFamily: FONTS.sansSerif,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '145%',
    color: '#091413',
    paddingBottom: 16,
  },
  mobileDivider: {
    height: 1,
    backgroundColor: COLORS.gold,
    width: '100%',
  },
  mobileDayRow: {
    paddingVertical: 16,
    flexDirection: 'column',
    gap: 8,
  },
  mobileDayLabel: {
    fontFamily: FONTS.numbers,
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: '125%',
    color: COLORS.gold,
    ...Platform.select({
      web: {
        backgroundImage: 'linear-gradient(180deg, #CABB91 0%, #BA9842 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }
    }),
  },
  mobileDayDescription: {
    fontFamily: FONTS.sansSerif,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '145%',
    color: '#091413',
  },
});
