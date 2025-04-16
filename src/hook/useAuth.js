// src/hooks/useAuth.js
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as authUtils from '../utils/auth';

/**
 * 인증 관련 커스텀 훅
 * @returns {Object} 인증 관련 상태 및 함수
 */
export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [hasAdditionalInfo, setHasAdditionalInfo] = useState(false);

  // 인증 상태 확인
  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      const loggedIn = await authUtils.isLoggedIn();
      setIsLoggedIn(loggedIn);

      if (loggedIn) {
        const info = await authUtils.getUserInfo();
        setUserInfo(info);
        setHasAdditionalInfo(!!info && !!info.licenseNumber);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 초기 로딩 시 인증 상태 확인
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // 로그인 함수
  const login = async () => {
    setIsLoading(true);
    try {
      const token = await authUtils.googleLogin();
      const success = !!token;
      
      if (success) {
        setIsLoggedIn(true);
        // 추가 정보 확인
        const additionalInfoExists = await authUtils.hasAdditionalInfo();
        setHasAdditionalInfo(additionalInfoExists);
        
        if (additionalInfoExists) {
          const info = await authUtils.getUserInfo();
          setUserInfo(info);
        }
      }
      
      return success;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // 로그아웃 함수
  const logout = async () => {
    setIsLoading(true);
    try {
      const success = await authUtils.logout();
      
      if (success) {
        setIsLoggedIn(false);
        setUserInfo(null);
        setHasAdditionalInfo(false);
      }
      
      return success;
    } catch (error) {
      console.error('Error during logout:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // 회원가입 함수
  const signUp = async () => {
    setIsLoading(true);
    try {
      const success = await authUtils.googleSignUp();
      return success;
    } catch (error) {
      console.error('Error during sign up:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // 추가 정보 저장 함수
  const saveUserAdditionalInfo = async (info) => {
    setIsLoading(true);
    try {
      const success = await authUtils.saveUserInfo(info);
      
      if (success) {
        setUserInfo(info);
        setHasAdditionalInfo(true);
        
        // 로그인 토큰 저장 (실제로는 서버에서 받아와야 함)
        await AsyncStorage.setItem('userToken', 'signup-completed-token');
        setIsLoggedIn(true);
      }
      
      return success;
    } catch (error) {
      console.error('Error saving user info:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoggedIn,
    isLoading,
    hasAdditionalInfo,
    userInfo,
    login,
    logout,
    signUp,
    saveUserAdditionalInfo,
  };
};

export default useAuth;