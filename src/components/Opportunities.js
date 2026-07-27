// src/components/Opportunities.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, useWindowDimensions, Platform } from 'react-native';
import { styles } from '../styles/Opportunities.styles';

export default function Opportunities() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  // Track active interactive state for Card 2: 'none' | 'iroa' | 'misia'
  const [activePathway, setActivePathway] = useState('none');

  const handlePressIroa = () => {
    setActivePathway(prev => (prev === 'iroa' ? 'none' : 'iroa'));
  };

  const handlePressMisia = () => {
    setActivePathway(prev => (prev === 'misia' ? 'none' : 'misia'));
  };

  // Safe comma-separated responsive backgrounds
  const getRow1Bg = () => {
    if (Platform.OS === 'web') {
      return {
        backgroundImage: `linear-gradient(90deg, #CDD7D6 25%, rgba(205, 215, 214, 0.00) 65%), url(${require('../../assets/images/shooting-man-2.svg')})`,
        backgroundPosition: 'left center, right center',
        backgroundSize: '100% 100%, contain',
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundColor: '#CDD7D6',
      };
    }
    return { backgroundColor: '#CDD7D6' };
  };

  const getRow2Bg = () => {
    if (Platform.OS !== 'web' || activePathway === 'none') {
      return { backgroundColor: '#CDD7D6' };
    }

    if (activePathway === 'misia') {
      return {
        backgroundImage: `linear-gradient(90deg, #CDD7D6 30%, rgba(205, 215, 214, 0.00) 70%), url(${require('../../assets/images/shooting-man-4.png')})`,
        backgroundPosition: 'left center, right top',
        backgroundSize: '100% 100%, auto 120%',
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundColor: '#CDD7D6',
      };
    }

    // activePathway === 'iroa'
    return {
      backgroundImage: `linear-gradient(90deg, #CDD7D6 45%, rgba(205, 215, 214, 0.00) 80%), url(${require('../../assets/images/shooting-man-3.png')})`,
      backgroundPosition: 'left center, right center',
      backgroundSize: '100% 100%, cover',
      backgroundRepeat: 'no-repeat, no-repeat',
      backgroundColor: '#CDD7D6',
    };
  };

  if (!isDesktop) {
    return (
      <View style={styles.mobileSectionContainer}>
        {/* Gold vertical line aligning with Costs section */}
        <View style={styles.mobileVerticalBorder} />

        <View style={styles.mobileInnerContainer}>
          <Text style={styles.mobileTitle}>Opportunities after the course:</Text>

          <View style={styles.mobileOpportunitiesGrid}>
            {/* Card 1: Become an IPSC & AIPSC member */}
            <TouchableOpacity
              style={styles.mobileCard1Container}
              activeOpacity={0.9}
            >
              <View style={styles.mobileCard1Header}>
                <Image
                  source={require('../../assets/images/ipsc-logo.svg')}
                  style={styles.mobileIpscShieldLogo}
                />
                <Text style={styles.mobileBadgeTextLink}>
                  Become an IPSC & AIPSC member
                </Text>
                <Image
                  source={require('../../assets/images/arrow-top-right-corner.svg')}
                  style={styles.mobileBadgeTextArrow}
                />
              </View>

              {Platform.OS === 'web' ? (
                <View style={[styles.mobileCard1BottomImage, {
                  backgroundImage: `url(${require('../../assets/images/shooting-man-2.svg')})`,
                  backgroundSize: 'cover',
                  backgroundPosition: '80% center',
                  backgroundRepeat: 'no-repeat',
                }]} />
              ) : (
                <Image
                  source={require('../../assets/images/shooting-man-2.svg')}
                  style={styles.mobileCard1BottomImageNative}
                />
              )}
            </TouchableOpacity>

            {/* Card 2: Pathway to become */}
            <View style={[styles.mobileCard2Container, getRow2Bg()]}>
              {activePathway === 'none' && (
                <Image
                  source={require('../../assets/images/logo-grey.svg')}
                  style={styles.mobileLogoGreyWatermark}
                />
              )}
              <View style={styles.mobileCardContent}>
                {/* Header row: Logo + Pathway to become text */}
                <View style={styles.mobileCard2Header}>
                  <Image
                    source={
                      activePathway === 'iroa'
                        ? require('../../assets/images/iroa-logo.png')
                        : activePathway === 'misia'
                        ? require('../../assets/images/misia-logo.svg')
                        : require('../../assets/images/frame.svg')
                    }
                    style={
                      activePathway === 'iroa'
                        ? styles.mobileIroaHeaderLogo
                        : activePathway === 'misia'
                        ? styles.mobileMisiaHeaderLogo
                        : styles.mobileFrameHeaderLogo
                    }
                  />
                  <Text style={styles.mobilePathwayTextLabel}>
                    Pathway to become:
                  </Text>
                </View>

                {/* Stacked button column */}
                <View style={styles.mobileButtonGroupColumn}>
                  <TouchableOpacity
                    style={[
                      styles.mobilePathwayBtn,
                      activePathway === 'iroa' && styles.mobilePathwayBtnActive
                    ]}
                    onPress={handlePressIroa}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.mobilePathwayBtnText}>IROA member</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.mobilePathwayBtn,
                      activePathway === 'misia' && styles.mobilePathwayBtnActive
                    ]}
                    onPress={handlePressMisia}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.mobilePathwayBtnText}>MISIA instructor</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

        <Text style={styles.mobileDescription}>
          By participating in this IPSC Basic Course, you will not only gain solid shooting skills, but you will also be able to officially enter the entire IPSC ecosystem should you choose to do so.
        </Text>

        {/* Custom Quote Layout */}
        <View style={styles.mobileQuoteBlock}>
          <View style={styles.mobileQuoteInnerBorder}>
            
            <View style={styles.mobileQuoteLogoTop}>
              <Image source={require('../../assets/images/logo-bg.svg')} style={styles.mobileOppLogo} />
            </View>

            <View style={styles.mobileQuoteContent}>
              {/* Opening quotes */}
              <View style={{ alignSelf: 'flex-start', marginBottom: 8 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="20" viewBox="0 0 42 26" fill="none">
                  <path d="M41.6191 0.25C40.4879 2.8529 39.3244 5.61424 38.1299 8.53418C36.8823 11.5839 35.6695 14.5644 34.4912 17.4756L34.4902 17.4785C33.406 20.257 32.4548 22.838 31.6348 25.2207H20.6553L20.333 24.3369C21.4296 21.8757 22.6952 19.2788 24.1299 16.5459C25.6527 13.7771 27.28 10.9733 29.0107 8.13477C30.7159 5.33828 32.3542 2.71023 33.9248 0.25H41.6191ZM21.4502 0.25C20.5961 2.21992 19.7118 4.25222 18.7959 6.3457L18.793 6.35156C17.8917 8.57018 16.9902 10.8235 16.0889 13.1113L16.0879 13.1152C15.2568 15.3314 14.4257 17.4782 13.5947 19.5557C12.7876 21.5734 12.0789 23.4621 11.4668 25.2207H0.50293L0.264648 24.3477C1.36281 21.8821 2.63078 19.2802 4.06836 16.542C5.52129 13.7745 7.07758 10.9719 8.73828 8.13477C10.4435 5.33828 12.0818 2.71023 13.6523 0.25H21.4502Z" fill="white" stroke="#02213A" strokeWidth="0.5"/>
                </svg>
              </View>

              <Text style={styles.mobileQuoteTextItalic}>
                Sport can justify its presence in society through being an educational and training tool, for personal and social development and entrepreneurship, of extraordinary power. (IPSC Code of Ethics, 2021, p.2).
              </Text>

              <Text style={styles.mobileQuoteTextItalic}>
                Those who demonstrate dedication and involvement will be recognized and supported by the community.
              </Text>

              {/* Closing quotes */}
              <View style={styles.mobileClosingQuotes}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="20" viewBox="0 0 42 26" fill="none" style={{ transform: 'rotate(180deg)' }}>
                  <path d="M41.6191 0.25C40.4879 2.8529 39.3244 5.61424 38.1299 8.53418C36.8823 11.5839 35.6695 14.5644 34.4912 17.4756L34.4902 17.4785C33.406 20.257 32.4548 22.838 31.6348 25.2207H20.6553L20.333 24.3369C21.4296 21.8757 22.6952 19.2788 24.1299 16.5459C25.6527 13.7771 27.28 10.9733 29.0107 8.13477C30.7159 5.33828 32.3542 2.71023 33.9248 0.25H41.6191ZM21.4502 0.25C20.5961 2.21992 19.7118 4.25222 18.7959 6.3457L18.793 6.35156C17.8917 8.57018 16.9902 10.8235 16.0889 13.1113L16.0879 13.1152C15.2568 15.3314 14.4257 17.4782 13.5947 19.5557C12.7876 21.5734 12.0789 23.4621 11.4668 25.2207H0.50293L0.264648 24.3477C1.36281 21.8821 2.63078 19.2802 4.06836 16.542C5.52129 13.7745 7.07758 10.9719 8.73828 8.13477C10.4435 5.33828 12.0818 2.71023 13.6523 0.25H21.4502Z" fill="white" stroke="#02213A" strokeWidth="0.5"/>
                </svg>
              </View>
            </View>
          </View>
        </View>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.sectionContainer, { flexDirection: isDesktop ? 'row' : 'column' }]}>

      {/* Empty Left Column (Desktop Only) */}
      {isDesktop && (
        <View style={styles.leftColumn} />
      )}

      {/* Main Content Column */}
      <View style={[styles.mainColumn, { paddingLeft: isDesktop ? 40 : 0 }]}>
        <Text style={styles.title}>Opportunities after the course:</Text>

        <View style={styles.opportunitiesGrid}>

          {/* Row 1: Become an IPSC & AIPSC member */}
          <TouchableOpacity
            style={[
              styles.rowContainer,
              getRow1Bg(),
              { flexDirection: isDesktop ? 'row' : 'column', alignItems: isDesktop ? 'center' : 'stretch' }
            ]}
            activeOpacity={0.9}
          >
            <View style={[
              styles.rowLeftBox,
              { borderRightWidth: isDesktop ? 1.5 : 0, borderBottomWidth: isDesktop ? 0 : 1.5 }
            ]}>
              <Image
                source={require('../../assets/images/ipsc-logo.svg')}
                style={styles.ipscShieldLogo}
              />
            </View>

            <View style={styles.rowRightContent}>
              <Text style={styles.badgeTextLink}>
                Become an IPSC & AIPSC member
              </Text>
              <Image
                source={require('../../assets/images/arrow-top-right-corner.svg')}
                style={styles.badgeTextArrow}
              />
            </View>
          </TouchableOpacity>

          {/* Row 2: Pathway to become (Interactive Selection Card) */}
          <View style={[
            styles.rowContainer,
            getRow2Bg(),
            { flexDirection: isDesktop ? 'row' : 'column', alignItems: isDesktop ? 'center' : 'stretch', position: 'relative' }
          ]}>
            <View style={[
              styles.rowLeftBox,
              { borderRightWidth: isDesktop ? 1.5 : 0, borderBottomWidth: isDesktop ? 0 : 1.5 }
            ]}>
              {activePathway === 'iroa' ? (
                <Image
                  source={require('../../assets/images/iroa-logo.png')}
                  style={styles.iroaLeftLogo}
                />
              ) : activePathway === 'misia' ? (
                <Image
                  source={require('../../assets/images/misia-logo.svg')}
                  style={styles.misiaLeftLogo}
                />
              ) : (
                <Image
                  source={require('../../assets/images/frame.svg')}
                  style={styles.frameLeftLogo}
                />
              )}
            </View>

            <View style={[
              styles.rowRightContent,
              {
                flexDirection: isDesktop ? 'row' : 'column',
                gap: 16,
                alignItems: isDesktop ? 'center' : 'flex-start'
              }
            ]}>
              <Text style={styles.pathwayTextLabel}>
                Pathway to become:
              </Text>

              <View style={styles.buttonGroupRow}>
                <TouchableOpacity
                  style={[
                    styles.pathwayBtn,
                    activePathway === 'iroa' && styles.pathwayBtnActive
                  ]}
                  onMouseEnter={() => setActivePathway('iroa')}
                  onMouseLeave={() => setActivePathway('none')}
                  activeOpacity={0.85}
                >
                  <Text style={styles.pathwayBtnText}>IROA member</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.pathwayBtn,
                    activePathway === 'misia' && styles.pathwayBtnActive
                  ]}
                  onMouseEnter={() => setActivePathway('misia')}
                  onMouseLeave={() => setActivePathway('none')}
                  activeOpacity={0.85}
                >
                  <Text style={styles.pathwayBtnText}>MISIA instructor</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </View>

        <Text style={styles.description}>
          By participating in this IPSC Basic Course, you will not only gain solid shooting skills, but you will also be able to officially enter the entire IPSC ecosystem should you choose to do so.
        </Text>

        {/* Custom Quote Layout */}
        <View style={styles.quoteBlock}>
          <View style={[styles.quoteInnerBorder, { flexDirection: isDesktop ? 'row' : 'column' }]}>

            {/* Mobile: logo at top, centered */}
            {!isDesktop && (
              <View style={styles.mobileQuoteLogoTop}>
                <Image source={require('../../assets/images/logo-bg.svg')} style={styles.mobileOppLogo} />
              </View>
            )}

            <View style={[
              styles.quoteLeftCol,
              { borderRightWidth: isDesktop ? 1 : 0, borderBottomWidth: 0 }
            ]}>
              {/* Opening quotes */}
              <svg xmlns="http://www.w3.org/2000/svg" width="42" height="26" viewBox="0 0 42 26" fill="none">
                <path d="M41.6191 0.25C40.4879 2.8529 39.3244 5.61424 38.1299 8.53418C36.8823 11.5839 35.6695 14.5644 34.4912 17.4756L34.4902 17.4785C33.406 20.257 32.4548 22.838 31.6348 25.2207H20.6553L20.333 24.3369C21.4296 21.8757 22.6952 19.2788 24.1299 16.5459C25.6527 13.7771 27.28 10.9733 29.0107 8.13477C30.7159 5.33828 32.3542 2.71023 33.9248 0.25H41.6191ZM21.4502 0.25C20.5961 2.21992 19.7118 4.25222 18.7959 6.3457L18.793 6.35156C17.8917 8.57018 16.9902 10.8235 16.0889 13.1113L16.0879 13.1152C15.2568 15.3314 14.4257 17.4782 13.5947 19.5557C12.7876 21.5734 12.0789 23.4621 11.4668 25.2207H0.50293L0.264648 24.3477C1.36281 21.8821 2.63078 19.2802 4.06836 16.542C5.52129 13.7745 7.07758 10.9719 8.73828 8.13477C10.4435 5.33828 12.0818 2.71023 13.6523 0.25H21.4502Z" fill="white" stroke="#02213A" strokeWidth="0.5"/>
              </svg>

              <Text style={styles.quoteTextItalic}>
                Sport can justify its presence in society through being an educational and training tool, for personal and social development and entrepreneurship, of extraordinary power. (IPSC Code of Ethics, 2021, p.2).
              </Text>

              <Text style={styles.quoteTextItalic}>
                Those who demonstrate dedication and involvement will be recognized and supported by the community.
              </Text>

              {/* Mobile: closing quotes at bottom right */}
              {!isDesktop && (
                <View style={styles.mobileClosingQuotes}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="42" height="26" viewBox="0 0 42 26" fill="none" style={{ transform: 'rotate(180deg)' }}>
                    <path d="M41.6191 0.25C40.4879 2.8529 39.3244 5.61424 38.1299 8.53418C36.8823 11.5839 35.6695 14.5644 34.4912 17.4756L34.4902 17.4785C33.406 20.257 32.4548 22.838 31.6348 25.2207H20.6553L20.333 24.3369C21.4296 21.8757 22.6952 19.2788 24.1299 16.5459C25.6527 13.7771 27.28 10.9733 29.0107 8.13477C30.7159 5.33828 32.3542 2.71023 33.9248 0.25H41.6191ZM21.4502 0.25C20.5961 2.21992 19.7118 4.25222 18.7959 6.3457L18.793 6.35156C17.8917 8.57018 16.9902 10.8235 16.0889 13.1113L16.0879 13.1152C15.2568 15.3314 14.4257 17.4782 13.5947 19.5557C12.7876 21.5734 12.0789 23.4621 11.4668 25.2207H0.50293L0.264648 24.3477C1.36281 21.8821 2.63078 19.2802 4.06836 16.542C5.52129 13.7745 7.07758 10.9719 8.73828 8.13477C10.4435 5.33828 12.0818 2.71023 13.6523 0.25H21.4502Z" fill="white" stroke="#02213A" strokeWidth="0.5"/>
                  </svg>
                </View>
              )}
            </View>

            {/* Desktop: logo in right column */}
            {isDesktop && (
              <View style={styles.quoteRightCol}>
                <Image source={require('../../assets/images/logo-bg.svg')} style={styles.oppLogo} />
              </View>
            )}

          </View>
        </View>

      </View>

    </View>
  );
}
