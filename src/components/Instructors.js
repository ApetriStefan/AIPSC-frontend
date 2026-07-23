// src/components/Instructors.js
import React from 'react';
import { View, Text, Image, useWindowDimensions } from 'react-native';
import { styles } from '../styles/Instructors.styles';

export default function Instructors() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  if (!isDesktop) {
    return (
      <View style={styles.mobileOuterContainer}>
        {/* Vertical gold line aligned with Opportunities/Schedule */}
        <View style={styles.mobileVerticalBorder} />

        <View style={styles.mobileInnerContainer}>
          <Text style={styles.mobileSectionTitle}>Our Instructors</Text>

          {/* Instructor 1: Matvei Stativca */}
          <View style={styles.mobileInstructorBlock}>
            {/* Top Image with bottom fade */}
            <View style={styles.mobileImageWrapper}>
              <Image
                source={require('../../assets/images/matvei-stativca.png')}
                style={styles.mobileInstructorImage}
              />
              <View style={styles.mobileImageBottomFade} />
            </View>

            {/* Name and Logo Row */}
            <View style={styles.mobileHeaderRow}>
              <Text style={styles.instructorName}>Matvei Stativca</Text>
              <View style={styles.logosGroup}>
                <Image source={require('../../assets/images/misia-logo.svg')} style={styles.logoMisia} />
                <Image source={require('../../assets/images/iroa-logo.png')} style={styles.logoIroa} />
              </View>
            </View>

            {/* Badge */}
            <View style={styles.mobileBadgeContainer}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>IPSC + MISIA Regional Director in Moldova</Text>
              </View>
            </View>

            {/* Horizontal Gold Line */}
            <View style={styles.mobileGoldLine} />

            {/* Description Text */}
            <Text style={styles.mobileDescriptionText}>
              Regional Director for IPSC and MISIA Moldova. IROA № 1305. He has provided close protection for two presidents and trained special forces units, in CAT (Centrului Antiterorist al Serviciului de Informații și Securitate al RM).
            </Text>
          </View>

          {/* Instructor 2: Anastasia Stativca */}
          <View style={styles.mobileInstructorBlock}>
            {/* Top Image with bottom fade */}
            <View style={styles.mobileImageWrapper}>
              <Image
                source={require('../../assets/images/anastasia-stativca.png')}
                style={[styles.mobileInstructorImage, styles.mirroredImage]}
              />
              <View style={styles.mobileImageBottomFade} />
            </View>

            {/* Name and Logo Row */}
            <View style={styles.mobileHeaderRow}>
              <Text style={styles.instructorName}>Anastasia Stativca</Text>
              <View style={styles.logosGroup}>
                <Image source={require('../../assets/images/misia-logo.svg')} style={styles.logoMisia} />
              </View>
            </View>

            {/* Badges */}
            <View style={styles.mobileBadgeContainer}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>MISIA trainer</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>11y + IPSC member</Text>
              </View>
            </View>

            {/* Horizontal Gold Line */}
            <View style={styles.mobileGoldLine} />

            {/* Description Text */}
            <Text style={styles.mobileDescriptionText}>
              MISIA trainer, IPSC competitor for 11+ years. Holds a degree in Psychology and Instructor Training. Experienced trainer for elite security and Law Enforcement special units.
            </Text>
          </View>
        </View>
      </View>
    );
  }

  // Desktop layout (unchanged)
  return (
    <View style={styles.innerContainer}>
      <Text style={styles.sectionTitle}>Our Instructors</Text>

      {/* Instructor 1: Matvei Stativca */}
      <View style={styles.instructorRow}>
        <View style={[styles.instructorHeader, { flexDirection: 'row', alignItems: 'center' }]}>
          <View style={styles.nameBadgeGroup}>
            <Text style={styles.instructorName}>Matvei Stativca</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>IPSC + MISIA Regional Director in Moldova</Text>
            </View>
          </View>
          <View style={styles.logosGroup}>
            <Image source={require('../../assets/images/misia-logo.svg')} style={styles.logoMisia} />
            <Image source={require('../../assets/images/iroa-logo.png')} style={styles.logoIroa} />
          </View>
        </View>

        <View style={styles.contentCard}>
          <View style={styles.imageContainer1}>
            <Image
              source={require('../../assets/images/matvei-stativca.png')}
              style={styles.instructorImage}
            />
            <View style={styles.fadeOverlay} />
          </View>

          <View style={[styles.textContent, { width: '60%' }]}>
            <Text style={styles.descriptionText}>
              Regional Director for IPSC and MISIA Moldova. IROA № 1305. He has provided close protection for two presidents and trained special forces units, in CAT (Centrului Antiterorist al Serviciului de Informații și Securitate al RM).
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.divider} />

      {/* Instructor 2: Anastasia Stativca */}
      <View style={styles.instructorRow}>
        <View style={[styles.instructorHeader, { flexDirection: 'row', alignItems: 'center' }]}>
          <View style={styles.nameBadgeGroup}>
            <Text style={styles.instructorName}>Anastasia Stativca</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>MISIA trainer</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>11y + IPSC member</Text>
            </View>
          </View>
          <View style={styles.logosGroup}>
            <Image source={require('../../assets/images/misia-logo.svg')} style={styles.logoMisia} />
          </View>
        </View>

        <View style={styles.contentCard}>
          <View style={styles.imageContainer2}>
            <Image
              source={require('../../assets/images/anastasia-stativca.png')}
              style={[styles.instructorImage2, styles.mirroredImage]}
            />
            <View style={styles.fadeOverlay} />
          </View>

          <View style={[styles.textContent, { width: '60%' }]}>
            <Text style={styles.descriptionText}>
              MISIA trainer, IPSC competitor for 11+ years. Holds a degree in Psychology and Instructor Training. Experienced trainer for elite security and Law Enforcement special units.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
