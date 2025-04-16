// src/screens/LoginScreen.js
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  COLORS,
  FONT_SIZE,
  FONT_WEIGHT,
  BORDER_RADIUS,
  SHADOWS,
  SPACING,
} from '../constants/theme';
import useAuth from '../hook/useAuth';

const LoginScreen = ({navigation}) => {
  const {login} = useAuth();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      const success = await login();

      if (success) {
        // 홈 화면으로 이동 (useAuth 내에서 hasAdditionalInfo를 확인하여 추가 정보 입력 화면으로 이동할 수도 있음)
        navigation.replace('Home');
      } else {
        Alert.alert(
          '로그인 실패',
          '로그인 과정에서 오류가 발생했습니다. 다시 시도해주세요.',
        );
      }
    } catch (error) {
      Alert.alert(
        '로그인 실패',
        '로그인 과정에서 오류가 발생했습니다. 다시 시도해주세요.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={require('../assets/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>버스 운행 관리 시스템</Text>
        <Text style={styles.subtitle}>운전자용</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleLogin}
            disabled={loading}>
            <Image
              source={require('../assets/google-icon.png')}
              style={styles.googleIcon}
            />
            <Text style={styles.googleButtonText}>
              {loading ? '로그인 중...' : 'Google로 로그인'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>
              계정이 없으신가요? 회원가입
            </Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.grey,
    marginBottom: SPACING.xxxl,
  },
  buttonContainer: {
    width: '100%',
    marginTop: SPACING.lg,
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
  signUpButton: {
    marginTop: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  signUpButtonText: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.sm,
    textAlign: 'center',
  },
});

export default LoginScreen;
