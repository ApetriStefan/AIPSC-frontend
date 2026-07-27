// frontend/src/components/RegisterDrawer.js
import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
  useWindowDimensions,
  Platform,
  ScrollView,
  PanResponder,
} from 'react-native';
import { styles } from '../styles/RegisterDrawer.styles';

const API_BASE_URL = 'http://localhost:8000'; // Update this to your production API url when deployed

export function RegisterDrawer({ visible, onClose, onOpenPolicy }) {
  const { width, height } = useWindowDimensions();
  const isDesktop = width >= 900;
  const drawerWidth = isDesktop ? width * 0.8 : width;

  // Mobile bottom-sheet: settled position = 80% of screen height from top
  const SETTLED_TOP = height * 0.2; // drawer top = 20% from top = 80% visible
  const FULL_TOP = 0;               // fully expanded
  const CLOSE_THRESHOLD = height * 0.6; // if dragged below 60% from top, close

  // Form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(45);
  const [experience, setExperience] = useState(2);
  const [equipment, setEquipment] = useState('Airsoft or real gun?');
  const [accommodation, setAccommodation] = useState(null);

  // Dropdown state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null);

  // Network & Validation states
  const [validationActive, setValidationActive] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Desktop: horizontal slide animation
  const slideAnimX = useRef(new Animated.Value(width)).current;

  // Mobile: vertical slide animation (translateY from off-screen bottom)
  const slideAnimY = useRef(new Animated.Value(height)).current;

  // Mobile pan position tracker
  const panY = useRef(0);

  useEffect(() => {
    if (isDesktop) {
      const targetValue = visible ? 0 : drawerWidth;
      Animated.timing(slideAnimX, {
        toValue: targetValue,
        duration: 350,
        useNativeDriver: true,
      }).start();
    } else {
      // Mobile bottom-sheet: slide up to settled position
      const targetValue = visible ? SETTLED_TOP : height;
      Animated.timing(slideAnimY, {
        toValue: targetValue,
        duration: 380,
        useNativeDriver: false, // need non-native for top positioning
      }).start();
    }
  }, [visible, width, height, isDesktop]);

  // Mobile pan responder for drag handle
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        slideAnimY.stopAnimation((currentValue) => {
          panY.current = currentValue;
        });
      },
      onPanResponderMove: (_, gestureState) => {
        const newY = Math.max(FULL_TOP, panY.current + gestureState.dy);
        slideAnimY.setValue(newY);
      },
      onPanResponderRelease: (_, gestureState) => {
        const releaseY = panY.current + gestureState.dy;
        if (releaseY > CLOSE_THRESHOLD) {
          // Drag down past threshold → close
          Animated.timing(slideAnimY, {
            toValue: height,
            duration: 280,
            useNativeDriver: false,
          }).start(() => onClose());
        } else if (gestureState.dy < -80) {
          // Fast upward flick → expand to full
          Animated.spring(slideAnimY, {
            toValue: FULL_TOP,
            useNativeDriver: false,
            bounciness: 3,
          }).start();
        } else {
          // Otherwise snap back to 80% settled position
          Animated.spring(slideAnimY, {
            toValue: SETTLED_TOP,
            useNativeDriver: false,
            bounciness: 3,
          }).start();
        }
      },
    })
  ).current;

  const isEmailValid = () => {
    return email.includes('@') && email.includes('.');
  };

  const handleAgeChange = (val) => {
    const cleaned = val.replace(/[^0-9]/g, '');
    setAge(cleaned === '' ? '' : parseInt(cleaned, 10));
  };

  const handleExperienceChange = (val) => {
    const cleaned = val.replace(/[^0-9]/g, '');
    setExperience(cleaned === '' ? '' : parseInt(cleaned, 10));
  };

  const incrementAge = () => {
    const currentAge = age === '' ? 18 : Number(age);
    setAge(currentAge + 1);
  };

  const decrementAge = () => {
    const currentAge = age === '' ? 18 : Number(age);
    setAge(Math.max(18, currentAge - 1));
  };

  const incrementExperience = () => {
    const currentExp = experience === '' ? 0 : Number(experience);
    setExperience(currentExp + 1);
  };

  const decrementExperience = () => {
    const currentExp = experience === '' ? 0 : Number(experience);
    setExperience(Math.max(0, currentExp - 1));
  };

  const handleSubmit = async () => {
    setValidationActive(true);
    setErrorMessage('');

    const isEquipmentChosen = equipment && equipment !== 'Airsoft or real gun?';

    if (!firstName || !lastName || !isEmailValid() || accommodation === null || !isEquipmentChosen) {
      return;
    }

    const finalAge = age === '' ? 45 : Number(age);
    const finalExperience = experience === '' ? 2 : Number(experience);

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          age: finalAge,
          experience: finalExperience,
          equipment,
          accommodation,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setErrorMessage(data.detail || 'An unexpected error occurred during registration.');
      }
    } catch (err) {
      setErrorMessage('Unable to reach local server. Check your backend status.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setAge(45);
    setExperience(2);
    setEquipment('Airsoft or real gun?');
    setAccommodation(null);
    setValidationActive(false);
    setSuccess(false);
    setErrorMessage('');
    onClose();
  };

  if (!visible) return null;

  const formContent = success ? (
    <View style={styles.successBlock}>
      <View style={styles.successCenteredContent}>
        <svg xmlns="http://www.w3.org/2000/svg" width="112" height="112" viewBox="0 0 112 112" fill="none">
          <path d="M56 0L69.5493 19.3568C70.1735 20.2485 71.2579 20.6977 72.3298 20.5085L95.598 16.402L91.4915 39.6702C91.3023 40.7421 91.7515 41.8265 92.6432 42.4507L112 56L92.6432 69.5493C91.7515 70.1735 91.3023 71.2579 91.4915 72.3298L95.598 95.598L72.3298 91.4915C71.2579 91.3023 70.1735 91.7515 69.5493 92.6432L56 112L42.4507 92.6432C41.8265 91.7515 40.7421 91.3023 39.6702 91.4915L16.402 95.598L20.5085 72.3298C20.6977 71.2579 20.2485 70.1735 19.3568 69.5493L0 56L19.3568 42.4507C20.2485 41.8265 20.6977 40.7421 20.5085 39.6702L16.402 16.402L39.6702 20.5085C40.7421 20.6977 41.8265 20.2485 42.4507 19.3568L56 0Z" fill="url(#paint0_linear_85_1234)"/>
          <path d="M65.3008 47.6L54.154 62.4624C53.9734 62.7029 53.7432 62.9017 53.4792 63.0456C53.2149 63.1895 52.9231 63.2749 52.6229 63.2962C52.3231 63.3175 52.0221 63.2738 51.7404 63.1688C51.4584 63.0635 51.2028 62.8992 50.99 62.6864L44.3008 56" stroke="#01213B" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
          <defs>
            <linearGradient id="paint0_linear_85_1234" x1="56" y1="0" x2="56" y2="112" gradientUnits="userSpaceOnUse">
              <stop stopColor="#AD9F7A"/>
              <stop offset="1" stopColor="#BA9842"/>
            </linearGradient>
          </defs>
        </svg>

        <Text style={styles.successTitle}>Your registration has been successfully sent!</Text>
        <Text style={styles.successText}>
          Thank you for your interest. We will send you a confirmation email with all the necessary information. We look forward to meeting you!
        </Text>

        <TouchableOpacity style={styles.successHomeBtn} onPress={handleReset}>
          <Text style={styles.successHomeBtnText}>HOME</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.successFooter}>
        <Text style={styles.successFooterLabel}>More info:</Text>
        <Text style={styles.successFooterLink}>contact@aipsc.ro</Text>
        <Text style={styles.successFooterSeparator}>|</Text>
        <Text style={styles.successFooterLink}>Ambassador Program</Text>
      </View>
    </View>
  ) : (
    <ScrollView contentContainerStyle={[styles.scrollForm, !isDesktop && { padding: 24 }]}>
      <View style={styles.headerBadges}>
        <Text style={styles.badgeEvent}>Upcoming event - 24/06/2026</Text>
        <Text style={styles.badgeSeats}>Places left: 10</Text>
      </View>
      <View style={styles.headerLine} />

      <Text style={[styles.mainTitle, !isDesktop && { maxWidth: '100%', fontSize: 26 }]}>
        Register Now - IPSC Safety & Competition Course
      </Text>

      <View style={styles.formGrid}>
        <View style={[styles.formRow, { zIndex: 1 }]}>
          <View style={styles.fieldBlock}>
            <Text style={styles.fieldLabel}>*First Name:</Text>
            <TextInput
              style={[styles.input, validationActive && !firstName && styles.inputError]}
              placeholder="Ciprian"
              placeholderTextColor="#4E6578"
              value={firstName}
              onChangeText={setFirstName}
              editable={!loading}
            />
          </View>

          <View style={styles.fieldBlock}>
            <Text style={styles.fieldLabel}>*Last Name:</Text>
            <TextInput
              style={[styles.input, validationActive && !lastName && styles.inputError]}
              placeholder="Cipri"
              placeholderTextColor="#4E6578"
              value={lastName}
              onChangeText={setLastName}
              editable={!loading}
            />
          </View>

          <View style={styles.fieldBlock}>
            <Text style={styles.fieldLabel}>*E-mail:</Text>
            <TextInput
              style={[styles.input, validationActive && !isEmailValid() && styles.inputError]}
              placeholder="ciprian.cipri@gmail.com"
              placeholderTextColor="#4E6578"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              editable={!loading}
            />
            {validationActive && !isEmailValid() && (
              <Text style={styles.errorText}>This email is incorrect!</Text>
            )}
          </View>

          <View style={[styles.fieldBlock, { flex: 0.6, minWidth: 110 }]}>
            <Text style={styles.fieldLabel}>*Age:</Text>
            <View style={styles.spinnerContainer}>
              <TextInput
                style={styles.spinnerInput}
                keyboardType="numeric"
                value={String(age)}
                onChangeText={handleAgeChange}
                maxLength={3}
                editable={!loading}
              />
              <View style={styles.spinnerArrows}>
                <TouchableOpacity onPress={incrementAge} disabled={loading} style={styles.arrowBtn}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 16 9" fill="none" style={{ transform: 'rotate(180deg)' }}>
                    <path d="M0.75 0.749999L7.75 7.75L14.75 0.75" stroke="#CDD7D6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </TouchableOpacity>
                <TouchableOpacity onPress={decrementAge} disabled={loading} style={styles.arrowBtn}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 16 9" fill="none">
                    <path d="M0.75 0.749999L7.75 7.75L14.75 0.75" stroke="#CDD7D6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.formRow, { zIndex: 10 }]}>
          <View style={[styles.fieldBlock, { flex: 1 }]}>
            <Text style={styles.fieldLabel}>*Years of experience in this sport:</Text>
            <View style={styles.spinnerContainer}>
              <TextInput
                style={styles.spinnerInput}
                keyboardType="numeric"
                value={String(experience)}
                onChangeText={handleExperienceChange}
                maxLength={2}
                editable={!loading}
              />
              <View style={styles.spinnerArrows}>
                <TouchableOpacity onPress={incrementExperience} disabled={loading} style={styles.arrowBtn}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 16 9" fill="none" style={{ transform: 'rotate(180deg)' }}>
                    <path d="M0.75 0.749999L7.75 7.75L14.75 0.75" stroke="#CDD7D6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </TouchableOpacity>
                <TouchableOpacity onPress={decrementExperience} disabled={loading} style={styles.arrowBtn}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 16 9" fill="none">
                    <path d="M0.75 0.749999L7.75 7.75L14.75 0.75" stroke="#CDD7D6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.helpText}>If you don't have any, no problem, we'll teach you ;)</Text>
          </View>

          <View style={[styles.fieldBlock, { flex: 1.5 }]}>
            <Text style={styles.fieldLabel}>*What are you bringing?</Text>
            {(() => {
              const isEquipmentError = validationActive && equipment === 'Airsoft or real gun?';
              return (
                <>
                  <TouchableOpacity
                    style={[
                      styles.dropdownTrigger,
                      isEquipmentError && styles.dropdownTriggerError
                    ]}
                    onPress={() => !loading && setDropdownOpen(!dropdownOpen)}
                    disabled={loading}
                  >
                    <Text style={styles.dropdownTriggerText}>{equipment}</Text>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="9" viewBox="0 0 16 9" fill="none" style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                      <path d="M0.75 0.749999L7.75 7.75L14.75 0.75" stroke="#CDD7D6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </TouchableOpacity>

                  {dropdownOpen && (
                    <View style={styles.dropdownMenu}>
                      {['Airsoft gun', 'Real gun', 'Renting range equipment'].map((item) => (
                        <TouchableOpacity
                          key={item}
                          style={[
                            styles.dropdownItem,
                            hoveredOption === item && styles.dropdownItemHovered
                          ]}
                          onMouseEnter={() => setHoveredOption(item)}
                          onMouseLeave={() => setHoveredOption(null)}
                          onPress={() => {
                            setEquipment(item);
                            setDropdownOpen(false);
                            setHoveredOption(null);
                          }}
                        >
                          <Text style={[
                            styles.dropdownItemText,
                            hoveredOption === item && styles.dropdownItemTextHovered
                          ]}>{item}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}

                  {isEquipmentError && (
                    <Text style={styles.mandatoryError}>It is mandatory to specify!</Text>
                  )}
                </>
              );
            })()}
          </View>
        </View>

        <View style={[styles.formRow, { zIndex: 1 }]}>
          <View style={[styles.fieldBlock, { flex: 1 }]}>
            <Text style={styles.fieldLabel}>*Will you stay at the accommodation we propose?</Text>

            <View style={styles.selectorContainer}>
              <TouchableOpacity
                style={[
                  styles.selectorOption,
                  accommodation === 'YES' && styles.selectorOptionSelected,
                  validationActive && accommodation === null && styles.selectorOptionError
                ]}
                onPress={() => !loading && setAccommodation('YES')}
                disabled={loading}
              >
                <Text style={[
                  styles.selectorOptionText,
                  accommodation === 'YES' && styles.selectorOptionTextSelected
                ]}>YES</Text>
                <View style={[
                  styles.radioCircle,
                  accommodation === 'YES' && styles.radioCircleSelected
                ]} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.selectorOption,
                  accommodation === 'NO' && styles.selectorOptionSelected,
                  validationActive && accommodation === null && styles.selectorOptionError
                ]}
                onPress={() => !loading && setAccommodation('NO')}
                disabled={loading}
              >
                <Text style={[
                  styles.selectorOptionText,
                  accommodation === 'NO' && styles.selectorOptionTextSelected
                ]}>NO</Text>
                <View style={[
                  styles.radioCircle,
                  accommodation === 'NO' && styles.radioCircleSelected
                ]} />
              </TouchableOpacity>
            </View>

            {validationActive && accommodation === null ? (
              <Text style={styles.mandatoryError}>It is mandatory to specify!</Text>
            ) : (
              accommodation === 'YES' && (
                <Text style={styles.accomHelpText}>If yes, we will make an appointment for all 3 days.</Text>
              )
            )}
          </View>
        </View>

      </View>

      {errorMessage ? (
        <Text style={[styles.errorText, { marginTop: 12, textAlign: 'center', fontWeight: '600' }]}>
          Error: {errorMessage}
        </Text>
      ) : null}

      <View style={[styles.formFooter, !isDesktop && styles.mobileFormFooter]}>
        <Text style={[styles.agreementText, !isDesktop && styles.mobileAgreementText]}>
          By submitting your registration, you automatically agree to the{' '}
          <Text style={styles.policyLink} onPress={() => onOpenPolicy('privacy')}>Privacy Policy</Text> &{' '}
          <Text style={styles.policyLink} onPress={() => onOpenPolicy('terms')}>Terms and conditions</Text>.
        </Text>

        <TouchableOpacity
          style={[styles.submitBtn, !isDesktop && styles.mobileSubmitBtn, loading && { opacity: 0.7 }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitBtnText}>
            {loading ? 'SUBMITTING...' : 'SUBMIT'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  // ─── Desktop: slide from right ────────────────────────────────────────────
  if (isDesktop) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        <Animated.View style={[
          styles.drawer,
          { width: drawerWidth, transform: [{ translateX: slideAnimX }] }
        ]}>
          <View style={styles.formContainer}>
            {formContent}
          </View>

          <View style={styles.instructorsSidebar}>
            <View style={styles.sidebarProfile}>
              <Image
                source={require('../../assets/images/anastasia-stativca.png')}
                style={[styles.profileBg, styles.mirroredImage]}
              />
              <View style={styles.profileTintOverlay} />
              <View style={styles.profileGradientOverlay} />

              <View style={styles.profileDetailsContent}>
                <View style={styles.profileHeaderRow}>
                  <Text style={styles.profileName}>Anastasia Stativca</Text>
                  <Image source={require('../../assets/images/misia-logo.svg')} style={styles.profileMisia} />
                </View>

                <View style={styles.profileBadgesGroup}>
                  <View style={styles.miniBadge}><Text style={styles.miniBadgeText}>MISIA trainer</Text></View>
                  <View style={styles.miniBadge}><Text style={styles.miniBadgeText}>11y + IPSC member</Text></View>
                </View>

                <Text style={styles.profileDesc}>
                  Holds a degree in Psychology and Instructor Training. Experienced trainer for elite security and Law Enforcement special units.
                </Text>
              </View>
            </View>

            <View style={styles.sidebarProfile}>
              <Image
                source={require('../../assets/images/matvei-stativca.png')}
                style={styles.profileBgMatvei}
              />
              <View style={styles.profileTintOverlay} />
              <View style={styles.profileGradientOverlay} />

              <View style={styles.profileDetailsContent}>
                <View style={[styles.profileHeaderRow, { alignItems: 'flex-end' }]}>
                  <Text style={[styles.profileName, { paddingBottom: 2 }]}>Matvei Stativca</Text>
                  <View style={{ flexDirection: 'column', gap: 6, alignItems: 'center' }}>
                    <Image source={require('../../assets/images/misia-logo.svg')} style={styles.profileMisia} />
                    <Image source={require('../../assets/images/iroa-logo.png')} style={styles.profileIroa} />
                  </View>
                </View>

                <View style={styles.profileBadgesGroup}>
                  <View style={styles.miniBadge}>
                    <Text style={styles.miniBadgeText}>IPSC + MISIA Regional Director in Moldova</Text>
                  </View>
                </View>

                <Text style={styles.profileDesc}>
                  IROA № 1305. He has provided close protection for two presidents and trained special forces units, in CAT (Centrului Antiterorist al Serviciului de Informații și Securitate al RM).
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </View>
    );
  }

  // ─── Mobile: slide up from bottom ─────────────────────────────────────────
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}
      />

      <Animated.View style={[
        styles.mobileDrawer,
        { top: slideAnimY }
      ]}>
        {/* Drag Handle */}
        <View style={styles.dragHandleArea} {...panResponder.panHandlers}>
          <View style={styles.dragHandleBar} />
        </View>

        <View style={[styles.formContainer, { flex: 1 }]}>
          {formContent}
        </View>
      </Animated.View>
    </View>
  );
}
