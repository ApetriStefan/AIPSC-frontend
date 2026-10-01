// src/components/LandingFooter.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, useWindowDimensions, Linking, Platform } from 'react-native';
import { styles } from '../styles/LandingFooter.styles';

export default function LandingFooter({ onOpenPolicy }) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  const handleCall = () => {
    const url = 'tel:+40745629065';
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.location.href = url;
    } else {
      Linking.openURL(url);
    }
  };

  const handleWhatsApp = async () => {
    const phoneNumber = '40745629065';
    const message = encodeURIComponent('Bună ziua! Doresc mai multe informații despre AIPSC.');
    const appUrl = `whatsapp://send?phone=${phoneNumber}&text=${message}`;
    const webUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined') {
        window.open(webUrl, '_blank');
      } else {
        Linking.openURL(webUrl);
      }
    } else {
      try {
        const canOpen = await Linking.canOpenURL(appUrl);
        if (canOpen) {
          await Linking.openURL(appUrl);
        } else {
          await Linking.openURL(webUrl);
        }
      } catch (_) {
        await Linking.openURL(webUrl);
      }
    }
  };

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
          <TouchableOpacity onPress={() => Linking.openURL('mailto:contact@aipsc.ro')} activeOpacity={0.8}>
            <Text style={styles.contactTextGold}>contact@aipsc.ro</Text>
          </TouchableOpacity>
          <View style={styles.phoneContactRow}>
            <TouchableOpacity onPress={handleCall} activeOpacity={0.8}>
              <Text style={styles.contactTextGold}>+40 745 629 065</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleWhatsApp} style={styles.whatsappIconBtn} activeOpacity={0.8} title="Chat on WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.541 1.944.828 3.018.828 3.181 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.768-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.159.57 4.199 1.584 5.952l-1.684 6.15 6.305-1.654c1.701.925 3.654 1.458 5.733 1.458 6.627 0 12-5.373 12-12s-5.373-12-12-12zm.062 21.6c-1.879 0-3.642-.533-5.141-1.454l-.368-.226-3.743.982.999-3.648-.248-.395c-1.026-1.635-1.567-3.535-1.567-5.49 0-5.748 4.673-10.422 10.424-10.422 5.751 0 10.424 4.674 10.424 10.422 0 5.749-4.673 10.422-10.424 10.422z"/>
              </svg>
            </TouchableOpacity>
          </View>
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
