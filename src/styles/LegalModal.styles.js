// src/styles/LegalModal.styles.js
import { StyleSheet, Platform } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 26, 51, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    width: '100%',
    maxWidth: 700,
    maxHeight: '85%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontFamily: FONTS.serif,
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.navy,
  },
  closeButton: {
    padding: 6,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  scrollBody: {
    padding: 24,
  },
  subHeading: {
    fontFamily: FONTS.sansSerif,
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.navy,
    marginTop: 20,
    marginBottom: 8,
  },
  paragraph: {
    fontFamily: FONTS.sansSerif,
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.textDark,
    marginBottom: 12,
  },
  bullet: {
    fontFamily: FONTS.sansSerif,
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.textDark,
    marginLeft: 12,
    marginBottom: 8,
  },
});
