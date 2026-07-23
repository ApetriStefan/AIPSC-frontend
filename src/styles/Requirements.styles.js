// src/styles/Requirements.styles.js
import { StyleSheet, Platform } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';

export const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: COLORS.navy,
    paddingVertical: 80,
    paddingLeft: '4%',
    gap: 40,
    maxHeight: 422,
    flexDirection: 'row',
  },
  leftColumn: {
    flex: 1,
    maxWidth: '53%',
    justifyContent: 'center',
    paddingLeft: '25%',
    gap: 16,
    // overflow: 'clip',
  },
  title: {
    marginBottom: 30,
    fontFamily: FONTS.serif,
    fontSize: '48px',
    color: COLORS.white,
    fontWeight: '600',
    lineHeight: '125%',
  },
  description: {
    fontFamily: FONTS.sansSerif,
    fontSize: 18,
    fontWeight: 400,
    lineHeight: '145%',
    color: COLORS.textLight,
    lineHeight: 26,
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#D9D9D9',
    marginBottom: 57,
    width: '30%',
  },
  subtext: {
    fontFamily: FONTS.sansSerif,
    fontSize: 18,
    lineHeight: '145%',
    color: COLORS.white,
    fontWeight: '400',
    marginBottom: -10,
  },
  highlightNumber: {
    fontFamily: FONTS.numbers,
    fontSize: 64,
    color: COLORS.gold,
    fontWeight: 700,
    lineHeight: '125%',
    ...Platform.select({
      web: {
        backgroundImage: 'linear-gradient(180deg, #CABB91 0%, #BA9842 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }
    }),
  },
  rightColumn: {
    flex: 1,
    minHeight: 300,
    maxHeight: 300,
    marginRight: 80,
    // borderRadius: 8,
    position: 'relative', // Relative boundary for rentalNotice
  },
  imageContainer: {
    flex: 1,
    marginTop: -80,
    marginBottom: -80,
    // marginLeft: -80,
    width: '120%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'left',
  },
  fullImage: {
    // marginVertical: 100,
    width: '100%',
    height: '100%',
    // alignSelf: 'left',
    // width: '100%',
    // height: '100%',
    resizeMode: 'cover',
    // ...Platform.select({
    //   web: {
    //     objectFit: 'cover',
    //   }
    // })
  },
  gradientOverlay: {
    position: 'absolute',
    // zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    ...Platform.select({
      web: {
        backgroundImage: 'linear-gradient(90deg, #01223C 0%, rgba(1, 34, 60, 0) 100%)',
      },
      default: {
        backgroundColor: 'transparent', // Native fallback
      }
    })
  },
  rentalNotice: {
    fontFamily: FONTS.sansSerif,
    position: 'absolute',
    bottom: 0,
    right: 0,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '400',
    fontStyle: 'italic',
    lineHeight: '125%',
    zIndex: 50, // Render safely on top of absolute children
  },
  mobileSectionContainer: {
    backgroundColor: COLORS.navy,
    paddingVertical: 56,
    paddingHorizontal: '8%',
    position: 'relative',
    overflow: 'hidden',
  },
  mobileBackgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  mobileGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    ...Platform.select({
      web: {
        backgroundImage: 'linear-gradient(90deg, #01223C 30%, rgba(1, 34, 60, 0.35) 100%)',
      },
      default: {
        backgroundColor: 'rgba(1, 34, 60, 0.7)',
      }
    })
  },
  mobileContentContainer: {
    zIndex: 2,
    width: '100%',
    gap: 16,
  },
  mobileTitle: {
    fontFamily: FONTS.serif,
    fontSize: 32,
    color: COLORS.white,
    fontWeight: '600',
    lineHeight: '125%',
  },
  mobileDescription: {
    width: 245,
    fontFamily: FONTS.sansSerif,
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.textLight,
    lineHeight: '145%',
  },
  mobileDivider: {
    height: 1,
    backgroundColor: '#D9D9D9',
    marginTop: 8,
    marginBottom: 20,
    width: '40%',
  },
  mobileSubtext: {
    fontFamily: FONTS.sansSerif,
    fontSize: 16,
    lineHeight: '125%',
    color: COLORS.white,
    fontWeight: '400',
  },
  mobileHighlightNumber: {
    fontFamily: FONTS.numbers,
    fontSize: 64,
    color: COLORS.gold,
    fontWeight: 700,
    lineHeight: '125%',
    ...Platform.select({
      web: {
        backgroundImage: 'linear-gradient(180deg, #CABB91 0%, #BA9842 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }
    }),
  },
  mobileRentalNotice: {
    fontFamily: FONTS.sansSerif,
    color: 'rgba(255, 255, 255, 0.65)',
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'italic',
    lineHeight: '125%',
    marginTop: 24,
  }
});
