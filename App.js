// App.js
import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  View, 
  useWindowDimensions, 
  Image, 
  Animated, 
  Platform 
} from 'react-native';
import { COLORS } from './src/constants/theme';

import Header from './src/components/Header';
import Hero from './src/components/Hero';
import Instructors from './src/components/Instructors';
import Experience from './src/components/Experience';
import CourseDetails from './src/components/CourseDetails';
import Requirements from './src/components/Requirements';
import Opportunities from './src/components/Opportunities';
import Costs from './src/components/Costs';
import Schedule from './src/components/Schedule';
import Footer from './src/components/Footer';
import { LegalModal } from './src/components/LegalModal';
import { RegisterDrawer } from './src/components/RegisterDrawer';
import { AmbassadorDrawer } from './src/components/AmbassadorDrawer';
import ComingSoon from './src/components/ComingSoon';
import LandingPage from './src/components/LandingPage';
import LandingFooter from './src/components/LandingFooter';

// Dynamically inject Google Fonts & Title/Favicon for browser rendering
if (Platform.OS === 'web') {
  document.title = "Action Air IPSC";

  try {
    const faviconUrl = require('./assets/images/logo-bg.svg');
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'shortcut icon';
      document.head.appendChild(link);
    }
    link.type = 'image/svg+xml';
    link.href = faviconUrl;
  } catch (e) {
    // fallback if favicon import fails
  }

  const fontStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&family=Noto+Serif+JP:wght@400;500;600;700&family=Old+Standard+TT:wght@400;700&display=swap');
  `;
  const style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText = fontStyles;
  } else {
    style.appendChild(document.createTextNode(fontStyles));
  }
  document.head.appendChild(style);
}

const getInitialRoute = () => {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    const path = window.location.pathname.toLowerCase();
    if (path.startsWith('/courses')) {
      return 'courses';
    }
  }
  return 'landing';
};

export default function App() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  // Dynamic left column scaling: minWidth 284px at <=1440p, maxWidth 364px at >=1920p
  const leftColWidth = isDesktop
    ? (width <= 1440 ? 284 : width >= 1920 ? 364 : Math.round(284 + ((width - 1440) / 480) * 80))
    : undefined;
  const logoScale = leftColWidth ? leftColWidth / 284 : 1;

  // Dynamic main content width scaling: 794px at <=1440p, 1018px at >=1920p
  const mainContentWidth = isDesktop
    ? (width <= 1440 ? 794 : width >= 1920 ? 1018 : Math.round(794 + ((width - 1440) / 480) * 224))
    : undefined;

  // Primary URL Route: 'landing' (/) vs 'courses' (/courses/)
  const [route, setRoute] = useState(getInitialRoute);

  const scrollViewRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [policyType, setPolicyType] = useState('privacy');
  const [activeSection, setActiveSection] = useState('home');
  const [viewMode, setViewMode] = useState('course'); 
  const [renderedMode, setRenderedMode] = useState('course');

  // Scroll Progress Bar state
  const [scrollProgress, setScrollProgress] = useState(0);

  // Sync route with browser history (popstate)
  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const handlePopState = () => {
        const path = window.location.pathname.toLowerCase();
        if (path.startsWith('/courses')) {
          setRoute('courses');
        } else {
          setRoute('landing');
        }
      };

      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, []);

  const navigateToRoute = (newRoute, targetSection = 'home') => {
    setRoute(newRoute);
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const targetPath = newRoute === 'courses' ? '/courses/' : '/';
      const currentPath = window.location.pathname;
      if (currentPath !== targetPath && currentPath !== targetPath.replace(/\/$/, '')) {
        window.history.pushState({}, '', targetPath);
      }
    }

    if (newRoute === 'courses') {
      if (targetSection && targetSection !== 'home') {
        setTimeout(() => {
          handleNavigate(targetSection);
        }, 80);
      } else {
        setViewMode('course');
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      }
    } else {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  };

  // Synchronize state references to prevent stale closures inside scroll listener
  const viewModeRef = useRef(viewMode);
  useEffect(() => {
    viewModeRef.current = viewMode;
  }, [viewMode]);

  const [sectionOffsets, setSectionOffsets] = useState({
    instructors: 0,
    course: 0,
    opportunities: 0, 
    costs: 0,
    schedule: 0,
  });

  const sectionOffsetsRef = useRef(sectionOffsets);
  useEffect(() => {
    sectionOffsetsRef.current = sectionOffsets;
  }, [sectionOffsets]);

  // Drawers visibility states
  const [registerVisible, setRegisterVisible] = useState(false);
  const [ambassadorVisible, setAmbassadorVisible] = useState(false);

  // Native animations
  const fadeAnim = useRef(new Animated.Value(1)).current; 
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Transition sequence (Fade-Out ➜ State Swap ➜ Fade-In)
  useEffect(() => {
    if (viewMode === renderedMode) return;

    const useNativeDriver = Platform.OS !== 'web'; 

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 120,
        useNativeDriver,
      }),
      Animated.timing(slideAnim, {
        toValue: 10,
        duration: 120,
        useNativeDriver,
      })
    ]).start(() => {
      setRenderedMode(viewMode);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver,
        })
      ]).start();
    });
  }, [viewMode, renderedMode, fadeAnim, slideAnim]);

  const handleOpenPolicy = (type) => {
    setPolicyType(type);
    setModalVisible(true);
  };

  const captureSectionLayout = (sectionKey) => (event) => {
    const { y } = event.nativeEvent.layout;
    setSectionOffsets((prev) => ({
      ...prev,
      [sectionKey]: y,
    }));
  };

  const handleScroll = (event) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const scrollY = contentOffset.y;
    const totalHeight = contentSize.height - layoutMeasurement.height;
    
    // Calculate and update progress fill percentage
    const progress = totalHeight > 0 ? scrollY / totalHeight : 0;
    setScrollProgress(Math.min(1, Math.max(0, progress)));
  };

  const handleNavigate = (section) => {
    setActiveSection(section);

    if (section === 'instructors') {
      setViewMode('instructors');
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    } else if (section === 'experience') {
      setViewMode('experience');
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    } else if (section === 'member-coming-soon') {
      setViewMode('member-coming-soon');
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    } else if (section === 'home') {
      setViewMode('course');
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    } else {
      setViewMode('course');
      
      setTimeout(() => {
        const targetY = sectionOffsets[section];
        if (targetY !== undefined) {
          scrollViewRef.current?.scrollTo({ y: targetY, animated: true });
        }
      }, 50);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ zIndex: 9999, position: 'relative' }}>
        <Header 
          currentRoute={route}
          activeSection={activeSection} 
          onNavigate={handleNavigate} 
          onNavigateHome={() => navigateToRoute('landing')}
          onNavigateToCourses={(sec) => navigateToRoute('courses', sec)}
          onOpenRegister={() => setRegisterVisible(true)}
        />
      </View>

      {/* Gold Horizontal Progress Bar directly under Navbar (only active on courses page) */}
      {route === 'courses' && (
        <View style={{
          position: 'absolute',
          top: 79,
          left: 0,
          right: 0,
          height: 3,
          backgroundColor: '#011B36',
          zIndex: 10000,
        }}>
          <View style={{
            height: '100%',
            backgroundColor: COLORS.gold,
            width: `${scrollProgress * 100}%`,
          }} />
        </View>
      )}

      {route === 'landing' ? (
        /* Root Landing Page: Coming Soon / Under Construction */
        <ScrollView 
          ref={scrollViewRef}
          style={styles.scrollContainer} 
          scrollEventThrottle={16}
          onScroll={handleScroll}
        >
          {/* Static Grid Template Wrapper */}
          <View 
            style={[
              styles.sharedOuterContainer, 
              { 
                flexDirection: isDesktop ? 'row' : 'column',
                paddingHorizontal: isDesktop ? '6%' : 0,
              }
            ]}
          >
            {/* Left Column with Sticky Emblem */}
            {isDesktop && (
              <View style={[styles.leftColumn, { width: leftColWidth, minWidth: 284, maxWidth: 364 }]}>
                <Image 
                  source={require('./assets/images/logo-bg.svg')} 
                  style={[
                    styles.logoInsignia,
                    {
                      width: Math.round(68 * logoScale),
                      height: Math.round(70.27 * logoScale),
                    }
                  ]} 
                />
              </View>
            )}

            {/* Right Column with Landing Page */}
            <View style={[
              styles.mainColumn, 
              { 
                paddingLeft: isDesktop ? 40 : 0,
                paddingTop: isDesktop ? 60 : 32,
                paddingBottom: 40,
                maxWidth: mainContentWidth,
              }
            ]}>
              <LandingPage 
                mainContentWidth={mainContentWidth}
                onNavigateToCourses={() => navigateToRoute('courses')}
              />
            </View>
          </View>

          {/* Minimalist Footer for Landing Page: Logos, Contacts, and Legal only */}
          <LandingFooter onOpenPolicy={handleOpenPolicy} />
        </ScrollView>
      ) : (
        /* Courses Page (/courses/) */
        <ScrollView 
          ref={scrollViewRef}
          style={styles.scrollContainer} 
          scrollEventThrottle={16}
          onScroll={handleScroll}
          scrollEnabled={renderedMode !== 'member-coming-soon'}
        >
          {/* Static Grid Template Wrapper */}
          <View 
            onLayout={captureSectionLayout('instructors')}
            style={[
              styles.sharedOuterContainer, 
              { 
                flexDirection: isDesktop ? 'row' : 'column',
                paddingHorizontal: isDesktop ? '6%' : 0,
              }
            ]}
          >
            {/* Left Column with Sticky Emblem */}
            {isDesktop && (
              <View style={[styles.leftColumn, { width: leftColWidth, minWidth: 284, maxWidth: 364 }]}>
                <Image 
                  source={require('./assets/images/logo-bg.svg')} 
                  style={[
                    styles.logoInsignia,
                    {
                      width: Math.round(68 * logoScale),
                      height: Math.round(70.27 * logoScale),
                    }
                  ]} 
                />
              </View>
            )}

            {/* Right Column with Animating Views */}
            <Animated.View style={[
              styles.mainColumn, 
              { 
                paddingLeft: isDesktop ? 40 : 0,
                paddingTop: isDesktop ? 60 : 32,
                paddingBottom: 0,
                maxWidth: mainContentWidth,
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}>
              {renderedMode === 'course' && <Hero mainContentWidth={mainContentWidth} onOpenRegister={() => setRegisterVisible(true)} />}
              {renderedMode === 'instructors' && <Instructors />}
              {renderedMode === 'experience' && <Experience />}
              {renderedMode === 'member-coming-soon' && <ComingSoon mainContentWidth={mainContentWidth} />}
            </Animated.View>
          </View>

          {renderedMode !== 'member-coming-soon' && (
            <>
              <View onLayout={captureSectionLayout('course')}>
                <CourseDetails leftColWidth={leftColWidth} mainContentWidth={mainContentWidth} onOpenRegister={() => setRegisterVisible(true)} />
              </View>

              <Requirements />

              <View onLayout={captureSectionLayout('opportunities')}>
                <Opportunities leftColWidth={leftColWidth} onNavigateToMemberComingSoon={() => handleNavigate('member-coming-soon')} />
              </View>

              <View onLayout={captureSectionLayout('costs')}>
                <Costs leftColWidth={leftColWidth} onOpenRegister={() => setRegisterVisible(true)} />
              </View>

              <View onLayout={captureSectionLayout('schedule')}>
                <Schedule leftColWidth={leftColWidth} onOpenRegister={() => setRegisterVisible(true)} />
              </View>
              
              {/* Unified screen-height Ambassador & Footer Section */}
              <View style={{ zIndex: 1 }}>
                <Footer 
                  onOpenPolicy={handleOpenPolicy} 
                  onNavigate={handleNavigate}
                  onOpenAmbassador={() => setAmbassadorVisible(true)}
                />
              </View>
            </>
          )}
        </ScrollView>
      )}

      {/* Render LegalModal */}
      <LegalModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        type={policyType} 
      />

      {/* Render Sliding Registration Drawer */}
      <RegisterDrawer 
        visible={registerVisible} 
        onClose={() => setRegisterVisible(false)} 
        onOpenPolicy={handleOpenPolicy}
      />

      {/* Render Sliding Ambassador Drawer */}
      <AmbassadorDrawer 
        visible={ambassadorVisible} 
        onClose={() => setAmbassadorVisible(false)} 
        onOpenPolicy={handleOpenPolicy}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    flex: 1,
  },
  sharedOuterContainer: {
    backgroundColor: COLORS.lightBg,
    paddingHorizontal: '6%',
  },
  leftColumn: {
    minWidth: 284,
    maxWidth: 364,
    alignItems: 'center',
    borderRightWidth: 2,
    borderRightColor: COLORS.gold,
    paddingRight: 24,
    paddingTop: 80,
  },
  mainColumn: {
    flex: 1,
    width: '100%',
    paddingVertical: 60,
  },
  logoInsignia: {
    width: 68,
    height: 70.27,
    resizeMode: 'contain',
    marginLeft: '-40%',
  },
});
