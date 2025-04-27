import React, { createContext, useState, ReactNode } from 'react';

type Station = {
    name: string;
    longitude: number;  
    latitude: number;   
  };

type UserInfo = {
  id: string;
  name: string;
  email: string;
  role: string;
  organizationId: string;
  myStations: Station[];
};

// Context 타입 정의
interface UserContextType {
  userInfo: UserInfo;
  setUserInfo: (info: UserInfo) => void;
  updateUserInfo: (info: Partial<UserInfo>) => void;
  resetUserInfo: () => void;
  isLoggedIn: boolean;
}

// 초기 상태 값
const initialUserInfo: UserInfo = {
  id: '',
  name: '',
  email: '',
  role: '',
  organizationId: '',
  myStations: [],
};

// Context 생성
export const UserContext = createContext<UserContextType>({
  userInfo: initialUserInfo,
  setUserInfo: () => {},
  updateUserInfo: () => {},
  resetUserInfo: () => {},
  isLoggedIn: false,
});

// Provider 컴포넌트
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
  
  // 부분 업데이트를 위한 함수
  const updateUserInfo = (info: Partial<UserInfo>) => {
    setUserInfo(prev => ({ ...prev, ...info }));
  };
  
  // 로그아웃 시 초기화를 위한 함수
  const resetUserInfo = () => {
    setUserInfo(initialUserInfo);
  };

  // 로그인 여부 확인
  const isLoggedIn = !!userInfo.id;

  return (
    <UserContext.Provider 
      value={{ 
        userInfo, 
        setUserInfo, 
        updateUserInfo, 
        resetUserInfo,
        isLoggedIn 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// 커스텀 훅으로 사용 편의성 제공
export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};