// src/screens/AdditionalInfoScreen.js
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  COLORS,
  FONT_SIZE,
  FONT_WEIGHT,
  BORDER_RADIUS,
  SPACING,
} from '../constants/theme';
import useAuth from '../hook/useAuth';

const AdditionalInfoScreen = ({navigation}) => {
  const {saveUserAdditionalInfo} = useAuth();
  const [licenseNumber, setLicenseNumber] = useState('');
  const [licenseType, setLicenseType] = useState('');
  const [licenseExpiryDate, setLicenseExpiryDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    if (!licenseNumber.trim()) {
      Alert.alert('입력 오류', '면허 번호를 입력해주세요.');
      return false;
    }
    if (!licenseType.trim()) {
      Alert.alert('입력 오류', '면허 종류를 입력해주세요.');
      return false;
    }
    if (!licenseExpiryDate.trim()) {
      Alert.alert('입력 오류', '면허 만료일을 입력해주세요.');
      return false;
    }
    if (!phoneNumber.trim()) {
      Alert.alert('입력 오류', '전화번호를 입력해주세요.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    setLoading(true);

    try {
      // 추가 정보 저장
      const userInfo = {
        licenseNumber,
        licenseType,
        licenseExpiryDate,
        phoneNumber,
      };

      const success = await saveUserAdditionalInfo(userInfo);

      if (success) {
        // 홈 화면으로 이동
        navigation.replace('Home');
      } else {
        Alert.alert(
          '저장 실패',
          '정보 저장 중 오류가 발생했습니다. 다시 시도해주세요.',
        );
      }
    } catch (error) {
      Alert.alert(
        '저장 실패',
        '정보 저장 중 오류가 발생했습니다. 다시 시도해주세요.',
      );
    } finally {
      setLoading(false);
    }
  };

  const backButton = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* 뒤로가기 */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← 뒤로</Text>
          </TouchableOpacity>
          {/* Header*/}
          <View style={styles.header}>
            <Text style={styles.title}>추가 정보 입력</Text>
            <Text style={styles.subtitle}>면허 정보를 등록해주세요</Text>
          </View>
          {/* 추가정보: 면허: 번호/종류/만료일, 전화번호 */}
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>면허 번호</Text>
              <TextInput
                style={styles.input}
                value={licenseNumber}
                onChangeText={setLicenseNumber}
                placeholder="예: 12-34-567890-01"
                placeholderTextColor={COLORS.lightGrey}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>면허 종류</Text>
              <TextInput
                style={styles.input}
                value={licenseType}
                onChangeText={setLicenseType}
                placeholder="예: 1종 대형"
                placeholderTextColor={COLORS.lightGrey}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>면허 만료일</Text>
              <TextInput
                style={styles.input}
                value={licenseExpiryDate}
                onChangeText={setLicenseExpiryDate}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={COLORS.lightGrey}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>전화번호</Text>
              <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="010-0000-0000"
                placeholderTextColor={COLORS.lightGrey}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={loading}>
            <Text style={styles.submitButtonText}>
              {loading ? '처리 중...' : '정보 등록 완료'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
  },
  scrollContainer: {
    flexGrow: 1,
    padding: SPACING.lg,
  },
  header: {
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZE.xxxl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.grey,
  },
  formContainer: {
    marginBottom: SPACING.xl,
  },
  inputGroup: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.black,
    marginBottom: SPACING.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: FONT_SIZE.md,
    color: COLORS.black,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.sm,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semiBold,
  },
  backButton: {
    paddingVertical: SPACING.sm,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.primary,
  },
});

export default AdditionalInfoScreen;
