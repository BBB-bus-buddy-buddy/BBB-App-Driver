// src/screens/LoginScreen.js
import React, {use, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Platform,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useUser} from '../context/UserContext';

const LoginScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const {userInfo, setUserInfo} = useUser();

  // 서버 URL 설정
  const BASE_URL = 'http://10.37.129.2:8088';
  const API_URL = `${BASE_URL}/oauth2/authorization/google`; // 백엔드 엔드포인트

  // Google Sign-In 초기화
  useEffect(() => {
    // Google Sign In 설정
    GoogleSignin.configure({
      iosClientId:
        '593673713824-avl2v8e5baa7rpprvi0mpc1lvmjhfqjf.apps.googleusercontent.com',
      androidId: '',
      webClientId:
        '593673713824-ghhrvtlktaik59u1ei8nphlp1ptdprhc.apps.googleusercontent.com',
      offlineAccess: true,
    });

    // 앱 시작 시 로그인 상태 확인
    checkLoginStatus();
  }, []);

  // 테스트 로그인 핸들러
  const testGoogleSignInHandler = async () => {
    try {
      setLoading(true);

      // Google Play 서비스 확인
      await GoogleSignin.hasPlayServices();

      // 기존 로그인 상태 클리어
      await GoogleSignin.signOut();

      // Google 로그인 실행
      const res = await GoogleSignin.signIn();
      if (res.type == 'success') { // 요청이 성공적이라면

        // 백엔드 통신 없이 모의 토큰 생성
        const mockToken = 'test_token_' + Date.now();
        await AsyncStorage.setItem('token', mockToken);

        // 사용자 정보 저장
        const mockUserInfo = {
          id: '213c4',
          name: res.data.name,
          email: res.data.email,
          organizationId: 'Uasidnw',
          role: 'DRIVER',
        };
        setUserInfo(mockUserInfo);

        console.log(`사용자 정보 ${JSON.stringify(mockUserInfo)}`);

        await AsyncStorage.setItem('userInfo', JSON.stringify(mockUserInfo)); // 사용자 정보를 context에 저장하는데 이게 필요한가? 필요하다면 어디에 쓰이는가?

        // 홈 화면으로 이동
        navigation.replace('Home');
      }
    } catch (error) {
      console.error('Google 로그인 오류:', error);

      // 오류 처리
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('알림', '로그인이 취소되었습니다.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('알림', '로그인이 이미 진행 중입니다.');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('오류', 'Google Play 서비스를 사용할 수 없습니다.');
      } else {
        Alert.alert(
          '로그인 실패',
          error.message || '알 수 없는 오류가 발생했습니다.',
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // 초기 토큰 체크 및 라우팅
  const checkLoginStatus = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');

      if (token) {
        await fetchUserRoleAndNavigate(token);
      }
    } catch (error) {
      console.error('토큰 확인 오류: ', error);
      await AsyncStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  // 사용자 역할 확인 및 화면 이동
  const fetchUserRoleAndNavigate = async token => {
    try {
      const response = await axios.get(`${BASE_URL}/api/auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10초 타임아웃
      });
      console.log('응답 성공:', response.data);
      const role = response.data.data.role;
      if (role === 'DRIVER') {
        navigation.navigate('HOME');
      } else {
        await AsyncStorage.removeItem('token');
        Alert.alert('접근 권한 없음', '운전자만 접근할 수 있는 앱입니다.');
      }
    } catch (error) {
      console.error('역할 확인 오류:', error);
      await AsyncStorage.removeItem('token');
      throw error;
    }
  };

  // Google 로그인 처리
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);

      // 기존 로그인 상태 확인 및 초기화
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut(); // 기존 로그인 세션 클리어

      // 로그인 진행
      const userInfo = await GoogleSignin.signIn();
      console.log(JSON.stringify(userInfo));
      setUserInfo(userInfo);

      // 토큰 정보 추출
      const {idToken} = userInfo;

      // 백엔드로 idToken 전송하여 자체 토큰 발급
      const response = await axios.post(
        API_URL,
        {idToken},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      // 서버에서 발급받은 토큰 저장
      const serverToken = response.data.data.token;
      await AsyncStorage.setItem('token', serverToken);

      // 사용자 정보와 역할 확인
      await fetchUserRoleAndNavigate(serverToken);
    } catch (error) {
      console.error('Google 로그인 오류:', error);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('로그인이 취소되었습니다');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('로그인이 이미 진행 중입니다');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('오류', 'Google Play 서비스를 사용할 수 없습니다.');
      } else {
        Alert.alert('로그인 실패', '로그인 처리 중 오류가 발생했습니다.');
      }
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
            onPress={handleGoogleSignIn}
            disabled={loading}>
            <Image
              source={require('../assets/google-icon.png')}
              style={styles.googleIcon}
            />
            <Text style={styles.googleButtonText}>
              {loading ? '로그인 중...' : 'Google로 로그인'}
            </Text>
          </TouchableOpacity>

          {/* 테스트 로그인 버튼 */}
          <TouchableOpacity
            style={[
              styles.googleButton,
              {backgroundColor: '#f5f5f5', marginTop: 10},
            ]}
            onPress={testGoogleSignInHandler}
            disabled={loading}>
            <Text style={styles.googleButtonText}>
              테스트 로그인 (백엔드 통신 X)
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
  googleSignInButton: {
    width: '100%',
    height: 48,
    marginBottom: SPACING.md,
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
