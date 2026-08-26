// src/components/LandingPage.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, useWindowDimensions, Platform } from 'react-native';
import { styles } from '../styles/LandingPage.styles';

export default function LandingPage({ mainContentWidth, onNavigateToCourses }) {
  const { width, height } = useWindowDimensions();
  const isDesktop = width >= 900;
  const [btnHovered, setBtnHovered] = useState(false);

  // Available height excluding header on web
  const availableHeight = Platform.OS === 'web' ? 'calc(100vh - 80px)' : height - 80;

  return (
    <View style={[
      isDesktop ? styles.innerContainer : styles.mobileOuterContainer,
      { minHeight: availableHeight },
      mainContentWidth ? { maxWidth: mainContentWidth } : null
    ]}>
      {!isDesktop && <View style={[styles.mobileVerticalBorder, { top: 0, bottom: 0 }]} />}
      
      <View style={isDesktop ? null : styles.mobileInnerContainer}>
        {/* Title row */}
        {isDesktop ? (
          <Text style={styles.mainTitle}>Action Air IPSC{"\n"}Romania</Text>
        ) : (
          <View style={styles.mobileTitleRow}>
            <Text style={[styles.mobileMainTitle, { flex: 1 }]}>Action Air IPSC{"\n"}Romania</Text>
            <Image
              source={require('../../assets/images/logo-bg.svg')}
              style={styles.mobileHeroLogo}
            />
          </View>
        )}

        {/* Badge */}
        <View style={styles.badgeWrapper}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Under Construction</Text>
          </View>
        </View>

        {/* Main Body Text */}
        <View style={{ position: 'relative', zIndex: 50 }}>
          <Text style={isDesktop ? styles.bodyText : styles.mobileBodyText}>
            Our official website and AIPSC membership portal are currently under construction.
            {"\n\n"}
            In the meantime, explore our upcoming{' '}
            <Text 
              style={styles.highlightLink}
              onPress={onNavigateToCourses}
            >
              courses
            </Text>
            {' '}and secure your spot in official IPSC training.
          </Text>

          {/* CTA Button */}
          <View style={styles.ctaRow}>
            <TouchableOpacity 
              style={[
                styles.seeCoursesBtn,
                btnHovered && { backgroundColor: '#01223C' }
              ]} 
              onPress={onNavigateToCourses}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              activeOpacity={0.85}
            >
              <Text style={styles.seeCoursesBtnText}>SEE OUR COURSES</Text>
              <Image 
                source={require('../../assets/images/finger-pad-white.svg')} 
                style={styles.btnIcon} 
              />
            </TouchableOpacity>
          </View>

          {/* Course Preview Teaser Card */}
          <TouchableOpacity 
            style={styles.previewCard}
            onPress={onNavigateToCourses}
            activeOpacity={0.9}
          >
            <View style={styles.previewCardHeader}>
              <View style={styles.previewTag}>
                <Text style={styles.previewTagText}>Upcoming event - 09/10/2026</Text>
              </View>
              <Text style={styles.previewPlaces}>Places left: 10</Text>
            </View>

            <Text style={styles.previewTitle}>
              IPSC Safety & Competition Course, MISIA
            </Text>
            <Text style={styles.previewLocation}>
              Zalău (Romania) • 3-day progressive training
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
