// src/components/Footer.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, useWindowDimensions, Platform } from 'react-native';
import { styles } from '../styles/Footer.styles';

export default function Footer({ onOpenPolicy, onNavigate, onOpenAmbassador }) {
  const { width, height } = useWindowDimensions();
  const isDesktop = width >= 900;

  const [hoveredLink, setHoveredLink] = useState(null);

  // Calculates exact viewport height minus the header and progress bar heights (83px)
  const containerStyle = isDesktop ? { height: height - 83 } : { minHeight: 700 };

  if (!isDesktop) {
    return (
      <View style={styles.mobileFooterContainer}>
        
        {/* 1. TOP HALF: Ambassador Program V-Flap Section */}
        <View style={styles.mobileAmbassadorSection}>
          
          {/* Background Layer: Responsive Envelope SVG Flap spanning full screen width */}
          <View style={styles.mobileSvgAbsoluteContainer}>
            <svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 1440 680" 
              preserveAspectRatio="none" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: '100%', height: '100%', overflow: 'visible' }}
            >
              <g filter="url(#filter0_d_80_594_mobile)">
                <path 
                  d="M-5 -13H1445L1428.04 35.8389C1425.97 41.7946 1422.08 46.9474 1416.92 50.5657L728.035 665C723.212 668.5 716.788 668.5 711.965 665L23.0803 50.5657C17.9176 46.9474 14.0259 41.7946 11.958 35.8389L-5 -13Z" 
                  fill="url(#paint0_linear_80_594_mobile)"
                />
              </g>
              <defs>
                <filter id="filter0_d_80_594_mobile" x="-13" y="-17" width="1466" height="696.904" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dy="4"/>
                  <feGaussianBlur stdDeviation="4"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0.0352941 0 0 0 0 0.0784314 0 0 0 0 0.0745098 0 0 0 0.25 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_80_594"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_80_594" result="shape"/>
                </filter>
                <linearGradient id="paint0_linear_80_594_mobile" x1="720" y1="-13" x2="720" y2="671" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#D0BC86"/>
                  <stop offset="1" stopColor="#BA9842"/>
                </linearGradient>
              </defs>
            </svg>
          </View>

          {/* Foreground Content inside gold V Flap */}
          <View style={styles.mobileAmbassadorContent}>
            <Text style={styles.mobileAmbassadorTitle}>Ambassador Program</Text>
            <Text style={styles.mobileAmbassadorSubtitle}>Know someone who would enjoy this course?</Text>
            
            <TouchableOpacity style={styles.mobileAmbassadorBtn} onPress={onOpenAmbassador}>
              <Text style={styles.mobileAmbassadorBtnText}>BECOME AN AMBASSADOR</Text>
            </TouchableOpacity>

            {/* Blue Logo nested directly below the button, inside the gold boundaries */}
            <Image source={require('../../assets/images/logo-blue.svg')} style={styles.mobileDvcLogoInside} />
          </View>
        </View>

        {/* 2. MIDDLE AREA: Footer Columns layout */}
        <View style={styles.mobileLowerContentArea}>
          
          <View style={styles.mobileContactsRow}>
            {/* Left Column: Contacts */}
            <View style={styles.mobileColumnContacts}>
              <Text style={styles.mobileColTitleContacts}>Contacts:</Text>
              <Text style={styles.mobileContactTextGold}>contact@aipsc.ro</Text>
            </View>

            {/* Right Column: Stacked Logos */}
            <View style={styles.mobileLogoStack}>
              <Image source={require('../../assets/images/ipsc-logo.svg')} style={styles.mobileFooterLogo} />
              <Image source={require('../../assets/images/misia-logo.svg')} style={styles.mobileFooterLogoMisia} />
            </View>
          </View>

          <View style={styles.mobileMainSection}>
            
            {/* Middle Column: Useful links (all styled with gold text) */}
            <View style={styles.mobileColumnLinks}>
              <Text style={styles.mobileColTitle}>Useful links:</Text>
              <TouchableOpacity 
                style={styles.linkItem}
                onPress={() => onNavigate && onNavigate('instructors')}
                onMouseEnter={() => setHoveredLink('instructors')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <Text style={[styles.mobileLinkTextGold, hoveredLink === 'instructors' && styles.mobileLinkTextGoldHover]}>Introduction</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.linkItem}
                onPress={() => onNavigate && onNavigate('course')}
                onMouseEnter={() => setHoveredLink('course')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <Text style={[styles.mobileLinkTextGold, hoveredLink === 'course' && styles.mobileLinkTextGoldHover]}>What are you learning?</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.linkItem}
                onPress={() => onNavigate && onNavigate('opportunities')}
                onMouseEnter={() => setHoveredLink('opportunities')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <Text style={[styles.mobileLinkTextGold, hoveredLink === 'opportunities' && styles.mobileLinkTextGoldHover]}>Opportunities</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.linkItem}
                onPress={() => onNavigate && onNavigate('costs')}
                onMouseEnter={() => setHoveredLink('costs')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <Text style={[styles.mobileLinkTextGold, hoveredLink === 'costs' && styles.mobileLinkTextGoldHover]}>Costs</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.linkItem}
                onPress={() => onNavigate && onNavigate('schedule')}
                onMouseEnter={() => setHoveredLink('schedule')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <Text style={[styles.mobileLinkTextGold, hoveredLink === 'schedule' && styles.mobileLinkTextGoldHover]}>Schedule</Text>
              </TouchableOpacity>
            </View>

            {/* Right Column: Google Maps Embed */}
            <View style={styles.mobileColumnLocation}>
              <Text style={styles.mobileColTitleLocation}>Location:</Text>
              <View style={styles.mobileMapContainer}>
                {Platform.OS === 'web' ? (
                  <iframe
                    title="Google Maps Location"
                    src="https://maps.google.com/maps?q=Poligon%20de%20Tragere%20Cris%20Salaj,%20Zalau&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0, borderRadius: '8px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <Text style={{ color: 'white' }}>Map view is available on web.</Text>
                )}
              </View>
            </View>
          </View>
        </View>

        {/* 3. BOTTOM BAR: Legal and Copyright metadata */}
        <View style={styles.mobileBottomBar}>
          <Text style={styles.mobileLegalLabel}>Legal:</Text>
          <View style={styles.mobileLegalLinksGroup}>
            <TouchableOpacity onPress={() => onOpenPolicy('privacy')}>
              <Text style={styles.mobileLegalLink}>Privacy Policy</Text>
            </TouchableOpacity>
            <Text style={styles.mobileLegalSeparator}>|</Text>
            <TouchableOpacity onPress={() => onOpenPolicy('terms')}>
              <Text style={styles.mobileLegalLink}>Terms and conditions</Text>
            </TouchableOpacity>
            <Text style={styles.mobileLegalSeparator}>|</Text>
            <TouchableOpacity onPress={() => onOpenPolicy('cookie')}>
              <Text style={styles.mobileLegalLink}>Cookie Policy</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.mobileCopyright}>© Copyright 2026 | Design by OneCreative</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.footerContainer, containerStyle]}>
      
      {/* 1. TOP HALF: Ambassador Program V-Flap Section */}
      <View style={styles.ambassadorSection}>
        
        {/* Background Layer: Responsive Envelope SVG Flap spanning full screen width */}
        <View style={styles.svgAbsoluteContainer}>
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 1440 680" 
            preserveAspectRatio="none" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', height: '100%', overflow: 'visible' }}
          >
            <g filter="url(#filter0_d_80_594)">
              <path 
                d="M-5 -13H1445L1428.04 35.8389C1425.97 41.7946 1422.08 46.9474 1416.92 50.5657L728.035 665C723.212 668.5 716.788 668.5 711.965 665L23.0803 50.5657C17.9176 46.9474 14.0259 41.7946 11.958 35.8389L-5 -13Z" 
                fill="url(#paint0_linear_80_594)"
              />
            </g>
            <defs>
              <filter id="filter0_d_80_594" x="-13" y="-17" width="1466" height="696.904" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="4"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.0352941 0 0 0 0 0.0784314 0 0 0 0 0.0745098 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_80_594"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_80_594" result="shape"/>
              </filter>
              <linearGradient id="paint0_linear_80_594" x1="720" y1="-13" x2="720" y2="671" gradientUnits="userSpaceOnUse">
                <stop stopColor="#D0BC86"/>
                <stop offset="1" stopColor="#BA9842"/>
              </linearGradient>
            </defs>
          </svg>
        </View>

        {/* Foreground Content inside gold V Flap */}
        <View style={styles.ambassadorContent}>
          <Text style={styles.ambassadorTitle}>Ambassador Program</Text>
          <Text style={styles.ambassadorSubtitle}>Know someone who would enjoy this course?</Text>
          
          <TouchableOpacity style={styles.ambassadorBtn} onPress={onOpenAmbassador}>
            <Text style={styles.ambassadorBtnText}>BECOME AN AMBASSADOR</Text>
          </TouchableOpacity>

          {/* Blue Logo nested directly below the button, inside the gold boundaries */}
          <Image source={require('../../assets/images/logo-blue.svg')} style={styles.dvcLogoInside} />
        </View>
      </View>

      {/* 2. MIDDLE AREA: Footer Columns layout */}
      <View style={styles.lowerContentArea}>
        
        {/* Stacked Logos above Contacts */}
        <View style={styles.logoStack}>
          <Image source={require('../../assets/images/ipsc-logo.svg')} style={styles.footerLogo} />
          <Image source={require('../../assets/images/misia-logo.svg')} style={styles.footerLogoMisia} />
        </View>

        <View style={styles.mainSection}>
          
          {/* Left Column: Contacts */}
          <View style={styles.columnContacts}>
            <Text style={styles.colTitleContacts}>Contacts:</Text>
            <Text style={styles.contactTextGold}>contact@aipsc.ro</Text>
          </View>

          {/* Middle Column: Useful links (all styled with gold text) */}
          <View style={styles.columnLinks}>
            <Text style={styles.colTitle}>Useful links:</Text>
            <TouchableOpacity 
              style={styles.linkItem}
              onPress={() => onNavigate && onNavigate('instructors')}
              onMouseEnter={() => setHoveredLink('instructors')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <Text style={[styles.linkTextGold, hoveredLink === 'instructors' && styles.linkTextGoldHover]}>Introduction</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.linkItem}
              onPress={() => onNavigate && onNavigate('course')}
              onMouseEnter={() => setHoveredLink('course')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <Text style={[styles.linkTextGold, hoveredLink === 'course' && styles.linkTextGoldHover]}>What are you learning?</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.linkItem}
              onPress={() => onNavigate && onNavigate('opportunities')}
              onMouseEnter={() => setHoveredLink('opportunities')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <Text style={[styles.linkTextGold, hoveredLink === 'opportunities' && styles.linkTextGoldHover]}>Opportunities</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.linkItem}
              onPress={() => onNavigate && onNavigate('costs')}
              onMouseEnter={() => setHoveredLink('costs')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <Text style={[styles.linkTextGold, hoveredLink === 'costs' && styles.linkTextGoldHover]}>Costs</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.linkItem}
              onPress={() => onNavigate && onNavigate('schedule')}
              onMouseEnter={() => setHoveredLink('schedule')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <Text style={[styles.linkTextGold, hoveredLink === 'schedule' && styles.linkTextGoldHover]}>Schedule</Text>
            </TouchableOpacity>
          </View>

          {/* Right Column: Google Maps Embed */}
          <View style={styles.columnLocation}>
            <Text style={styles.colTitleLocation}>Location:</Text>
            <View style={styles.mapContainer}>
              {Platform.OS === 'web' ? (
                <iframe
                  title="Google Maps Location"
                  src="https://maps.google.com/maps?q=Poligon%20de%20Tragere%20Cris%20Salaj,%20Zalau&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '8px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <Text style={{ color: 'white' }}>Map view is available on web.</Text>
              )}
            </View>
          </View>
        </View>
      </View>

      {/* 3. BOTTOM BAR: Legal and Copyright metadata */}
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