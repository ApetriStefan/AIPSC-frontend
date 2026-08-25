import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions, Image, Pressable, Animated, Platform, Linking } from 'react-native';
import { styles } from '../styles/Header.styles';
import { COLORS } from '../constants/theme';

const AnimatedNavItem = ({ onPress, isHome, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const getBackgroundColor = () => {
    if (isPressed) return '#011B36';
    if (isHovered) return '#01223C';
    return 'transparent';
  };

  return (
    <Pressable 
      onPress={onPress} 
      onPressIn={() => setIsPressed(true)} 
      onPressOut={() => setIsPressed(false)}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
    >
      <View style={[isHome ? styles.homeBtn : styles.navItemBtn, { backgroundColor: getBackgroundColor() }]}>
        {children}
      </View>
    </Pressable>
  );
};

const AnimatedMobileNavItem = ({ onPress, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const getBackgroundColor = () => {
    if (isPressed) return '#011B36';
    if (isHovered) return '#01223C';
    return 'transparent';
  };

  return (
    <Pressable 
      onPress={onPress} 
      onPressIn={() => setIsPressed(true)} 
      onPressOut={() => setIsPressed(false)}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
    >
      <View style={[styles.mobileNavItem, { backgroundColor: getBackgroundColor() }]}>
        {children}
      </View>
    </Pressable>
  );
};

export default function Header({ 
  currentRoute = 'courses', 
  activeSection, 
  onNavigate, 
  onNavigateHome,
  onNavigateToCourses,
  onOpenRegister 
}) {
  const { width, height } = useWindowDimensions();
  const isDesktop = width >= 1024;

  const [menuOpen, setMenuOpen] = useState(false);
  const [isRegisterHovered, setIsRegisterHovered] = useState(false);

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
    if (section === 'home') {
      if (currentRoute === 'courses') {
        onNavigateHome ? onNavigateHome() : onNavigate && onNavigate('home');
      } else {
        onNavigateHome ? onNavigateHome() : onNavigate && onNavigate('home');
      }
    } else if (section === 'courses') {
      onNavigateToCourses && onNavigateToCourses();
    } else {
      if (currentRoute === 'landing') {
        onNavigateToCourses ? onNavigateToCourses(section) : onNavigate && onNavigate(section);
      } else {
        onNavigate && onNavigate(section);
      }
    }
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
          <TouchableOpacity 
            onPress={() => Linking.openURL('https://www.ipsc.org/')}
            activeOpacity={0.8}
          >
            <Image 
              source={require('../../assets/images/ipsc-logo.svg')} 
              style={isDesktop ? styles.ipscLogoDesktop : styles.ipscLogoMobile} 
            />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => Linking.openURL('https://www.misia.world/')}
            activeOpacity={0.8}
          >
            <Image 
              source={require('../../assets/images/misia-logo.svg')} 
              style={isDesktop ? styles.misiaLogoDesktop : styles.misiaLogoMobile} 
            />
          </TouchableOpacity>
        </View>

        {isDesktop ? (
          <View style={styles.navLinks}>
            {/* Home button */}
            <AnimatedNavItem isHome onPress={() => handleNavPress('home')}>
              <Image source={require('../../assets/images/home-button.svg')} style={styles.homeIcon} />
            </AnimatedNavItem>

            {currentRoute === 'landing' ? (
              <AnimatedNavItem onPress={() => handleNavPress('courses')}>
                <Text style={styles.navItemText}>COURSES</Text>
              </AnimatedNavItem>
            ) : (
              <>
                <AnimatedNavItem onPress={() => handleNavPress('instructors')}>
                  <Text style={styles.navItemText}>INSTRUCTORS</Text>
                </AnimatedNavItem>

                <AnimatedNavItem onPress={() => handleNavPress('course')}>
                  <Text style={styles.navItemText}>COURSE</Text>
                </AnimatedNavItem>

                <AnimatedNavItem onPress={() => handleNavPress('experience')}>
                  <Text style={styles.navItemText}>EXPERIENCE</Text>
                </AnimatedNavItem>

                <AnimatedNavItem onPress={() => handleNavPress('costs')}>
                  <Text style={styles.navItemText}>COSTS</Text>
                </AnimatedNavItem>
              </>
            )}
          </View>
        ) : null}

        {/* Right side: Register btn (desktop) | Hamburger (mobile) */}
        {isDesktop ? (
          <TouchableOpacity 
            style={[
              styles.registerBtn,
              isRegisterHovered && { backgroundColor: '#CABB91' }
            ]} 
            onPress={currentRoute === 'landing' ? () => onNavigateToCourses && onNavigateToCourses() : onOpenRegister}
            onMouseEnter={() => setIsRegisterHovered(true)}
            onMouseLeave={() => setIsRegisterHovered(false)}
            activeOpacity={0.85}
          >
            <Text style={styles.registerBtnText}>
              {currentRoute === 'landing' ? 'SEE COURSES' : 'REGISTER NOW'}
            </Text>
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
          {currentRoute === 'landing' ? (
            <>
              <AnimatedMobileNavItem onPress={() => handleNavPress('home')}>
                <Text style={styles.mobileNavItemText}>HOME</Text>
              </AnimatedMobileNavItem>
              <AnimatedMobileNavItem onPress={() => handleNavPress('courses')}>
                <Text style={styles.mobileNavItemText}>COURSES</Text>
              </AnimatedMobileNavItem>
            </>
          ) : (
            ['home', 'instructors', 'course', 'experience', 'costs'].map((section) => (
              <AnimatedMobileNavItem key={section} onPress={() => handleNavPress(section)}>
                <Text style={styles.mobileNavItemText}>{section === 'home' ? 'HOME' : section.toUpperCase()}</Text>
              </AnimatedMobileNavItem>
            ))
          )}

          {/* Register row at the bottom of menu */}
          <View style={styles.mobileMenuRegisterRow}>
            <TouchableOpacity
              style={styles.mobileRegisterBtn}
              onPress={() => {
                setMenuOpen(false);
                if (currentRoute === 'landing') {
                  onNavigateToCourses && onNavigateToCourses();
                } else {
                  onOpenRegister();
                }
              }}
            >
              <Text style={styles.registerBtnText}>
                {currentRoute === 'landing' ? 'SEE COURSES' : 'REGISTER NOW'}
              </Text>
              <Image source={require('../../assets/images/finger-pad.svg')} style={styles.registerIcon} />
            </TouchableOpacity>
            {currentRoute !== 'landing' && (
              <Text style={styles.mobileMenuPlaces}>Places left: 10</Text>
            )}
          </View>
        </Animated.View>
      )}
    </View>
  );
}
