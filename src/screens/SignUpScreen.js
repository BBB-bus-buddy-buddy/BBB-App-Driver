// src/screens/SignUpScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS, SHADOWS, SPACING } from '../constants/theme';

const SignUpScreen = ({ navigation }) => {
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignUp = async () => {
    setLoading(true);
    
    try {
      const success = await signUp();
      
      if (success) {
        // 회원가입 성공 시 추가 정보 입력 화면으로 이동
        navigation.navigate('AdditionalInfo');
      } else {
        Alert.alert('회원가입 실패', '회원가입 과정에서 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      Alert.alert('회원가입 실패', '회원가입 과정에서 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← 뒤로</Text>
        </TouchableOpacity>
        
        <View style={styles.contentContainer}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>회원가입</Text>
          <Text style={styles.description}>
            버스 운행 관리 시스템 운전자용 앱에 오신 것을 환영합니다. 
            구글 계정으로 빠르게 가입하세요.
          </Text>
          
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleSignUp}
            disabled={loading}
          >
            <Image
              source={require('../assets/google-icon.png')}
              style={styles.googleIcon}
            />
            <Text style={styles.googleButtonText}>
              {loading ? '처리 중...' : 'Google로 회원가입'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLoginPress}
          >
            <Text style={styles.loginButtonText}>이미 계정이 있으신가요? 로그인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    padding: SPACING.lg,
  },
  backButton: {
    paddingVertical: SPACING.sm,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.primary,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZE.xxxl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
    marginBottom: SPACING.lg,
  },
  description: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.grey,
    textAlign: 'center',
    marginBottom: SPACING.xxxl,
    lineHeight: 20,
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.sm,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
    width: '100%',
    ...SHADOWS.small,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: SPACING.sm,
  },
  googleButtonText: {
    color: COLORS.black,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.medium,
  },
  loginButton: {
    marginTop: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  loginButtonText: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.sm,
  },
});

export default SignUpScreen;