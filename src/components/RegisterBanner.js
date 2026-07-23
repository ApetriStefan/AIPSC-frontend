// src/components/RegisterBanner.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { styles } from '../styles/RegisterBanner.styles';

export default function RegisterBanner({ onOpenRegister }) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  if (!isDesktop) {
    return (
      <View style={styles.mobileBannerContainer}>
        <View style={styles.mobileBannerInnerBorder}>

          {/* Left Column (Details and CTA) — full width on mobile */}
          <View style={styles.mobileBannerLeftContent}>
            <Text style={styles.mobileBannerTitle}>Register now!</Text>
            <Text style={styles.mobileBannerDescription}>
              Lorem ipsum dolor sit amet consectetur. Scelerisque egestas dolor feugiat mi nulla. Vestibulum auctor sed diam nisl etiam aliquam vulputate sit.
            </Text>

            <View style={styles.mobileBannerActionRow}>
              {/* Action triggers RegisterDrawer */}
              <TouchableOpacity style={styles.mobileBannerBtn} onPress={onOpenRegister}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text style={styles.mobileBannerBtnText}>REGISTER NOW</Text>
                  <Image
                    source={require('../../assets/images/finger-pad.svg')}
                    style={styles.mobileBannerIcon}
                  />
                </View>
              </TouchableOpacity>
              <Text style={styles.mobileBannerLimitText}>*limited at 20 people</Text>
            </View>
          </View>

        </View>
      </View>
    );
  }

  return (
    <View style={styles.bannerContainer}>
      <View style={styles.bannerInnerBorder}>

        {/* Left Column (Details and CTA) — desktop */}
        <View style={styles.bannerLeftContent}>
          <Text style={styles.bannerTitle}>Register now!</Text>
          <Text style={styles.bannerDescription}>
            Lorem ipsum dolor sit amet consectetur. Scelerisque egestas dolor feugiat mi nulla. Vestibulum auctor sed diam nisl etiam aliquam vulputate sit.
          </Text>

          <View style={styles.bannerActionRow}>
            {/* Action triggers RegisterDrawer */}
            <TouchableOpacity style={styles.bannerBtn} onPress={onOpenRegister}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={styles.bannerBtnText}>REGISTER NOW</Text>
                <Image
                  source={require('../../assets/images/finger-pad.svg')}
                  style={styles.bannerIcon}
                />
              </View>
            </TouchableOpacity>
            <Text style={styles.bannerLimitText}>*limited at 20 people</Text>
          </View>
        </View>

        {/* Right Column (Centered Stamp Graphic) */}
        <View style={styles.stampContainer}>
          <Image
            source={require('../../assets/images/stamp.png')}
            style={styles.stampImage}
          />
        </View>

      </View>
    </View>
  );
}
