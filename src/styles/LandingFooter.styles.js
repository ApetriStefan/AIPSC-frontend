// src/styles/LandingFooter.styles.js
import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';

export const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: COLORS.navy,
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: '6%',
    width: '100%',
    zIndex: 1,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 32,
    marginBottom: 40,
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  footerLogo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  footerLogoMisia: {
    width: 100,
    height: 48,
    resizeMode: 'contain',
  },
  columnContacts: {
    minWidth: 200,
  },
  colTitleContacts: {
    fontFamily: FONTS.sansSerif,
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.lightGold,
    marginBottom: 10,
  },
  contactTextGold: {
    fontFamily: FONTS.sansSerif,
    fontSize: 15,
    color: COLORS.gold,
    fontWeight: '500',
  },
  phoneContactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  whatsappIconBtn: {
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBar: {
    borderTopWidth: 1,
    borderTopColor: COLORS.steelNavy,
    paddingTop: 18,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  legalLinksGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 12,
  },
  legalLabel: {
    color: COLORS.steelNavy,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: '125%',
    marginRight: 4,
  },
  legalLink: {
    color: COLORS.steelNavy,
    fontSize: 15,
    fontWeight: '400',
    lineHeight: '125%',
  },
  legalSeparator: {
    color: COLORS.steelNavy,
    fontSize: 15,
    fontWeight: '400',
    lineHeight: '145%',
    marginHorizontal: 2,
  },
  copyright: {
    display: 'none',
    color: COLORS.steelNavy,
    fontSize: 14,
    fontWeight: '500',
  },
  /* Mobile specific adjustments */
  mobileMainRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 24,
    marginBottom: 32,
  },
  mobileLogosRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
});
