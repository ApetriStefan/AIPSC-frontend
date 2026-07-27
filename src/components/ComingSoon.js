import React from 'react';
import { View, Text, Image, useWindowDimensions, Platform } from 'react-native';
import { styles } from '../styles/Hero.styles';

export default function ComingSoon() {
  const { width, height } = useWindowDimensions();
  const isDesktop = width >= 900;
  
  // Calculate exact available height excluding header (80px)
  const availableHeight = Platform.OS === 'web' ? 'calc(100vh - 80px)' : height - 80;

  return (
    <View style={[
      isDesktop ? styles.innerContainer : styles.mobileOuterContainer,
      { minHeight: availableHeight }
    ]}>
      {!isDesktop && <View style={[styles.mobileVerticalBorder, { top: 0, bottom: 0 }]} />}
      
      <View style={isDesktop ? null : styles.mobileInnerContainer}>
        {/* Title row */}
        {isDesktop ? (
          <Text style={styles.mainTitle}>Become an IPSC &{"\n"}AIPSC Member</Text>
        ) : (
          <View style={styles.mobileTitleRow}>
            <Text style={[styles.mobileMainTitle, { flex: 1 }]}>Become an IPSC &{"\n"}AIPSC Member</Text>
            <Image
              source={require('../../assets/images/logo-bg.svg')}
              style={styles.mobileHeroLogo}
            />
          </View>
        )}

        <View style={{ position: 'relative', zIndex: 50 }}>
          <Text style={isDesktop ? styles.bodyTextRed : styles.mobileBodyTextRed}>
            Coming Soon
            {"\n\n"}
            Our membership registration portal is currently under development. Please check back soon for updates on how to join and become an official IPSC & AIPSC member.
          </Text>
        </View>
      </View>
    </View>
  );
}
