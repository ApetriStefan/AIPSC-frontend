// src/components/CourseDetails.js
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  useWindowDimensions, 
  Platform, 
  Animated 
} from 'react-native';
import { styles } from '../styles/CourseDetails.styles';

const points = [
  "Draw and shoot in under 1 second",
  "Understand the official IPSC rules and safety standards",
  "Understand core techniques in IPSC: static & moving reloads, movement, and shooting while moving",
  "Receive official certificate signed by MISIA instructors confirming you are safe to shoot IPSC. This is recognized and serves as proof for acceptance into IPSC membership.",
  "Receive 50% off the annual AIPSC membership fee (normally 300 lei/year). This membership can later be upgraded to full IPSC membership with a one-time fee of 200 lei."
];

const CARD_COUNT = points.length;
const COLLAPSED_GAP = 55; // Initial overlap distance between card tops when stacked
const SPREAD_GAP = 240;    // Spacing distance between card tops when fully open

function findScrollParent(node) {
  let parent = node && node.parentElement;
  while (parent) {
    const style = window.getComputedStyle(parent);
    const overflowY = style.overflowY;
    const canScroll = (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay');
    if (canScroll && parent.scrollHeight > parent.clientHeight) {
      return parent;
    }
    parent = parent.parentElement;
  }
  return window;
}

// The event card placed at the top of the right content column
function EventCard({ isDesktop, onOpenRegister }) {
  if (!isDesktop) {
    return (
      <View style={styles.mobileEventCard}>
        {/* Grainy overlay */}
        <View style={styles.mobileGrainyOverlay} />

        {/* Background image */}
        {/* <View style={styles.mobileImageBackgroundContainer}>
          <View style={{ overflow: 'hidden', width: '100%', height: '100%' }}>
            <Image
              source={require('../../assets/images/hotel-casa-romana.png')}
              style={styles.mobileEventCardImage}
            />
          </View>
          <View style={styles.mobileFadeGradient} />
        </View> */}

        {/* Foreground content */}
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

          <TouchableOpacity style={styles.mobileEventBtn} onPress={onOpenRegister}>
            <Text style={styles.mobileEventBtnText}>REGISTER NOW</Text>
            <Image
              source={require('../../assets/images/finger-pad-white.svg')}
              style={styles.mobileEventBtnIcon}
            />
          </TouchableOpacity>
          <Text style={styles.mobilePlacesLeftText}>Places left: 10</Text>
        </View>
      </View>
    );
  }

  // Desktop version
  return (
    <View style={styles.eventCard}>
      {/* Grainy overlay */}
      <View style={styles.grainyOverlay} />

      {/* Background image — right side */}
      <View style={styles.imageBackgroundContainer}>
        <View style={{ overflow: 'hidden', width: '100%', height: '100%' }}>
          <Image
            source={require('../../assets/images/hotel-casa-romana.png')}
            style={styles.eventCardImage}
          />
        </View>
        <View style={styles.fadeGradient} />
      </View>

      {/* Foreground content — left side */}
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

        <TouchableOpacity style={styles.eventBtn} onPress={onOpenRegister}>
          <Text style={styles.eventBtnText}>REGISTER NOW</Text>
          <Image
            source={require('../../assets/images/finger-pad-white.svg')}
            style={styles.eventBtnIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function CourseDetails({ onOpenRegister }) {
  const { height, width } = useWindowDimensions();
  const isDesktop = width >= 900;

  const titleNodeRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const spreadAnim = useRef(new Animated.Value(0)).current;

  const cardHeight = Math.max(260, Math.round(height * 0.3));
  const stackWrapperHeight = (CARD_COUNT - 1) * SPREAD_GAP + cardHeight;

  const setTitleRef = useCallback((node) => {
    titleNodeRef.current = node;
  }, []);

  // Detect when the section title text reaches the top scroll position under the navbar
  useEffect(() => {
    if (!isDesktop) return;
    if (typeof window === 'undefined') return;

    let observer = null;
    let scrollTarget = null;
    let handleScroll = null;

    const setupListener = () => {
      const el = titleNodeRef.current;
      if (!el) return;

      if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsOpen(true);
              if (observer) observer.disconnect();
            }
          },
          { 
            // 80px accounts for sticky header, -65% ensures text is near top under header
            rootMargin: '-80px 0px -65% 0px',
            threshold: 0.1 
          }
        );
        observer.observe(el);
      }

      const scrollParent = findScrollParent(el);
      const isWindow = scrollParent === window;
      scrollTarget = isWindow ? window : scrollParent;

      let ticking = false;
      handleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            ticking = false;
            const titleEl = titleNodeRef.current;
            if (!titleEl) return;
            const rect = titleEl.getBoundingClientRect();
            if (rect.top > 0 && rect.top <= 180) {
              setIsOpen(true);
            }
          });
          ticking = true;
        }
      };

      scrollTarget.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    };

    const timer = setTimeout(setupListener, 100);

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
      if (scrollTarget && handleScroll) {
        scrollTarget.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isDesktop]);

  // Spring animation sequence to spread cards out simultaneously
  useEffect(() => {
    if (isOpen) {
      Animated.spring(spreadAnim, {
        toValue: 1,
        friction: 8,
        tension: 25,
        useNativeDriver: Platform.OS !== 'web',
      }).start();
    }
  }, [isOpen, spreadAnim]);

  // Desktop layout with clean entry animation
  if (isDesktop) {
    return (
      <View
        style={styles.sectionContainer}
      >
        <View style={[
          styles.stickyViewport,
          { flexDirection: 'row', paddingRight: 0, position: 'relative' }
        ]}>
          {/* Empty Left Column (Desktop Only) */}
          <View style={styles.leftColumn} />

          {/* Main Content Column */}
          <View style={styles.mainColumn}>
            {/* Event Card — top of the right column, not sticky */}
            <View style={{ paddingLeft: 40, paddingRight: 0, paddingBottom: 40 }}>
              <EventCard isDesktop={true} onOpenRegister={onOpenRegister} />
            </View>

            <View ref={setTitleRef}>
              <Text style={[
                styles.sectionTitle,
                { paddingLeft: 40, paddingRight: '6%' }
              ]}>
                By the end of the course{"\n"}you will be able to:
              </Text>
            </View>

            <View style={[styles.cardStackWrapper, { height: stackWrapperHeight }]}>
              {points.map((text, index) => {
                const baseTop = index * COLLAPSED_GAP;
                const translateY = spreadAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, index * (SPREAD_GAP - COLLAPSED_GAP)],
                });
                const zIndex = index + 1;

                return (
                  <Animated.View
                    key={index}
                    style={[
                      styles.card,
                      {
                        height: cardHeight,
                        top: baseTop,
                        transform: [{ translateY }],
                        zIndex,
                        paddingLeft: 40,
                        paddingRight: '6%',
                      },
                    ]}
                  >
                    <Text style={styles.itemNumber}>{index + 1}.</Text>
                    <Text style={styles.itemText}>{text}</Text>
                  </Animated.View>
                );
              })}
            </View>
          </View>
        </View>
      </View>
    );
  }

  // Mobile: always-open cards, no animation, natural document flow
  return (
    <View style={styles.mobileSectionContainer}>
      {/* Vertical gold line extending through the section */}
      <View style={styles.mobileVerticalBorder} />

      <View style={styles.mobileInnerContainer}>
        {/* Event Card — top of the section on mobile */}
        <View style={{ marginBottom: 32 }}>
          <EventCard isDesktop={false} onOpenRegister={onOpenRegister} />
        </View>

        <Text style={[styles.mobileSectionTitle, { marginBottom: 24 }]}>
          By the end of the course{"\n"}you will be able to:
        </Text>

        <View style={styles.mobileCardStack}>
          {points.map((text, index) => (
            <View
              key={index}
              style={styles.mobileCard}
            >
              <Text style={styles.mobileItemNumber}>{index + 1}.</Text>
              <Text style={styles.mobileItemText}>{text}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}