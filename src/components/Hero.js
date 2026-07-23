import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, useWindowDimensions, Platform } from 'react-native';
import { styles } from '../styles/Hero.styles';



export default function Hero({ onOpenRegister }) {
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const animFrameRef = useRef(null);
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isDesktop || !activeTooltip) return;

    const handleDismiss = () => {
      setActiveTooltip(null);
    };

    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.addEventListener('scroll', handleDismiss, { passive: true, capture: true });
      window.addEventListener('touchmove', handleDismiss, { passive: true, capture: true });

      const timer = setTimeout(() => {
        window.addEventListener('click', handleDismiss, { capture: true });
        window.addEventListener('touchstart', handleDismiss, { capture: true });
      }, 50);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', handleDismiss, { capture: true });
        window.removeEventListener('touchmove', handleDismiss, { capture: true });
        window.removeEventListener('click', handleDismiss, { capture: true });
        window.removeEventListener('touchstart', handleDismiss, { capture: true });
      };
    }
  }, [isDesktop, activeTooltip]);

  const handleMouseMove = (e) => {
    if (!containerRef.current || !e) return;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (animFrameRef.current || clientX === undefined) return;

    animFrameRef.current = requestAnimationFrame(() => {
      animFrameRef.current = null;
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cardWidth = Math.min(246, rect.width);
      const maxX = Math.max(0, rect.width - cardWidth);
      const rawX = clientX - rect.left + 12;
      const x = Math.max(0, Math.min(maxX, rawX));
      const y = clientY - rect.top + 16;
      setCursorPos({ x, y });
    });
  };

  const handleTap = (e, type) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    if (activeTooltip === type) {
      setActiveTooltip(null);
      return;
    }
    const nativeEv = e && e.nativeEvent ? e.nativeEvent : e;
    if (containerRef.current && nativeEv) {
      const rect = containerRef.current.getBoundingClientRect();
      const pageX = nativeEv.pageX ?? nativeEv.clientX ?? (rect.left + 20);
      const pageY = nativeEv.pageY ?? nativeEv.clientY ?? (rect.top + 20);
      const cardWidth = Math.min(246, rect.width);
      const maxX = Math.max(0, rect.width - cardWidth);
      const rawX = pageX - rect.left - 20;
      const x = Math.max(0, Math.min(maxX, rawX));
      const y = pageY - rect.top + 16;
      setCursorPos({ x, y });
    }
    setActiveTooltip(type);
  };

  // Tooltip card rendered as native View — matches ipsc-card.svg / misia-card.svg design
  const TooltipCard = ({ title, body, style }) => (
    <View style={[styles.tooltipCard, style]}>
      <Text style={styles.tooltipTitle}>{title}</Text>
      <Text style={styles.tooltipBody}>{body}</Text>
    </View>
  );

  return (
    <View style={isDesktop ? styles.innerContainer : styles.mobileOuterContainer}>
      {!isDesktop && <View style={styles.mobileVerticalBorder} />}
      
      <View style={isDesktop ? null : styles.mobileInnerContainer}>
        {/* On mobile: title row with logo to the right */}
        {isDesktop ? (
          <Text style={styles.mainTitle}>IPSC Safety &{"\n"}Competition Course</Text>
        ) : (
          <View style={styles.mobileTitleRow}>
            <Text style={[styles.mobileMainTitle, { flex: 1 }]}>IPSC Safety &{"\n"}Competition Course</Text>
            <Image
              source={require('../../assets/images/logo-bg.svg')}
              style={styles.mobileHeroLogo}
            />
          </View>
        )}

        <View
          ref={containerRef}
          onMouseMove={Platform.OS === 'web' ? handleMouseMove : undefined}
          style={{ position: 'relative', zIndex: 50 }}
        >
          {isDesktop ? (
            <Text style={styles.bodyTextRed}>
              I'm excited to announce that we will be organizing a 3-day official{' '}
              <Text
                onMouseEnter={(e) => {
                  setActiveTooltip('IPSC');
                  if (e && e.nativeEvent) handleMouseMove(e.nativeEvent);
                }}
                onMouseLeave={() => setActiveTooltip(null)}
                style={styles.underlinedRedText}
              >
                IPSC Basic Course
              </Text>{' '}
              led by{' '}
              <Text
                onMouseEnter={(e) => {
                  setActiveTooltip('MISIA');
                  if (e && e.nativeEvent) handleMouseMove(e.nativeEvent);
                }}
                onMouseLeave={() => setActiveTooltip(null)}
                style={styles.underlinedRedText}
              >
                MISIA-certified
              </Text>{' '}
              instructors at Poligon de Tragere Cris Salaj in Zalau, in the coming months, with the exact dates confirmed and announced at least one month in advance.
              {"\n\n"}
              This is a high-quality, progressive training program suitable for both beginners and those already competing. The course is open to anyone interested in practical shooting, including airsofters, regardless of current level. Owning a firearm is not mandatory, you can either rent equipment from the range or use your own airsoft pistol.
              {"\n\n"}
              Thanks to the range's unique location, this course is designed as a complete experience with training, social time and visit, food.
            </Text>
          ) : (
            <Text style={styles.mobileBodyTextRed}>
              I'm excited to announce that we will be organizing a 3-day official{' '}
              <Text
                onPress={(e) => handleTap(e, 'IPSC')}
                style={styles.mobileUnderlinedRedText}
              >
                <Image
                  source={require('../../assets/images/information-circle.svg')}
                  style={styles.infoIcon}
                />
                IPSC Basic Course
              </Text>{' '}
              led by{' '}
              <Text
                onPress={(e) => handleTap(e, 'MISIA')}
                style={styles.mobileUnderlinedRedText}
              >
                <Image
                  source={require('../../assets/images/information-circle.svg')}
                  style={styles.infoIcon}
                />
                MISIA-certified
              </Text>{' '}
              instructors at Poligon de Tragere Cris Salaj in Zalau, in the coming months, with the exact dates confirmed and announced at least one month in advance.
              {"\n\n"}
              This is a high-quality, progressive training program suitable for both beginners and those already competing. The course is open to anyone interested in practical shooting, including airsofters, regardless of current level. Owning a firearm is not mandatory, you can either rent equipment from the range or use your own airsoft pistol.
              {"\n\n"}
              Thanks to the range's unique location, this course is designed as a complete experience with training, social time and visit, food.
            </Text>
          )}

          {/* Floating tooltip cards — absolute positioned near cursor/tap for both desktop and mobile */}
          {activeTooltip === 'IPSC' && (
            <TooltipCard
              title="IPSC:"
              body={"The most popular practical shooting sport in the world. IPSC is an International Practical Shooting Confederation that acts globally with over 750+ matches per year, all over the world."}
              style={{ top: cursorPos.y, left: cursorPos.x }}
            />
          )}
          {activeTooltip === 'MISIA' && (
            <TooltipCard
              title="MISIA:"
              body={"\"Main International Shooting Instructors Association\" is the official instructor body of IPSC. Its main mission is to promote, maintain, and improve a worldwide standard of safety training and high-quality instruction in practical shooting."}
              style={{ top: cursorPos.y, left: cursorPos.x }}
            />
          )}
        </View>
      </View>
    </View>
  );
}
