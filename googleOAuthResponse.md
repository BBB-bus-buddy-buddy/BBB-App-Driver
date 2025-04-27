# Google OAuth 응답 및 요청 문서

## 응답 구조

Google OAuth 로그인 성공 시 받는 응답:

```json
{
    "type": "success",
    "data": {
        "idToken": "기밀",
        "scopes": [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
            "openid"
        ],
        "user": {
            "givenName": "DUIT",
            "id": "104460337360717484167",
            "email": "djadjawltjr@gmail.com",
            "name": "DUIT",
            "familyName": null,
            "photo": "https://lh3.googleusercontent.com/a/ACg8ocL4HEv-8EUBJWvWNC6xhfH7a4OiLkYcxdtW616sW66WreG1wnVg=s120"
        }
    }
}
```

## 주요 응답 필드

### data 객체
- `type`: 응답 상태 ("success" 또는 "error")
- `idToken`: JWT 형식의 인증 토큰
- `scopes`: 허용된 권한 목록
- `user`: 사용자 정보

### user 객체
- `givenName`: 사용자 이름
- `id`: Google 고유 사용자 ID
- `email`: 사용자 이메일
- `name`: 전체 이름
- `familyName`: 성 (null일 수 있음)
- `photo`: 프로필 사진 URL

## 주의사항

- `idToken`은 민감 정보이므로 안전하게 관리
- 서버 측에서 토큰 유효성 검증 필요
- 필요한 권한(scope)만 요청