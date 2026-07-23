// src/components/Schedule.js
import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { styles } from '../styles/Schedule.styles';
import RegisterBanner from './RegisterBanner';

const program = [
  {
    day: "Day 1",
    events: [
      { time: "08:00 – 12:00", description: "IPSC Rules & Safety" },
      { time: "12:00 – 13:00", description: "Lunch" },
      { time: "13:00 – 18:00", description: "Practical Training" },
      { time: "18:00 – 21:00", description: "BBQ + Socializing" }
    ]
  },
  {
    day: "Day 2",
    events: [
      { time: "08:00 – 12:00", description: "Practical Training" },
      { time: "12:00 – 13:00", description: "Lunch" },
      { time: "13:00 – 14:30", description: "Porolissum visit" },
      { time: "14:30 – 19:00", description: "Practical Training" },
      { time: "19:00 – 21:00", description: "Dinner + Socializing" }
    ]
  },
  {
    day: "Day 3",
    events: [
      { time: "10:00 – 13:00", description: "Practical Training (stage planning and practice, complex drills)" },
      { time: "13:00 – 14:00", description: "Lunch" },
      { time: "14:00 – 16:30", description: "Practical Training" },
      { time: "16:30 – 17:30", description: "Award Ceremony, Debrief & Closing" }
    ]
  }
];

export default function Schedule({ onOpenRegister }) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  if (!isDesktop) {
    return (
      <View style={[styles.sectionContainer, { position: 'relative' }]}>
        {/* Golden vertical line aligning with Opportunities section */}
        <View style={styles.mobileVerticalBorder} />

        <View style={styles.mainColumn}>
          <View style={styles.mobileInnerContainer}>
            <View style={styles.mobileTopDivider} />
            <Text style={styles.sectionTitle}>Schedule:</Text>
            <View style={styles.mobileTitleDivider} />

            <View style={styles.timeline}>
              {program.map((dayGroup, i) => (
                <View key={i} style={[styles.dayBlock, { flexDirection: 'column' }]}>
                  <View style={[styles.dayIndicator, { width: '100%', marginBottom: 12 }]}>
                    <Text style={styles.dayLabel}>{dayGroup.day}</Text>
                  </View>
                  <View style={styles.eventList}>
                    {dayGroup.events.map((ev, index) => (
                      <View key={index} style={styles.eventRow}>
                        <Text style={styles.eventTime}>{ev.time}</Text>
                        <Text style={styles.eventSeparator}>|</Text>
                        <Text style={styles.eventDesc}>{ev.description}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>

            {/* Pass the drawer action trigger down to RegisterBanner */}
            <View style={{ marginTop: 64 }}>
              <RegisterBanner onOpenRegister={onOpenRegister} />
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.sectionContainer, { flexDirection: 'row' }]}>
      {/* Empty Left Column (Desktop Only) */}
      <View style={styles.leftColumn} />

      {/* Main Content Column */}
      <View style={styles.mainColumn}>
        <View style={styles.topDivider} />
        <Text style={[styles.sectionTitle, { paddingLeft: 40 }]}>Schedule:</Text>
        <View style={styles.titleDivider} />

        <View style={[styles.timeline, { paddingLeft: 40 }]}>
          {program.map((dayGroup, i) => (
            <View 
              key={i} 
              style={[
                styles.dayBlock, 
                { flexDirection: 'row' }
              ]}
            >
              <View style={styles.dayIndicator}>
                <Text style={styles.dayLabel}>{dayGroup.day}</Text>
              </View>
              <View style={styles.eventList}>
                {dayGroup.events.map((ev, index) => (
                  <View key={index} style={styles.eventRow}>
                    <Text style={styles.eventTime}>{ev.time}</Text>
                    <Text style={styles.eventSeparator}>|</Text>
                    <Text style={styles.eventDesc}>{ev.description}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Pass the drawer action trigger down to RegisterBanner */}
        <View style={{ marginTop: 64, paddingLeft: 40 }}>
          <RegisterBanner onOpenRegister={onOpenRegister} />
        </View>
      </View>
    </View>
  );
}
