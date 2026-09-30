// src/components/TopRegistrationBanner.js
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, Animated, useWindowDimensions } from 'react-native';
import { styles } from '../styles/CourseDetails.styles';
import { SecondaryButton } from './common/AppButton';

const slides = [
  { source: require('../../assets/images/accomodation/hotel-casa-romana.png'), resizeMode: 'cover' },
  { source: require('../../assets/images/accomodation/hotel-casa-romana2.png'), resizeMode: 'cover' },
  { source: require('../../assets/images/equipment/canik-rival-s.jpg'), resizeMode: 'contain' },
  { source: require('../../assets/images/equipment/cz-75.jpg'), resizeMode: 'contain' },
];

export default function TopRegistrationBanner({ leftColWidth, mainContentWidth, onOpenRegister }) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [nextSlideIndex, setNextSlideIndex] = useState(1);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const nextFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isDesktop) return;

    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
      setNextSlideIndex((prev) => (prev + 2) % slides.length);
      fadeAnim.setValue(1);
      nextFadeAnim.setValue(0);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(nextFadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        fadeAnim.setValue(1);
        nextFadeAnim.setValue(0);
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [currentSlideIndex, fadeAnim, nextFadeAnim, isDesktop]);

  if (!isDesktop) {
    return (
      <View style={[styles.mobileSectionContainer, { paddingVertical: 24 }]}>
        <View style={styles.mobileVerticalBorder} />
        <View style={styles.mobileInnerContainer}>
          <View style={styles.mobileEventCard}>
            <View style={styles.mobileGrainyOverlay} />
            <View style={styles.mobileEventDetails}>
              <View style={{ marginBottom: 4 }}>
                <View style={styles.mobileTagRow}>
                  <View style={styles.mobileTagGold}>
                    <Text style={styles.mobileTagGoldText}>Upcoming event - 09/10/2026</Text>
                  </View>
                </View>
                <View style={styles.mobileTagDivider} />
              </View>

              <Text style={styles.mobileEventTitle}>
                IPSC Safety & Competition Course, MISIA
              </Text>

              <Text style={styles.mobileEventLocation}>Zalău (Romania)</Text>

              <SecondaryButton 
                onPress={onOpenRegister}
                style={styles.mobileEventBtn}
              >
                <Text style={styles.mobileEventBtnText}>REGISTER NOW</Text>
                <Image
                  source={require('../../assets/images/finger-pad-white.svg')}
                  style={styles.mobileEventBtnIcon}
                />
              </SecondaryButton>
              <Text style={styles.mobilePlacesLeftText}>Places left: 10</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.sectionContainer}>
      <View style={[styles.stickyViewport, { flexDirection: 'row', paddingRight: 0, position: 'relative' }]}>
        {/* Empty Left Column (Desktop Only) */}
        <View style={[styles.leftColumn, leftColWidth ? { width: leftColWidth } : null]} />

        {/* Main Content Column */}
        <View style={[styles.mainColumn, { paddingVertical: 40 }]}>
          <View style={[{ paddingLeft: 40, paddingRight: 0 }, mainContentWidth ? { maxWidth: mainContentWidth } : null]}>
            <View style={styles.eventCard}>
              {/* Grainy overlay */}
              <View style={styles.grainyOverlay} />

              {/* Background image slideshow — right side */}
              <View style={styles.imageBackgroundContainer}>
                <View style={{ overflow: 'hidden', width: '100%', height: '100%', position: 'relative' }}>
                  <Animated.Image
                    source={slides[currentSlideIndex].source}
                    style={[
                      styles.eventCardImage,
                      { opacity: fadeAnim, resizeMode: slides[currentSlideIndex].resizeMode }
                    ]}
                  />
                  <Animated.Image
                    source={slides[nextSlideIndex].source}
                    style={[
                      styles.eventCardImage,
                      { opacity: nextFadeAnim, resizeMode: slides[nextSlideIndex].resizeMode }
                    ]}
                  />
                </View>
                <View style={styles.fadeGradient} />
              </View>

              {/* Foreground content */}
              <View style={styles.eventDetails}>
                <View style={{ marginBottom: 4 }}>
                  <View style={styles.tagRow}>
                    <View style={styles.tagGold}>
                      <Text style={styles.tagGoldText}>Upcoming event - 09/10/2026</Text>
                    </View>
                    <Text style={styles.placesLeftText}>Places left: 10</Text>
                  </View>
                  <View style={styles.tagDivider} />
                </View>

                <Text style={styles.eventTitle}>
                  IPSC Safety & Competition Course, MISIA
                </Text>

                <Text style={styles.eventLocation}>Zalău (Romania)</Text>

                <SecondaryButton 
                  onPress={onOpenRegister}
                  style={styles.eventBtn}
                >
                  <Text style={styles.eventBtnText}>REGISTER NOW</Text>
                  <Image
                    source={require('../../assets/images/finger-pad-white.svg')}
                    style={styles.eventBtnIcon}
                  />
                </SecondaryButton>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
