// src/components/Requirements.js
import React from 'react';
import { View, Text, Image, useWindowDimensions } from 'react-native';
import { styles } from '../styles/Requirements.styles';

export default function Requirements() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 800;

  if (!isDesktop) {
    return (
      <View style={styles.mobileSectionContainer}>
        {/* Background Image & Overlay */}
        <Image 
          source={require('../../assets/images/shooting-man-1.png')} 
          style={styles.mobileBackgroundImage} 
        />
        <View style={styles.mobileGradientOverlay} />

        {/* Foreground Content */}
        <View style={styles.mobileContentContainer}>
          <Text style={styles.mobileTitle}>Requirements:</Text>
          <Text style={styles.mobileDescription}>Gun, belt, pouches, eye and ear protection, and a minimum of 3 magazines.</Text>
          <View style={styles.mobileDivider} />
          
          <Text style={styles.mobileSubtext}>Recommended nr. of rounds:</Text>
          <Text style={styles.mobileHighlightNumber}>350+</Text>
          
          <Text style={styles.mobileRentalNotice}>*full equipment rental available on site</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.leftColumn}>
        <Text style={styles.title}>Requirements:</Text>
        <Text style={styles.description}>Gun, belt, pouches, eye and ear protection, and a minimum of 3 magazines.</Text>
        <View style={styles.divider} />
        <Text style={styles.subtext}>Recommended nr. of rounds:</Text>
        <Text style={styles.highlightNumber}>350+</Text>
      </View>
      <View style={styles.rightColumn}>
        <View style={styles.imageContainer}>
          <Image 
            source={require('../../assets/images/shooting-man-1.png')} 
            style={styles.fullImage} 
          />
          <View style={styles.gradientOverlay} />
        </View>
        <Text style={styles.rentalNotice}>*full equipment rental available on site</Text>
      </View>
    </View>
  );
}
