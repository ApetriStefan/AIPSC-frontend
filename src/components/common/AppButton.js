// src/components/common/AppButton.js
import React, { useState } from 'react';
import { Pressable, Text, StyleSheet, Platform, View, Image } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';

/**
 * Primary Button (BTT — PRIMARY)
 * Default: #EEEEEE bg, #091413 text
 * Hover: #CABB91 bg, #091413 text
 * Click/Active: #BA9842 bg, #091413 text
 * Focus/Keyboard Nav: #EEEEEE bg, #091413 text, 1.5px #BA9842 border
 */
export function PrimaryButton({
  onPress,
  children,
  text,
  icon,
  style,
  textStyle,
  disabled = false,
  ...rest
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const getBackgroundColor = () => {
    if (disabled) return COLORS.border;
    if (isPressed) return COLORS.gold;          // #BA9842
    if (isHovered) return COLORS.goldMuted;     // #CABB91
    return COLORS.border;                       // #EEEEEE
  };

  const getBorderColor = () => {
    if (isFocused) return COLORS.gold;          // #BA9842
    return 'transparent';
  };

  return (
    <Pressable
      onPress={!disabled ? onPress : undefined}
      onPressIn={() => !disabled && setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onHoverIn={() => !disabled && setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      onFocus={() => !disabled && setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      disabled={disabled}
      accessibilityRole="button"
      style={[
        styles.primaryBase,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
      {...rest}
    >
      {text ? (
        <Text style={[styles.primaryText, textStyle]}>{text}</Text>
      ) : (
        children
      )}
      {icon && (typeof icon === 'function' ? icon({ color: COLORS.textDark }) : icon)}
    </Pressable>
  );
}

/**
 * Secondary Button (BTT — SECONDARY)
 * Default: #00254B bg, #FFFFFF text
 * Hover: #01223C bg, #FFFFFF text
 * Click/Active: #011B36 bg, #FFFFFF text
 * Focus/Keyboard Nav: #00254B bg, #FFFFFF text, 1.5px #BA9842 border
 */
export function SecondaryButton({
  onPress,
  children,
  text,
  icon,
  style,
  textStyle,
  disabled = false,
  ...rest
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const getBackgroundColor = () => {
    if (disabled) return COLORS.navyNavbar;
    if (isPressed) return COLORS.darkNavy;       // #011B36
    if (isHovered) return COLORS.navy;           // #01223C
    return COLORS.navyNavbar;                    // #00254B
  };

  const getBorderColor = () => {
    if (isFocused) return COLORS.gold;           // #BA9842
    return 'transparent';
  };

  return (
    <Pressable
      onPress={!disabled ? onPress : undefined}
      onPressIn={() => !disabled && setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onHoverIn={() => !disabled && setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      onFocus={() => !disabled && setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      disabled={disabled}
      accessibilityRole="button"
      style={[
        styles.secondaryBase,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
      {...rest}
    >
      {text ? (
        <Text style={[styles.secondaryText, textStyle]}>{text}</Text>
      ) : (
        children
      )}
      {icon && (typeof icon === 'function' ? icon({ color: COLORS.white }) : icon)}
    </Pressable>
  );
}

/**
 * Ghost Link/Button (BTT — GHOST)
 * Default: #091413 text
 * Hover: #CABB91 text
 * Click/Active: #BA9842 text
 * Focus/Keyboard Nav: #091413 text, 1.5px #BA9842 border
 */
export function GhostButton({
  onPress,
  children,
  text,
  showArrow = true,
  style,
  textStyle,
  disabled = false,
  ...rest
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const getColor = () => {
    if (disabled) return COLORS.textMuted;
    if (isPressed) return COLORS.gold;          // #BA9842
    if (isHovered) return COLORS.goldMuted;     // #CABB91
    return COLORS.textDark;                     // #091413
  };

  const currentColor = getColor();

  return (
    <Pressable
      onPress={!disabled ? onPress : undefined}
      onPressIn={() => !disabled && setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onHoverIn={() => !disabled && setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      onFocus={() => !disabled && setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      disabled={disabled}
      accessibilityRole="link"
      style={[
        styles.ghostBase,
        isFocused && styles.ghostFocused,
        style,
      ]}
      {...rest}
    >
      {text ? (
        <Text style={[styles.ghostText, { color: currentColor }, textStyle]}>
          {text}
        </Text>
      ) : (
        typeof children === 'function' ? children({ color: currentColor, isHovered, isPressed, isFocused }) : children
      )}

      {showArrow && (
        <View style={styles.arrowIconWrapper}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 18 18" fill="none">
            <path
              d="M0.5625 9H17.4375"
              stroke={currentColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.5625 16.875L17.4375 9L9.5625 1.125"
              stroke={currentColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primaryBase: {
    height: 48,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 4,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    cursor: 'pointer',
    ...Platform.select({
      web: {
        outlineStyle: 'none',
        transition: 'background-color 0.15s ease, border-color 0.15s ease',
        userSelect: 'none',
      },
    }),
  },
  primaryText: {
    color: COLORS.textDark,
    fontFamily: FONTS.sansSerif,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: '124%',
    textTransform: 'uppercase',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  secondaryBase: {
    height: 48,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 4,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    cursor: 'pointer',
    ...Platform.select({
      web: {
        outlineStyle: 'none',
        transition: 'background-color 0.15s ease, border-color 0.15s ease',
        userSelect: 'none',
      },
    }),
  },
  secondaryText: {
    color: COLORS.white,
    fontFamily: FONTS.sansSerif,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: '124%',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  ghostBase: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: 'transparent',
    alignSelf: 'flex-start',
    cursor: 'pointer',
    ...Platform.select({
      web: {
        outlineStyle: 'none',
        transition: 'color 0.15s ease, border-color 0.15s ease',
        userSelect: 'none',
      },
    }),
  },
  ghostFocused: {
    borderColor: COLORS.gold,
  },
  ghostText: {
    fontFamily: FONTS.sansSerif,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: '145%',
  },
  arrowIconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
