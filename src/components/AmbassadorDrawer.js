// frontend/src/components/AmbassadorDrawer.js
import React, { useState, useRef, useEffect } from 'react';
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
import { styles } from '../styles/AmbassadorDrawer.styles';

const API_BASE_URL = 'http://localhost:8000'; // Update this to your production API url when deployed

export function AmbassadorDrawer({ visible, onClose, onOpenPolicy }) {
  const { width, height } = useWindowDimensions();
  const isDesktop = width >= 900;
  const drawerWidth = isDesktop ? width * 0.8 : width;

  // Mobile bottom-sheet snap positions
  const SETTLED_TOP = height * 0.2;
  const FULL_TOP = 0;
  const CLOSE_THRESHOLD = height * 0.6;

  // Form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  // Dynamic referral list state
  const [referralList, setReferralList] = useState([
    { id: Date.now(), firstName: '', lastName: '', email: '' }
  ]);

  // Confirmation delete modal state & animation
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const confirmAnim = useRef(new Animated.Value(0)).current;

  // Network & Validation states
  const [validationActive, setValidationActive] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Desktop: horizontal slide animation
  const slideAnimX = useRef(new Animated.Value(width)).current;
  // Mobile: vertical slide animation
  const slideAnimY = useRef(new Animated.Value(height)).current;

  const panY = useRef(0);
  const referralScrollRef = useRef(null);

  const openConfirmDelete = (id) => {
    setConfirmDeleteId(id);
    confirmAnim.setValue(0);
    Animated.spring(confirmAnim, {
      toValue: 1,
      useNativeDriver: Platform.OS !== 'web',
      tension: 80,
      friction: 8,
    }).start();
  };

  const closeConfirmDelete = () => {
    Animated.timing(confirmAnim, {
      toValue: 0,
      duration: 180,
      useNativeDriver: Platform.OS !== 'web',
    }).start(() => {
      setConfirmDeleteId(null);
    });
  };

  const handleConfirmDelete = () => {
    if (confirmDeleteId !== null) {
      removeReferral(confirmDeleteId);
      closeConfirmDelete();
    }
  };

  useEffect(() => {
    if (isDesktop) {
      const targetValue = visible ? 0 : drawerWidth;
      Animated.timing(slideAnimX, {
        toValue: targetValue,
        duration: 350,
        useNativeDriver: true,
      }).start();
    } else {
      const targetValue = visible ? SETTLED_TOP : height;
      Animated.timing(slideAnimY, {
        toValue: targetValue,
        duration: 380,
        useNativeDriver: false,
      }).start();
    }
  }, [visible, width, height, isDesktop]);

  useEffect(() => {
    if (referralList.length > 1) {
      setTimeout(() => {
        referralScrollRef.current?.scrollToEnd({ animated: true });
      }, 80);
    }
  }, [referralList.length]);

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
          Animated.timing(slideAnimY, {
            toValue: height,
            duration: 280,
            useNativeDriver: false,
          }).start(() => onClose());
        } else if (gestureState.dy < -80) {
          Animated.spring(slideAnimY, {
            toValue: FULL_TOP,
            useNativeDriver: false,
            bounciness: 3,
          }).start();
        } else {
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

  const isReferralListValid = () => {
    return referralList.every(item =>
      item.firstName.trim() !== '' &&
      item.lastName.trim() !== '' &&
      item.email.includes('@') &&
      item.email.includes('.')
    );
  };

  const addReferral = () => {
    if (referralList.length >= 3) return;
    setReferralList(prev => [
      ...prev,
      { id: Date.now(), firstName: '', lastName: '', email: '' }
    ]);
  };

  const removeReferral = (id) => {
    setReferralList(prev => prev.filter(item => item.id !== id));
  };

  const updateReferral = (id, key, value) => {
    setReferralList(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, [key]: value };
      }
      return item;
    }));
  };

  const handleSubmit = async () => {
    setValidationActive(true);
    setErrorMessage('');

    if (!firstName || !lastName || !isEmailValid() || !isReferralListValid()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/ambassador`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          referralList: referralList.map(item => ({
            firstName: item.firstName.trim(),
            lastName: item.lastName.trim(),
            email: item.email.trim(),
          })),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setErrorMessage(data.detail || 'An unexpected error occurred during processing.');
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
    setReferralList([
      { id: Date.now(), firstName: '', lastName: '', email: '' }
    ]);
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

        <Text style={styles.successTitle}>Your Ambassador registration has been successfully sent!</Text>
        <Text style={styles.successText}>
          Thank you for your interest. We will send you a confirmation email with all the necessary information. We look forward to meeting you!
        </Text>

        <TouchableOpacity style={styles.successHomeBtn} onPress={handleReset}>
          <Text style={styles.successHomeBtnText}>HOME</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.successFooter}>
        <Text style={styles.successFooterLabel}>More info:</Text>
        <Text style={styles.successFooterLink}>Examplemail@gmail.com</Text>
        <Text style={styles.successFooterSeparator}>|</Text>
        <Text style={styles.successFooterLink}>+40 725 234 743</Text>
        <Text style={styles.successFooterSeparator}>|</Text>
        <Text style={styles.successFooterLink}>Ambassador Program</Text>
      </View>
    </View>
  ) : (
    <ScrollView contentContainerStyle={[styles.scrollForm, !isDesktop && { padding: 24 }]}>
      <View style={styles.headerBadges}>
        <Text style={styles.badgeEvent}>Ambassador Program</Text>
      </View>
      <View style={styles.headerLine} />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, gap: 16 }}>
        <Text style={[styles.mainTitle, { marginBottom: 0, flex: 1 }, !isDesktop && { maxWidth: '100%', fontSize: 26 }]}>
          Know someone who would enjoy this course?
        </Text>
        <Image
          source={require('../../assets/images/ipsc-logo.svg')}
          style={styles.headerInsignia}
        />
      </View>

      <Text style={styles.instructionsHeading}>If you'd like to bring a friend, here's how it works:</Text>

      <View style={[styles.stepsRow, { flexDirection: isDesktop ? 'row' : 'column' }]}>
        <View style={styles.stepCard}>
          <Text style={styles.stepNum}>1.</Text>
          <Text style={styles.stepText}>Your friend receives 10% off the course fee</Text>
        </View>

        <View style={styles.stepCard}>
          <Text style={styles.stepNum}>2.</Text>
          <Text style={styles.stepText}>
            You receive a 50 EUR credit toward any future Action Air IPSC Romania course or event
          </Text>
        </View>
      </View>
      <Text style={styles.limitSubtext}>You can refer up to 3 new participants. Only new participants qualify.</Text>

      <View style={styles.formGrid}>
        <View style={styles.formRow}>
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
        </View>

        <View style={{ width: '100%', marginTop: 10 }}>
          <Text style={[styles.fieldLabel, { marginBottom: 12 }]}>*Refer your friend(s):</Text>

          <ScrollView
            ref={referralScrollRef}
            style={{ maxHeight: 180 }}
            showsVerticalScrollIndicator={false}
          >
            {referralList.map((item, index) => (
              <View key={item.id} style={{ marginBottom: index === referralList.length - 1 ? 0 : 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <Text style={[styles.fieldLabel, { color: '#8E8E93' }]}>Person #{index + 1}:</Text>
                  {index > 0 && !loading && (
                    <TouchableOpacity onPress={() => openConfirmDelete(item.id)} style={{ padding: 4 }}>
                      <Text style={{ color: '#D93838', fontWeight: 'bold', fontSize: 13 }}>✕ Remove</Text>
                    </TouchableOpacity>
                  )}
                </View>

                <View style={[styles.formRow, { gap: 12 }]}>
                  <View style={[styles.fieldBlock, { flex: 1, minWidth: 120 }]}>
                    <TextInput
                      style={[
                        styles.input,
                        validationActive && !item.firstName && styles.inputError
                      ]}
                      placeholder="First Name"
                      placeholderTextColor="#4E6578"
                      value={item.firstName}
                      onChangeText={(val) => updateReferral(item.id, 'firstName', val)}
                      editable={!loading}
                    />
                  </View>

                  <View style={[styles.fieldBlock, { flex: 1, minWidth: 120 }]}>
                    <TextInput
                      style={[
                        styles.input,
                        validationActive && !item.lastName && styles.inputError
                      ]}
                      placeholder="Last Name"
                      placeholderTextColor="#4E6578"
                      value={item.lastName}
                      onChangeText={(val) => updateReferral(item.id, 'lastName', val)}
                      editable={!loading}
                    />
                  </View>

                  <View style={[styles.fieldBlock, { flex: 1.5, minWidth: 160 }]}>
                    <TextInput
                      style={[
                        styles.input,
                        validationActive && (!item.email || !item.email.includes('@') || !item.email.includes('.')) && styles.inputError
                      ]}
                      placeholder="Email Address"
                      placeholderTextColor="#4E6578"
                      value={item.email}
                      onChangeText={(val) => updateReferral(item.id, 'email', val)}
                      autoCapitalize="none"
                      editable={!loading}
                    />
                  </View>
                </View>
              </View>
            ))}

            {!loading && referralList.length < 3 && (
              <TouchableOpacity
                style={styles.addPersonBtn}
                onPress={addReferral}
              >
                <Text style={styles.addPersonBtnPlus}>+</Text>
                <Text style={styles.addPersonBtnText}>
                  ADD ANOTHER PERSON
                </Text>
              </TouchableOpacity>
            )}
          </ScrollView>

          {validationActive && !isReferralListValid() && (
            <Text style={[styles.errorText, { marginTop: 8 }]}>
              Please fill out all referral fields correctly.
            </Text>
          )}
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

  const confirmDeleteModal = confirmDeleteId !== null ? (
    <View style={styles.confirmOverlay} pointerEvents="box-none">
      <Animated.View style={[styles.confirmBackdrop, { opacity: confirmAnim }]}>
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={closeConfirmDelete}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.confirmModalBox,
          {
            opacity: confirmAnim,
            transform: [
              {
                scale: confirmAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.85, 1],
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.confirmIconWrapper}>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 32 32" fill="none">
            <circle cx="13" cy="8" r="4.5" stroke="white" strokeWidth="2" />
            <path d="M4 23C4 17.5 8 15.5 13 15.5C14.8 15.5 16.4 16 17.7 17" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <circle cx="21" cy="21" r="5" stroke="white" strokeWidth="2" />
            <line x1="18.5" y1="21" x2="23.5" y2="21" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </View>

        <Text style={styles.confirmTitle}>
          Are you sure you want to remove this referred friend?
        </Text>

        <View style={styles.confirmActionRow}>
          <TouchableOpacity
            style={styles.confirmNoBtn}
            onPress={closeConfirmDelete}
            activeOpacity={0.8}
          >
            <Text style={styles.confirmNoBtnText}>NO</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.confirmYesBtn}
            onPress={handleConfirmDelete}
            activeOpacity={0.8}
          >
            <Text style={styles.confirmYesBtnText}>YES</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  ) : null;

  // ─── Desktop: slide from right ─────────────────────────────────────────────
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

          <View style={styles.arbitruSidebar}>
            <Image
              source={require('../../assets/images/arbitru.png')}
              style={styles.sidebarBg}
            />
            <View style={styles.sidebarTintOverlay} />
            <View style={styles.sidebarGradientOverlay} />
          </View>
        </Animated.View>

        {confirmDeleteModal}
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

      {confirmDeleteModal}
    </View>
  );
}
