# 프랜차이즈 정보 조회 사이트 README 작성중

1. 기간 : 2024.10.28 ~
2. 배포 URL : [http://jaehoon.site/](http://jaehoon.site/)  
   (배포중 프리티어다보니 간헐적 끊김이 있을 수 있습니다.)

---

## 목차

1. [프로젝트 소개](#1-프로젝트-소개)
2. [현재 진행 사항 및 진행 예정](#2-현재-진행-사항-및-진행-예정)
3. [개발 환경](#3-개발-환경)
4. [주요 기능](#4-주요-기능)
5. [구조 및 아키텍처](#5-구조-및-아키텍처)
6. [데이터베이스 구조](#6-데이터베이스-구조)
7. [API 문서](#7-api-문서)
8. [페이지 설명](#8-페이지-설명)

---

## 1. 프로젝트 소개

프랜차이즈 창업 관련 정보를 한곳에 모아 제공하는 사이트입니다. 사용자는 지역 및 업종별 매출과 각 프랜차이즈에 대한 상세 정보를 쉽게 확인할 수 있으며, 창업 전 유용한 자료로 활용할 수 있습니다.

본 사이트는 공정거래위원회에서 제공하는 [정보공개서](https://franchise.ftc.go.kr/mnu/00013/program/userRqst/list.do)를 Python 크롤링을 통해 데이터베이스화하여 구축되었습니다.

이 프로젝트는 **프론트엔드**와 **백엔드**를 모두 혼자 개발하는 **풀스택 프로젝트**로 진행되고 있습니다. 따라서 개발 속도가 다소 느릴 수 있으나, 완성도를 높이기 위해 최선을 다하고 있습니다.

---

## 2. 현재 진행 사항 및 진행 예정

- 카카오 로그인 , 관리자 로그인 추가 완료
- 창업 지원 페이지 및 게시판 개발 진행 중

---

## 3. 개발 환경

- **Front-end**: HTML, React, styled-components
  - IDE: Visual Studio Code (VSCode)
- **Back-end**: Java 17 (Spring Boot 3.3.5)
  - IDE: IntelliJ IDEA
- **Database**: PostgreSQL 16
  - Tool: DBeaver
- **크롤링**: Python 3.11.9 (BeautifulSoup 사용)
  - IDE: PyCharm
- **서비스 배포**: AWS EC2

---

## 4. 주요 기능

### 일반 기능

- 지역 및 업종별 프랜차이즈 매출 조회
- 프랜차이즈 검색 및 정보 상세 조회
- 창업 관련 정보 조회

### 권한 및 사용자 관리

- **사용자 유형**:

  1. **사이트 마스터**
     - 사이트 전체를 관리하는 최고 관리자.
     - 계정 생성은 개발자에 의해 이루어지며, 관리자를 생성할 수 있는 권한을 가짐.
  2. **관리자**
     - 사이트 마스터가 생성한 계정.
     - 일반 회원을 인증 회원으로 전환하거나 데이터 관리 가능.
  3. **일반 회원**
     - 카카오 소셜 로그인으로 회원가입 및 로그인 가능.
     - 로그인 시 자동 회원가입 및 권한 부여.
  4. **인증 회원**
     - 마스터 또는 관리자가 일반 회원을 등업.

- **JWT를 활용한 인증 및 권한 관리**:

  - 로그인 시 JWT 토큰 발급 (HMAC-SHA256 서명, 1시간 만료).
  - 토큰에 고유 사용자 ID, 역할(role) 및 만료시간 포함.
  - 쿠키에 저장된 토큰을 활용하여 백엔드 AOP로 권한 검사.

- **카카오 소셜 로그인**:
  - 사용자가 처음 로그인 시, 자동 회원가입 후 로그인까지 진행.

---

## 5. 구조 및 아키텍처

### 인증 및 권한 관리 흐름

1. **로그인 및 회원가입**:

   - 일반 회원은 카카오 소셜 로그인을 통해 회원가입 및 로그인.
   - 관리자는 사이트 마스터가 계정을 생성.
   - 인증 회원으로의 전환은 관리자 또는 마스터의 승인 필요.

2. **JWT 발급 및 인증**:

   - 백엔드에서 HMAC-SHA256 알고리즘으로 JWT 생성.
   - `roleCheck` API를 통해 사용자 권한 확인 및 검증.
   - 아래 코드는 권한 검사 과정의 일부 코드입니다:
     ```java
     @GetMapping("/roleCheck")
     public StatusDTO roleCheck(@RequestHeader("Authorization") String token) {
         try {
             // 토큰 검증 및 역할 추출
             token = token.substring(7);
             String role = authService.getRoleFromToken(token);
             return new StatusDTO(200, "권한 확인 성공", role);
         } catch (Exception e) {
             return new StatusDTO(401, "권한 확인 실패: " + e.getMessage(), null);
         }
     }
     ```

3. **AOP를 이용한 권한 검사**:

   - 백엔드에서는 AOP로 역할 기반 접근 제어를 구현.
   - 다음은 `@RequiredRole` 애노테이션을 활용한 코드입니다:

     ```java
        @Aspect
        @Component
        public class AuthorizationAspect {

            private final HttpServletRequest request;

            public AuthorizationAspect(HttpServletRequest request) {
                this.request = request;
            }

            // @RequiredRole 애노테이션이 있는 메서드 실행 전
            @Before("@annotation(requiredRole)")
            public void checkAuthorization(RequiredRole requiredRole) {
                // 헤더에서 토큰 추출
                String token = request.getHeader("Authorization");
                if (token == null || !token.startsWith("Bearer ")) {
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "토큰이 필요합니다.");
                }

                try {
                    // JWT 토큰에서 사용자 역할 확인
                    token = token.substring(7); // "Bearer " 부분 제거
                    Claims claims = JwtTokenUtil.validateToken(token);
                    String userRole = claims.get("role", String.class);

                    // 역할이 허용된 목록에 포함되는지 확인
                    if (Arrays.stream(requiredRole.value()).noneMatch(userRole::equals)) {
                        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "접근 권한이 없습니다.");
                    }
                } catch (Exception e) {
                    throw new ResponseStatusException(HttpStatus.FORBIDDEN, "토큰 검증 실패: " + e.getMessage());
                }
            }
        }

     ```

---

## 6. 데이터베이스 구조

### 데이터베이스 ERD

### 회원관련

- ![회원관련 테이블 ERD](/src/assets/readme/table1.png)

### 정보공개서 크롤링 데이터 관련

![크롤링 테이블 ERD](/src/assets/readme/table2.png)

#

## 7. API 형식

### 회사 기본 정보

- **요청**: `/api/companyBasicInfo?companyNo=227130`
- **파라미터**: companyNo(회사 고유번호)
- **응답**:
  ```json
  {
    "code": 200,
    "message": "success",
    "data": {
      "address": "우 : 13477 경기도 성남시 분당구 운중로233번길 10 103,B01호(판교동)",
      "business_mark": "부산빨간어묵포차",
      "registration_number": "20211068",
      "fir_mst_sn": "227130",
      "industry": "분식",
      "fax_number": "031 - 702 - 8868",
      "business_registration_number": "228 - 81 - 04374",
      "registration_date": "2018.03.07",
      "company_name": "(주)판크로스",
      "business_type": "법인",
      "final_registration_date": "2024.10.30",
      "corporate_registration_number": "134111 - 0489307",
      "phone_number": "031 - 8017 - 1155",
      "initial_registration_date": "2021.04.21",
      "representative": "강금조",
      "incorporation_date": "2018.03.02"
    }
  }
  ```

### 매출 상위 매장 정보

- **요청**: `/api/topStoresBySales?region=전체&industry=치킨&limit=10`
- **파라미터**: region(지역) , industry(업종) , limit(수)
- **응답**:
  ```json
  {
    "code": 200,
    "message": "success",
    "data": [
      {
        "store_id": "202242",
        "avg_monthly_sales": 84475917,
        "store_name": "치맥킹",
        "industry": "치킨",
        "franchise_fee": 175500.0,
        "store_count": 14.0
      },
      {
        "store_id": "211154",
        "avg_monthly_sales": 67667417,
        "store_name": "달래고통닭 을지로골뱅이",
        "industry": "치킨",
        "franchise_fee": 107050.0,
        "store_count": 2.0
      },
        ...
    ]
  }
  ```

## 8. 페이지 설명

1. 로그인페이지 : 일반회원(카카오) 로그인 및 관리자 로그인 기능.
   ![로그인](/src/assets/readme/로그인.gif)

2. 메인페이지 :
   ![메인페이지](/src/assets/readme/메인페이지.gif)
3. 검색페이지 :

- 검색 : 검색어를 입력시 관련 목록 조회.
  ![검색](/src/assets/readme/검색페이지-검색.gif)
- 매출 정보 : 검색한 프랜차이즈의 지역 매출 조회.
  ![매출정보](/src/assets/readme/검색페이지-매출정보.gif)
- 가맹 현황 : 검색한 프랜차이즈의 창업 비용 및 가맹 수 조회.
  ![가맹현황](/src/assets/readme/검색페이지-가맹현황.gif)
- 브랜드 정보 : 검색한 프랜차이즈의 기본정보 및 관련 뉴스 조회.
  ![브랜드정보](/src/assets/readme/검색페이지-브랜드정보.gif)

4. 창업정보페이지 (개발진행중) :

- 유용한 사이트 : 관리자가 등록한 관련 사이트 목록 CRUD
  ![창업지원페이지](/src/assets/readme/창업지원페이지.gif)
