// src/utils/auth.js
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 사용자 로그인 상태 확인
 * @returns {Promise<boolean>} 로그인 상태
 */
export const isLoggedIn = async () => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    return !!userToken;
  } catch (error) {
    console.error('Error checking login status:', error);
    return false;
  }
};

/**
 * 로그아웃 처리
 * @returns {Promise<boolean>} 로그아웃 성공 여부
 */
export const logout = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
    return true;
  } catch (error) {
    console.error('Error during logout:', error);
    return false;
  }
};

/**
 * 사용자 정보 가져오기
 * @returns {Promise<Object|null>} 사용자 정보
 */
export const getUserInfo = async () => {
  try {
    const userInfoString = await AsyncStorage.getItem('userAdditionalInfo');
    return userInfoString ? JSON.parse(userInfoString) : null;
  } catch (error) {
    console.error('Error getting user info:', error);
    return null;
  }
};

/**
 * 사용자 정보 저장하기
 * @param {Object} userInfo - 사용자 정보
 * @returns {Promise<boolean>} 저장 성공 여부
 */
export const saveUserInfo = async (userInfo) => {
  try {
    await AsyncStorage.setItem('userAdditionalInfo', JSON.stringify(userInfo));
    return true;
  } catch (error) {
    console.error('Error saving user info:', error);
    return false;
  }
};

/**
 * 구글 로그인 처리 (실제 구현은 백엔드 연동 필요)
 * @returns {Promise<string|null>} 로그인 성공 시 토큰, 실패 시 null
 */
export const googleLogin = async () => {
  try {
    // TODO: 실제 구글 로그인 로직 구현
    // 이 부분은 실제로는 react-native-google-signin 등의 라이브러리를 사용해야 함
    
    // 임시 로직: 로그인 성공으로 가정하고 더미 토큰 반환
    const dummyToken = 'google-dummy-token-' + new Date().getTime();
    await AsyncStorage.setItem('userToken', dummyToken);
    return dummyToken;
  } catch (error) {
    console.error('Error during Google login:', error);
    return null;
  }
};

/**
 * 구글 회원가입 처리 (실제 구현은 백엔드 연동 필요)
 * @returns {Promise<boolean>} 회원가입 성공 여부
 */
export const googleSignUp = async () => {
  try {
    // TODO: 실제 구글 회원가입 로직 구현
    // 이 부분은 실제로는 react-native-google-signin 등의 라이브러리를 사용해야 함
    
    // 임시 로직: 회원가입 성공으로 가정
    return true;
  } catch (error) {
    console.error('Error during Google sign up:', error);
    return false;
  }
};

/**
 * 사용자가 추가 정보를 이미 등록했는지 확인
 * @returns {Promise<boolean>} 추가 정보 등록 여부
 */
export const hasAdditionalInfo = async () => {
  try {
    const userInfo = await getUserInfo();
    // 면허 번호가 등록되어 있으면 추가 정보가 있는 것으로 간주
    return !!userInfo && !!userInfo.licenseNumber;
  } catch (error) {
    console.error('Error checking additional info:', error);
    return false;
  }
};