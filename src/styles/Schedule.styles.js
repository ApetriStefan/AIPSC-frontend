// frontend/src/styles/Schedule.styles.js
import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';

export const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: '6%',
    position: 'relative',
  },
  mobileVerticalBorder: {
    position: 'absolute',
    left: '6%',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: COLORS.gold,
    zIndex: 10,
  },
  mobileInnerContainer: {
    paddingLeft: 16,
    width: '100%',
  },
  leftColumn: {
    minWidth: 285,
    maxWidth: 365,
    borderRightWidth: 2,
    borderRightColor: COLORS.gold,
    paddingRight: 24,
  },
  mainColumn: {
    flex: 1,
    width: '100%',
    paddingVertical: 80, // ◄ Am mutat padding-ul vertical aici
  },
  sectionTitle: {
    fontFamily: FONTS.serif,
    fontSize: 42,
    lineHeight: '125%',
    color: COLORS.textDark,
    fontWeight: '500',
    marginVertical: 24,
  },
  timeline: {
    gap: 0,
  },
  dayBlock: {
    paddingTop: 24,
    paddingBottom: 24,
    borderBottomWidth: 1.5,
    borderBottomColor: '#E5CCA9',
    maxWidth: 630,
    width: '100%',
  },
  dayIndicator: {
    width: 120,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  dayLabel: {
    fontFamily: FONTS.sansSerif,
    fontSize: 24,
    fontWeight: '500',
    color: COLORS.textDark,
    lineHeight: '125%',
  },
  eventList: {
    flex: 1,
    gap: 12,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  eventTime: {
    fontFamily: FONTS.sansSerif,
    width: 110,
    lineHeigh: '145%',
    fontWeight: '400',
    color: COLORS.textMuted,
    fontSize: 16,
  },
  eventSeparator: {
    fontFamily: FONTS.sansSerif,
    color: COLORS.textMuted,
    marginHorizontal: 12,
    fontSize: 16,
  },
  eventDesc: {
    flex: 1,
    fontFamily: FONTS.sansSerif,
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.textDark,
    lineHeight: '145%',
  },
  topDivider: {
    height: 1.5,
    backgroundColor: '#E5CCA9',
    width: 'auto',
    marginLeft: 0,
    marginRight: '-6.4%',
  },
  titleDivider: {
    height: 1.5,
    backgroundColor: '#E5CCA9',
    width: 'auto',
    marginLeft: 0,
    marginRight: '-6.4%',
    marginBottom: 24,
  },
  mobileTopDivider: {
    height: 1.5,
    backgroundColor: '#E5CCA9',
    width: 'auto',
    marginLeft: -16,
    marginRight: '-8%',
  },
  mobileTitleDivider: {
    height: 1.5,
    backgroundColor: '#E5CCA9',
    width: 'auto',
    marginLeft: -16,
    marginRight: '-8%',
    marginBottom: 24,
  }
});
