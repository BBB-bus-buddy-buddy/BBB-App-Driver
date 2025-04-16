// src/utils/api.js
import AsyncStorage from '@react-native-async-storage/async-storage';

// API URL 설정
const API_URL = 'https://api.busservice.com'; // 실제 API URL로 대체 필요

/**
 * API 요청 기본 함수
 * @param {string} endpoint - API 엔드포인트
 * @param {Object} options - fetch 옵션
 * @returns {Promise<any>} 응답 데이터
 */
export const fetchApi = async (endpoint, options = {}) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    
    const headers = {
      'Content-Type': 'application/json',
      ...(userToken && { Authorization: `Bearer ${userToken}` }),
      ...options.headers,
    };
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || '서버 오류가 발생했습니다.');
    }
    
    return data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

/**
 * 운행 일정 가져오기
 * @returns {Promise<Array>} 운행 일정 목록
 */
export const getDriveSchedules = async () => {
  try {
    // 백엔드 연동 전 임시 로직
    // 실제 구현 시 fetchApi('/schedules') 등으로 대체
    const today = new Date();
    const dummySchedules = [
      {
        id: 1,
        busNumber: '101번',
        route: '서부캠퍼스 - 동부캠퍼스',
        departureTime: `${today.getFullYear()}년 ${String(today.getMonth() + 1).padStart(2, '0')}월 ${String(today.getDate()).padStart(2, '0')}일 18:00`,
        arrivalTime: `${today.getFullYear()}년 ${String(today.getMonth() + 1).padStart(2, '0')}월 ${String(today.getDate()).padStart(2, '0')}일 19:30`,
        isButtonActive: true, // 실제로는 시간 계산 로직 필요
      },
      {
        id: 2,
        busNumber: '201번',
        route: '동부캠퍼스 - 서부캠퍼스',
        departureTime: `${today.getFullYear()}년 ${String(today.getMonth() + 1).padStart(2, '0')}월 ${String(today.getDate()).padStart(2, '0')}일 20:00`,
        arrivalTime: `${today.getFullYear()}년 ${String(today.getMonth() + 1).padStart(2, '0')}월 ${String(today.getDate()).padStart(2, '0')}일 21:30`,
        isButtonActive: false,
      },
    ];
    return dummySchedules;
  } catch (error) {
    console.error('Error fetching drive schedules:', error);
    return [];
  }
};

/**
 * 운행 시작 기록
 * @param {number} driveId - 운행 ID
 * @returns {Promise<boolean>} 성공 여부
 */
export const startDrive = async (driveId) => {
  try {
    // 백엔드 연동 전 임시 로직
    // 실제 구현 시 fetchApi('/drives/start', { method: 'POST', body: JSON.stringify({ driveId }) }) 등으로 대체
    return true;
  } catch (error) {
    console.error('Error starting drive:', error);
    return false;
  }
};

/**
 * 운행 종료 기록
 * @param {number} driveId - 운행 ID
 * @returns {Promise<boolean>} 성공 여부
 */
export const endDrive = async (driveId) => {
  try {
    // 백엔드 연동 전 임시 로직
    // 실제 구현 시 fetchApi('/drives/end', { method: 'POST', body: JSON.stringify({ driveId }) }) 등으로 대체
    return true;
  } catch (error) {
    console.error('Error ending drive:', error);
    return false;
  }
};

/**
 * 날씨 정보 가져오기
 * @returns {Promise<{temp: string, condition: string}>} 날씨 정보
 */
export const getWeatherInfo = async () => {
  try {
    // 백엔드 연동 전 임시 로직
    // 실제 구현 시 fetchApi('/weather') 등으로 대체
    return { temp: '23°C', condition: '맑음' };
  } catch (error) {
    console.error('Error fetching weather:', error);
    return { temp: 'N/A', condition: 'N/A' };
  }
};

/**
 * 알림 목록 가져오기
 * @returns {Promise<Array>} 알림 목록
 */
export const getNotifications = async () => {
  try {
    // 백엔드 연동 전 임시 로직
    // 실제 구현 시 fetchApi('/notifications') 등으로 대체
    return [
      { id: 1, message: '오늘의 운행 일정이 있습니다.', time: '30분 전', unread: true },
      { id: 2, message: '안전 운행 교육이 예정되어 있습니다.', time: '2시간 전', unread: false },
      { id: 3, message: '시스템 정기 점검 안내', time: '어제', unread: true },
      { id: 4, message: '내일 정비소 방문이 예정되어 있습니다.', time: '어제', unread: false },
      { id: 5, message: '급여명세서가 발행되었습니다.', time: '2일 전', unread: false },
    ];
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
};

/**
 * 알림 읽음 상태 업데이트
 * @param {Array<number>} notificationIds - 알림 ID 배열
 * @returns {Promise<boolean>} 성공 여부
 */
export const markNotificationsAsRead = async (notificationIds) => {
  try {
    // 백엔드 연동 전 임시 로직
    // 실제 구현 시 fetchApi('/notifications/read', { method: 'POST', body: JSON.stringify({ notificationIds }) }) 등으로 대체
    return true;
  } catch (error) {
    console.error('Error marking notifications as read:', error);
    return false;
  }
};