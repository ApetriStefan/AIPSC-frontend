// src/components/Header.js
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions, Image, Pressable, Animated, Platform } from 'react-native';
import { styles } from '../styles/Header.styles';
import { COLORS } from '../constants/theme';

const AnimatedNavItem = ({ onPress, isHome, children }) => {
  const bgAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    bgAnim.setValue(1);
  };

  const handlePressOut = () => {
    Animated.timing(bgAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', COLORS.darkNavy],
  });

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[isHome ? styles.homeBtn : styles.navItemBtn, { backgroundColor }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

const AnimatedMobileNavItem = ({ onPress, children }) => {
  const bgAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    bgAnim.setValue(1);
  };

  const handlePressOut = () => {
    Animated.timing(bgAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', 'rgba(255,255,255,0.05)'],
  });

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[styles.mobileNavItem, { backgroundColor }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

export default function Header({ activeSection, onNavigate, onOpenRegister }) {
  const { width, height } = useWindowDimensions();
  const isDesktop = width >= 1024;

  const [menuOpen, setMenuOpen] = useState(false);

  // Hamburger → X animation
  const rotateAnim = useRef(new Animated.Value(0)).current;
  // Menu slide-down animation
  const menuSlideAnim = useRef(new Animated.Value(-600)).current;
  const menuOpacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const useNativeDriver = Platform.OS !== 'web';
    if (menuOpen) {
      Animated.parallel([
        Animated.timing(rotateAnim, { toValue: 1, duration: 280, useNativeDriver }),
        Animated.timing(menuSlideAnim, { toValue: 0, duration: 300, useNativeDriver }),
        Animated.timing(menuOpacityAnim, { toValue: 1, duration: 250, useNativeDriver }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(rotateAnim, { toValue: 0, duration: 220, useNativeDriver }),
        Animated.timing(menuSlideAnim, { toValue: -600, duration: 260, useNativeDriver }),
        Animated.timing(menuOpacityAnim, { toValue: 0, duration: 200, useNativeDriver }),
      ]).start();
    }
  }, [menuOpen]);

  const handleNavPress = (section) => {
    setMenuOpen(false);
    onNavigate && onNavigate(section);
  };

  // Interpolations for the two hamburger bars -> X
  const topLineRotate = rotateAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '45deg'] });
  const topLineTranslateY = rotateAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 8] });
  const bottomLineRotate = rotateAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-45deg'] });
  const bottomLineTranslateY = rotateAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -8] });
  const middleLineOpacity = rotateAnim.interpolate({ inputRange: [0, 0.4, 1], outputRange: [1, 0, 0] });

  return (
    <View style={{ zIndex: 9999 }}>
      <View style={styles.headerContainer}>
        <View style={styles.logoGroup}>
          <Image source={require('../../assets/images/ipsc-logo.svg')} style={styles.headerLogo} />
          <Image source={require('../../assets/images/misia-logo.svg')} style={styles.headerLogo} />
        </View>

        {isDesktop ? (
          <View style={styles.navLinks}>
            {/* Home button */}
            <AnimatedNavItem isHome onPress={() => onNavigate && onNavigate('home')}>
              <Image source={require('../../assets/images/home-button.svg')} style={styles.homeIcon} />
            </AnimatedNavItem>

            <AnimatedNavItem onPress={() => onNavigate && onNavigate('instructors')}>
              <Text style={styles.navItemText}>INSTRUCTORS</Text>
            </AnimatedNavItem>

            <AnimatedNavItem onPress={() => onNavigate && onNavigate('course')}>
              <Text style={styles.navItemText}>COURSE</Text>
            </AnimatedNavItem>

            <AnimatedNavItem onPress={() => onNavigate && onNavigate('experience')}>
              <Text style={styles.navItemText}>EXPERIENCE</Text>
            </AnimatedNavItem>

            <AnimatedNavItem onPress={() => onNavigate && onNavigate('costs')}>
              <Text style={styles.navItemText}>COSTS</Text>
            </AnimatedNavItem>
          </View>
        ) : null}

        {/* Right side: Register btn (desktop) | Hamburger (mobile) */}
        {isDesktop ? (
          <TouchableOpacity style={styles.registerBtn} onPress={onOpenRegister}>
            <Text style={styles.registerBtnText}>REGISTER NOW</Text>
            <Image source={require('../../assets/images/finger-pad.svg')} style={styles.registerIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.hamburgerBtn}
            onPress={() => setMenuOpen(prev => !prev)}
            activeOpacity={0.8}
          >
            <Animated.View style={[
              styles.hamburgerLine,
              { transform: [{ translateY: topLineTranslateY }, { rotate: topLineRotate }] }
            ]} />
            <Animated.View style={[styles.hamburgerLine, { opacity: middleLineOpacity }]} />
            <Animated.View style={[
              styles.hamburgerLine,
              { transform: [{ translateY: bottomLineTranslateY }, { rotate: bottomLineRotate }] }
            ]} />
          </TouchableOpacity>
        )}
      </View>

      {/* Mobile Slide-Down Menu */}
      {!isDesktop && (
        <Animated.View style={[
          styles.mobileMenu,
          {
            transform: [{ translateY: menuSlideAnim }],
            opacity: menuOpacityAnim,
            maxHeight: height - 90,
          }
        ]}>
          {['home', 'instructors', 'course', 'experience', 'costs'].map((section) => (
            <AnimatedMobileNavItem key={section} onPress={() => handleNavPress(section)}>
              <Text style={styles.mobileNavItemText}>{section === 'home' ? 'HOME' : section.toUpperCase()}</Text>
            </AnimatedMobileNavItem>
          ))}

          {/* Register row at the bottom of menu */}
          <View style={styles.mobileMenuRegisterRow}>
            <TouchableOpacity
              style={styles.mobileRegisterBtn}
              onPress={() => { setMenuOpen(false); onOpenRegister(); }}
            >
              <Text style={styles.registerBtnText}>REGISTER NOW</Text>
              <Image source={require('../../assets/images/finger-pad.svg')} style={styles.registerIcon} />
            </TouchableOpacity>
            <Text style={styles.mobileMenuPlaces}>Places left: 10</Text>
          </View>
        </Animated.View>
      )}
    </View>
  );
}
