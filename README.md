# 프랜차이즈 정보 조회 사이트 README 작성중

1. 기간 : 2024.10.28 ~
2. 배포 URL : http://jaehoon.site/ (배포중 프리티어다보니 간헐적 끊김이 있습니다.)

## 목차

1. [프로젝트 소개](#1-프로젝트-소개)
2. [현재 진행 사항 및 진행 예정](#2-현재 진행 사항 및 진행 예정)
3. [개발 환경](#3-개발-환경)
4. [주요 기능](#4-주요-기능)
5. [구조 및 아키텍처](#5-구조-및-아키텍처)
6. [데이터베이스 구조](#6-데이터베이스-구조)
7. [API 문서](#7-api-문서)
8. [사용 예시](#8-사용-예시)

---

## 1. 프로젝트 소개

프랜차이즈 창업 관련 정보를 한곳에 모아 제공하는 사이트입니다. 사용자는 지역 및 업종별 매출과 각 프랜차이즈에 대한 상세 정보를 쉽게 확인할 수 있으며, 창업 전 유용한 자료로 활용할 수 있습니다.

본 사이트는 공정거래위원회에서 제공하는 [정보공개서](https://franchise.ftc.go.kr/mnu/00013/program/userRqst/list.do)를 Python 크롤링을 통해 데이터베이스화하여 구축되었습니다.

## 2. 현재 진행 사항 및 진행 예정

- 뉴스 api 추가 (완료)
- 전 페이지 미디어 쿼리 적용 (진행 중)
- 로딩 스피너 적용 (진행예정)

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

## 4. 주요 기능

- 지역 및 업종별 프랜차이즈 매출 조회
- 프랜차이즈 검색 및 정보 상세 조회

## 5. 구조 및 아키텍처

- 프론트엔드, 백엔드, 데이터베이스 구조
- 각 서비스 간 데이터 흐름과 통신 방식

## 6. 데이터베이스 구조

프랜차이즈 관련 정보를 저장하고 조회하기 위해 여러 개의 테이블이 데이터베이스에 구성되어 있습니다. 아래는 주요 테이블과 각 테이블의 역할입니다.

### 데이터베이스 ERD

![Database ERD](path_to_your_image.png)

### 테이블 설명

- **failed_crawl_log**: 크롤링 실패한 고유번호(`fir_mst_sn`)와 에러 메시지(`error_message`), 시도 날짜(`attempt_date`)를 저장
- **franchise_changes**: `fir_mst_sn`별로 연도(`report_year`)와 해당 연도의 신규 개점 수(`new_openings`), 계약 종료 수(`contract_terminations`), 계약 해지 수(`contract_cancellations`), 명의 변경 수(`name_changes`)를 저앙
- **franchise_basic_info**: 프랜차이즈의 기본 정보를 저장하는 테이블로, 고유번호(`fir_mst_sn`), 상호(`company_name`), 영업표지(`business_mark`), 대표자, 업종(`industry`), 법인설립일, 사업자등록일, 주소 등 기본적인 식별 정보를 저장
- **franchise_financial_status**: `fir_mst_sn`과 연도(`report_year`)별로 자산(`assets`), 부채(`liabilities`), 자본(`equity`), 매출(`revenue`), 영업이익(`operating_income`), 당기순이익(`net_income`) 등 재무 상태를 저장
- **contract_period**: 가맹계약의 기본 기간(`initial_period`)과 연장 기간(`renewal_period`) 정보를 `fir_mst_sn`별로 저장
- **burden_costs**: 가맹사업자의 부담금 내역을 `fir_mst_sn`별로 저장하며, 가입비(`entry_fee`), 교육비(`education_fee`), 보증금(`deposit`), 기타 비용(`other_costs`), 총 부담금(`total`)을 저장
- **avg_sales_by_region**: `fir_mst_sn`과 연도(`report_year`), 지역(`region`)별로 프랜차이즈의 평균 매출(`avg_sales`), 면적당 평균 매출(`avg_sales_per_area`), 가맹점 수(`franchise_count`)를 저장
- **franchise_store_status**: `fir_mst_sn`과 연도(`report_year`), 지역(`region`)별로 전체 매장 수(`total_stores`), 가맹점 수(`franchise_stores`), 직영점 수(`direct_stores`)를 저장
- **interior_costs**: `fir_mst_sn`별로 단위 면적당 인테리어 비용(`unit_area_cost`), 기준 점포 면적(`standard_store_area`), 전체 인테리어 비용(`interior_cost`)을 저장
- **promo_costs**: `fir_mst_sn`과 연도(`report_year`)별로 광고비(`ad_cost`)와 판촉비(`promo_cost`)를 저장

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

## 8. 사용 예시

- 스크린샷을 포함한 주요 기능 설명
- 사용자가 페이지를 어떻게 탐색할 수 있는지 예시
