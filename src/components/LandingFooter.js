// src/components/LandingFooter.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, useWindowDimensions, Linking } from 'react-native';
import { styles } from '../styles/LandingFooter.styles';

export default function LandingFooter({ onOpenPolicy }) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  return (
    <View style={styles.footerContainer}>
      {/* Main Area: Logos & Contacts only */}
      <View style={isDesktop ? styles.mainRow : styles.mobileMainRow}>
        {/* Logos */}
        <View style={isDesktop ? styles.leftGroup : styles.mobileLogosRow}>
          <TouchableOpacity 
            onPress={() => Linking.openURL('https://www.ipsc.org/')}
            activeOpacity={0.8}
          >
            <Image 
              source={require('../../assets/images/ipsc-logo.svg')} 
              style={styles.footerLogo} 
            />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => Linking.openURL('https://www.misia.world/')}
            activeOpacity={0.8}
          >
            <Image 
              source={require('../../assets/images/misia-logo.svg')} 
              style={styles.footerLogoMisia} 
            />
          </TouchableOpacity>
        </View>

        {/* Contact Column */}
        <View style={styles.columnContacts}>
          <Text style={styles.colTitleContacts}>Contacts:</Text>
          <Text style={styles.contactTextGold}>contact@aipsc.ro</Text>
        </View>
      </View>

      {/* Bottom Bar: Legal links only */}
      <View style={styles.bottomBar}>
        <View style={styles.legalLinksGroup}>
          <Text style={styles.legalLabel}>Legal:</Text>
          <TouchableOpacity onPress={() => onOpenPolicy('privacy')}>
            <Text style={styles.legalLink}>Privacy Policy</Text>
          </TouchableOpacity>
          <Text style={styles.legalSeparator}>|</Text>
          <TouchableOpacity onPress={() => onOpenPolicy('terms')}>
            <Text style={styles.legalLink}>Terms and conditions</Text>
          </TouchableOpacity>
          <Text style={styles.legalSeparator}>|</Text>
          <TouchableOpacity onPress={() => onOpenPolicy('cookie')}>
            <Text style={styles.legalLink}>Cookie Policy</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.copyright}>© Copyright 2026 | Design by OneCreative</Text>
      </View>
    </View>
  );
}
