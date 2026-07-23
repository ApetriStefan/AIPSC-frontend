// src/components/Experience.js
import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { styles } from '../styles/Experience.styles';

export default function Experience() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  if (!isDesktop) {
    return (
      <View style={styles.mobileOuterContainer}>
        {/* Vertical gold line aligned with other sections */}
        <View style={styles.mobileVerticalBorder} />

        <View style={styles.mobileInnerContainer}>
          <Text style={styles.mobileMainTitle}>The Experience</Text>
          <Text style={styles.mobileSubtitle}>*Lunch, dinner, and the guided tour are included in the course fee.</Text>
          
          <Text style={styles.mobileBodyText}>
            Thanks to the range’s unique location, this course is designed as a complete experience. Training will be complemented by recreational and social activities as follows:
          </Text>

          {/* Separator */}
          <View style={styles.mobileDivider} />

          {/* Day 1 */}
          <View style={styles.mobileDayRow}>
            <Text style={styles.mobileDayLabel}>Day 1:</Text>
            <Text style={styles.mobileDayDescription}>
              On the first evening we’ll enjoy a traditional barbeque where we grill some nice meat, relax, and socialize. Knowledge and protein go hand in hand!
            </Text>
          </View>

          {/* Separator */}
          <View style={styles.mobileDivider} />

          {/* Day 2 */}
          <View style={styles.mobileDayRow}>
            <Text style={styles.mobileDayLabel}>Day 2:</Text>
            <Text style={styles.mobileDayDescription}>
              On the second day, the schedule includes a guided visit to the historic Porolissum archaeological site (UNESCO), and dinner.
            </Text>
          </View>

          {/* Separator */}
          <View style={styles.mobileDivider} />

          {/* Day 3 */}
          <View style={styles.mobileDayRow}>
            <Text style={styles.mobileDayLabel}>Day 3:</Text>
            <Text style={styles.mobileDayDescription}>
              Award Ceremony, Debrief & Closing
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.innerContainer}>
      <Text style={styles.mainTitle}>The Experience</Text>
      <Text style={styles.subtitle}>*Lunch, dinner, and the guided tour are included in the course fee.</Text>
      
      <Text style={styles.bodyText}>
        Thanks to the range’s unique location, this course is designed as a complete experience. Training will be complemented by recreational and social activities as follows:
      </Text>

      {/* Separator */}
      <View style={styles.divider} />

      {/* Day 1 */}
      <View style={styles.dayRow}>
        <Text style={styles.dayLabel}>Day 1:</Text>
        <Text style={styles.dayDescription}>
          On the first evening we’ll enjoy a traditional barbeque where we grill some nice meat, relax, and socialize. Knowledge and protein go hand in hand!
        </Text>
      </View>

      {/* Separator */}
      <View style={styles.divider} />

      {/* Day 2 */}
      <View style={styles.dayRow}>
        <Text style={styles.dayLabel}>Day 2:</Text>
        <Text style={styles.dayDescription}>
          On the second day, the schedule includes a guided visit to the historic Porolissum archaeological site (UNESCO), and dinner.
        </Text>
      </View>

      {/* Separator */}
      <View style={styles.divider} />

      {/* Day 3 */}
      <View style={styles.dayRow}>
        <Text style={styles.dayLabel}>Day 3:</Text>
        <Text style={styles.dayDescription}>
          Award Ceremony, Debrief & Closing
        </Text>
      </View>
    </View>
  );
}
