좋아. 아래는 **PRD에 바로 넣을 수 있는 형태**로 정리한 **오만 교육부 대상 수학 데모사이트 콘텐츠 설계안 v1**이야.

오만은 공식적으로 **1–4 / 5–10 / 11–12** 구조를 쓰지만, 데모 UX와 설명 효율을 위해 이번 제품 시연은 **1–5 / 6–10 / 11–12**의 3개 밴드로 재구성하는 게 좋다. 수학은 1–12 전 구간에서 **Cambridge 기반 커리큘럼**을 적용하고 있고, 핵심 strand는 **Number, Operations, Geometry/Spatial Sense, Measurement, Pre‑Algebra/Algebra, Data/Probability**다. 또한 교사들은 문항을 **Knowledge / Understanding / Application / Reasoning**으로 분류하도록 훈련받아 왔고, 현행 수학 평가 문서(5–12)는 **knowledge / application / reasoning** 중심의 continuous assessment와 **중간 서술형 리포트 + 학기말 성적 보고**를 요구한다. 따라서 데모는 **4영역 평가 엔진**을 내부 기준으로 쓰고, 출력은 **교사용 4영역 + 행정/학부모용 3영역 요약**으로 설계하는 게 가장 현지 정렬도가 높다. ([TIMSS and PIRLS][1])

---

## 1. 제품 핵심 컨셉 문안

**Math Insight for Oman**은 오만의 개편 수학 커리큘럼에 맞춘 **인터랙티브 수업 콘텐츠**와 **반응형 평가**, 그리고 **학생 개별 리포트 / 교사 대시보드**를 하나의 흐름으로 연결하는 데모 플랫폼이다.
본 데모는 다음 2가지를 증명하는 것을 목표로 한다.

1. **개편 커리큘럼 기반 문항과 수업도구로 학습 성취를 높일 수 있다.**
2. **수업도구 → 반응형 평가 → 학생 개별 리포트 + 교사 대시보드**가 하나의 수업 흐름 안에서 동작할 수 있다.

---

## 2. 데모 사용자 흐름

### 교사 흐름

1. 교사가 학년 밴드와 콘텐츠 모듈을 선택한다.
2. 프로젝터/대형 화면으로 **5–7분 인터랙티브 수업 콘텐츠**를 실행한다.
3. 수업 직후 학생 기기에서 **6–8분 반응형 평가**를 실행한다.
4. 즉시 **학급 대시보드**를 확인한다.
5. 학생별 **개별 리포트**와 **다음 수업 추천**을 확인한다.

### 학생 흐름

1. 수업 콘텐츠에서 조작·예측·토론·응답을 수행한다.
2. 짧은 반응형 평가를 본다.
3. 즉시 **내 개념 이해 / 적용 / 추론 수준**과 다음 학습 추천을 받는다.

### 출력 결과

* **학생 리포트**: 개념 숙달도, 인지영역 프로파일, 오답 유형, 다음 학습 추천
* **교사 대시보드**: 학급 평균, 개념별 열지도, 인지영역별 분포, 수준별 그룹 추천
* **학부모/행정용 요약**: 서술형 코멘트 + 성취 요약

오만의 평가 문서는 continuous assessment에서 **short tests, projects, short questions, homework**를 활용하고, 중간 서술형 보고와 부모 보고를 전제로 한다. 그래서 데모 결과물도 “점수만”이 아니라 **설명 가능한 피드백** 형태여야 한다. 

---

## 3. 커리큘럼 정렬 원칙

### 인지영역 설계 원칙

데모 평가 엔진은 아래 4개 영역을 모두 다룬다.

* **Knowledge**: 사실/용어/기본 절차
* **Understanding**: 개념 이해, 관계 파악
* **Application**: 익숙한 상황에 적용
* **Reasoning**: 설명, 추론, 일반화, 문제 해결

단, 오만 현행 수학 평가 문서(5–12)가 **knowledge / application / reasoning** 3축 요약도 사용하므로, 리포트 화면에는

* **교사용 상세 보기**: K/U/A/R
* **행정/학부모용 요약 보기**: K/A/R
  를 함께 제공하는 구조가 적합하다. ([TIMSS and PIRLS][1])

---

## 4. 우선 제작 콘텐츠 9종

---

## A. 1–5 밴드 콘텐츠 3종

오만의 Grades 1–6 승인 자료와 content distribution에는 **numbers, time, graphs, data handling, fractions, decimals, percentages, ratio, perimeter/area, symmetry, transformation** 등이 반복적으로 배치된다. 저학년 데모는 이 중 **수감각, 측정/도형, 데이터 해석**의 3축으로 잡는 것이 가장 설명력이 높다. ([교육 포털][2])

### A-1. Number Sense & Fraction Lab

**핵심 개념**
분수, 소수, 혼합수, 백분율, 비와 비례

**왜 이 콘텐츠인가**

* 오만 초등 상위학년에서 **fractions / decimals / mixed numbers / percentages / ratio**가 명시적으로 등장한다.
* 수감각은 전 학년 strand의 중심이며, 이후 6–10의 대수/비례 개념으로 자연스럽게 연결된다.

**인터랙션**

* fraction strip / number line / ratio mixer / percent slider
* “같은 양을 다른 표현으로 보기” 중심
* 실생활 맥락: 물, 거리, 용량, 간단한 쇼핑/할인

**반응형 평가 포인트**

* 같은 값을 분수·소수·백분율로 연결하기
* 단순 ratio 비교와 scaling
* 시각 표현을 수식/수치로 바꾸기
* 짧은 서술형 추론: “왜 같은 값인지 설명하기”

**리포트 출력**

* 수표현 전환 능력
* 비례 감각
* 연산 정확도 vs 개념 이해도 분리

---

### A-2. Measure & Shape Explorer

**핵심 개념**
시간, 길이/무게/용량, 각도, 방향, 둘레/넓이, 대칭

**왜 이 콘텐츠인가**

* 공식 배포 단원에 **time, length/mass/capacity, perimeter/area, angles, direction, symmetry**가 반복된다.
* 가장 직관적이고, 대표단 앞에서 “수업이 살아 움직이는” 느낌을 주기 좋다.

**인터랙션**

* 시계 조작, 타임라인 배치, 둘레/넓이 타일 조작
* 도형 반사/이동
* “같은 넓이, 다른 둘레” 같은 시각적 비교

**반응형 평가 포인트**

* 단위와 측정값 해석
* 도형의 성질과 대칭성 판단
* 시간표/경로/위치 문제
* 넓이·둘레의 혼동 진단

**리포트 출력**

* 측정 개념 이해
* 시공간 추론
* 도형 조작 이해도

---

### A-3. Data & Decision Junior

**핵심 개념**
그래프, 표, pictogram, data handling, 간단한 chance

**왜 이 콘텐츠인가**

* Grades 1–5/6 자료에는 **graphs, handling information, data handling, pictograms and bar charts**가 명시된다.
* 수업도구→평가→대시보드 흐름을 가장 자연스럽게 보여줄 수 있다.

**인터랙션**

* 교실 즉석 poll 결과를 실시간 막대그래프로 생성
* pictogram 만들기
* spinner / dice로 간단한 가능성 비교

**반응형 평가 포인트**

* 그래프 읽기
* 비교/차이/최댓값 해석
* 간단한 확률 직관
* 데이터 기반 선택 이유 설명

**리포트 출력**

* 데이터 해석력
* 시각정보 문해력
* 추론형 응답의 질

---

## B. 6–10 밴드 콘텐츠 3종

현재 공식 7–8 배포 자료는 **numbers, fractions/decimals/percentages, ratio/proportion, algebra, inequalities, sequences, functions and graphs, statistics, probability, shapes, transformation**을 포함하고, 9–10 공식 learning outcomes는 **indices, real numbers, proportion, percentages, algebraic manipulation, algebraic fractions, straight-line graphs**까지 확장한다. 따라서 중등 데모는 **대수/함수, 기하/변환, 통계/확률** 3축이 가장 적합하다. 

### B-1. Algebra & Graphs Studio

**핵심 개념**
대수식 조작, 일차방정식/부등식, 수열, 함수와 그래프, 직선 그래프

**왜 이 콘텐츠인가**

* 7–10 전 구간에서 **algebra, inequalities, sequences, functions and graphs**가 지속적으로 나온다.
* 오만 교육부 고민인 “기초 결손 → 상위 개념 진입 실패”를 보여주기에 가장 좋은 모듈이다.

**인터랙션**

* 저울형 equation balancer
* function machine
* table → graph → rule 변환
* 직선의 기울기와 절편을 드래그로 확인

**반응형 평가 포인트**

* 식 간단화
* 방정식/부등식 해결
* 수열 규칙 찾기
* 표/그래프/식의 동치 관계 이해
* 직선 그래프의 의미 해석

**리포트 출력**

* 대수 조작 정확도
* 함수 관계 이해
* 그래프 문해력
* 추론형 오류(규칙 발견 실패 / 식세우기 실패)

---

### B-2. Geometry, Scale & Transformation Lab

**핵심 개념**
2D/3D shapes, 각, bearings, scale drawings, coordinates, transformations, area/volume

**왜 이 콘텐츠인가**

* 7–10 공식 자료에 **2D and 3D shapes, maps/scales/transformation, angles/bearings, coordinates, area and volume**가 반복적으로 배치된다.
* 시연 효과가 매우 좋고, 추론 문제를 만들기 쉽다.

**인터랙션**

* 지도 위 scale route
* bearing 조작
* 좌표평면에서 이동/대칭/확대
* net 펼치기와 surface-area 비교

**반응형 평가 포인트**

* 각도와 방향 해석
* scale factor 적용
* transformation 판별
* 넓이/부피/표면적 계산 및 설명

**리포트 출력**

* 공간 추론
* 시각 변환 이해
* 측정과 기하의 통합 수행력

---

### B-3. Statistics & Probability Investigator

**핵심 개념**
자료 수집, 표/그래프 해석, 평균·중앙값·최빈값, theoretical vs experimental probability

**왜 이 콘텐츠인가**

* 공식 자료에 **statistics / probability / collecting data / thinking statistically**가 명시되고, 9–10에서도 평균과 데이터 해석, 확률이 이어진다.
* 교사 대시보드와 가장 자연스럽게 이어지는 수업 모듈이다.

**인터랙션**

* 반 전체 데이터 즉시 수집
* sample size를 바꾸며 결과 변동 확인
* dice / spinner / card experiment

**반응형 평가 포인트**

* 평균·중앙값·최빈값 계산과 선택
* sample bias 판단
* experimental vs theoretical probability 비교
* 데이터로 결론 내리기

**리포트 출력**

* 통계 해석력
* 불확실성 이해
* 판단 근거 제시 수준

---

## C. 11–12 밴드 콘텐츠 3종

오만의 11–12 공식 자료는 **Grade 11: Advanced/Basic**, **Grade 12: Pure/Applied**로 나뉜다. 시연용 v1에서는 설명력과 시각성이 높은 **Advanced/Pure exemplar**를 우선 선택하는 것이 좋다. 공식 learning outcomes에는 **quadratics, functions and transformations, differentiation, coordinate geometry, trigonometry, logarithms, integration, vectors, discrete random variables** 등이 포함된다. ([교육 포털][3])

### C-1. Functions & Quadratics Studio

**핵심 개념**
quadratics, discriminant, inequalities, inverse, graph transformation, modulus

**왜 이 콘텐츠인가**

* Grade 11 advanced learning outcomes의 핵심을 가장 잘 보여준다.
* “개념 이해 + 시각화 + 즉시 진단”의 효과가 가장 크다.

**인터랙션**

* a, b, c 슬라이더를 움직여 그래프/근/판별식이 동시에 바뀌는 화면
* inverse relation overlay
* modulus graph comparison

**반응형 평가 포인트**

* 판별식과 근의 성질
* 그래프 이동/확대/반사
* quadratic inequality
* inverse/function classification
* 그래프-식 관계 설명

**리포트 출력**

* 함수 해석력
* 그래프 변환 이해
* 방정식 vs 부등식 수행 차이

---

### C-2. Trig & Coordinate Modelling Studio

**핵심 개념**
straight line, intersections, radians, arc length, sine/cosine/tangent graphs, simple identities

**왜 이 콘텐츠인가**

* Grade 11의 coordinate geometry와 circular measure/trigonometry, Grade 12 trig 확장을 함께 보여줄 수 있다.
* 시각적으로 매우 강하고, STEM 진학 연계 메시지를 만들기 좋다.

**인터랙션**

* radian-degree slider
* unit-circle / trig graph linked animation
* line builder와 intersection finder
* 실생활 맥락: 파형, 경사, 경로

**반응형 평가 포인트**

* radians ↔ degrees
* arc length / sector area
* line equation / intersection
* trig graph reading
* 단순 identity/solution reasoning

**리포트 출력**

* 삼각함수 시각 이해
* 해석기하 수행력
* 모델링 적응력

---

### C-3. Calculus & Uncertainty Studio

**핵심 개념**
differentiation, stationary points, rates of change, discrete random variables, expectation, variance

**왜 이 콘텐츠인가**

* Grade 11 differentiation과 Grade 12 probability/statistics를 함께 보여주면 “고등수학도 데이터 기반으로 진단 가능하다”는 메시지가 선다.
* 대표단에게 AI/데이터 활용의 의미를 가장 강하게 전달할 수 있다.

**인터랙션**

* motion graph 위에 tangent 움직이기
* stationary point classifier
* probability table builder
* expectation/variance 시각화

**반응형 평가 포인트**

* derivative 해석
* increasing/decreasing, stationary point 판단
* rate of change 문항
* discrete distribution 작성
* expectation 계산과 해석

**리포트 출력**

* 미적분 개념 이해
* 변화율 추론
* 확률변수 해석력

---

## 5. 반응형 평가 설계안

### 평가 구조

* 각 모듈별 **문항 풀 16–20개**
* 실제 학생에게는 **8문항 내외** 출제
* 구성:

  * 공통 anchor 문항 3–4개
  * 반응 기반 adaptive 문항 4–5개

### 권장 출제 비중

* **1–5**: K 2 / U 2 / A 2 / R 2
* **6–10**: K 2 / U 2 / A 2 / R 2
* **11–12**: K 1 / U 2 / A 2 / R 3

### 문항 형식

* 객관식
* 드래그/드롭
* 좌표/그래프 조작형
* 수치 입력형
* 짧은 이유 설명형

### 오만 정렬 포인트

* 내부 엔진은 **K/U/A/R**
* 교사 화면은 **개념 mastery + 인지영역 heatmap**
* 학생/학부모 리포트는 **개념 요약 + next step**
* 행정 요약은 **knowledge/application/reasoning summary**도 함께 제공

---

## 6. 교사 대시보드 구성

### 실시간 수업 화면

* 전체 응답률
* 현재 문항 정답률
* 오개념 선택지 분포
* 다음 설명 추천

### 수업 후 대시보드

* **개념별 mastery map**
* **인지영역별 분포**
* **학생 군집 자동 분류**

  * 즉시 보정 필요
  * 추가 연습 필요
  * 심화 가능
* **다음 수업 추천 콘텐츠**
* **문항별 난이도/오답률**

### 학생 개별 리포트

* “무엇을 알고 있는가”
* “어디서 막혔는가”
* “다음에 무엇을 해야 하는가”
* 교사용 코멘트 입력란

---

## 7. PRD에 넣을 추천 문구

### 콘텐츠 전략

본 데모의 콘텐츠는 오만 개편 수학 커리큘럼의 핵심 strand와 학년별 approved resources를 기준으로 선정한다. 수업 콘텐츠는 개념 시각화와 조작 중심으로 설계하고, 수업 직후 반응형 평가를 통해 학생의 개념 숙달도와 인지영역별 수행 수준을 분석한다. 결과는 학생 개별 리포트와 교사 대시보드로 즉시 제공되며, 이후 수업의 보정·심화 활동 추천으로 연결된다. ([TIMSS and PIRLS][1])

### 평가 전략

평가 엔진은 오만 수학 개혁에서 강조된 **Knowledge / Understanding / Application / Reasoning** 체계를 반영하되, 현행 continuous assessment 문서에서 활용되는 **knowledge / application / reasoning** 요약 체계도 함께 출력할 수 있도록 설계한다. 이를 통해 교실 수업, 학부모 보고, 학교 행정 보고를 하나의 데이터 구조로 연결한다. ([TIMSS and PIRLS][1])

### 시연 전략

v1 데모는 각 밴드별 3개 모듈, 총 9개 모듈을 우선 구현한다. 상급학년(11–12)은 Advanced/Pure exemplar를 우선 적용하고, 이후 Basic/Applied용 문항 풀 확장 구조를 유지한다. 이렇게 하면 짧은 시연 안에서도 “수업도구 → 평가 → 개별 리포팅 → 교사 의사결정”의 전체 흐름을 가장 설득력 있게 보여줄 수 있다.

---
오만의 공식 학교 구조는 **Cycle 1(1-4), Cycle 2(5-10), Post-Basic(11-12)**이고, 수학은 **Cambridge 기반 1-12 커리큘럼**으로 운영되며 주요 strand는 **Number and Number Theory, Number Operations, Geometry/Spatial Sense, Measurement, Pre-Algebra and Algebra, Data Management and Probabilities**다. 또한 TIMSS 대응 과정에서 교사들은 문항을 **Knowledge, Understanding, Application, Reasoning**의 4영역으로 분류하도록 훈련받았고, 현행 수학 평가 문서는 **knowledge, application, reasoning** 3영역 요약과 **continuous assessment / e-assessment / 부모 보고**를 공식적으로 포함한다. 데모 밴드는 UX 효율 때문에 **1-5 / 6-10 / 11-12**로 재구성하되, 콘텐츠 매핑은 오만 공식 구조에 맞춘다. ([TIMSS 및 PIRLS 국제 연구 센터][1])

---

# PRD Addendum v1.1

## Product Name

**Math Insight Oman Demo**

## Product Goal

오만 교육부와 학교 리더에게 아래 메시지를 시연으로 증명한다.

1. **개편 커리큘럼 기반의 수업 콘텐츠와 평가 문항으로 성취 향상이 가능하다.**
2. **수업도구 → 평가 → 학생 개별 리포트 → 교사 대시보드**가 하나의 흐름으로 연결된다.
3. 추후에는 **인터넷이 불안정한 환경에서도 동작 가능한 설치형/로컬형 소프트웨어**로 확장 가능하다.

---

# 1. Scope

## In Scope (v1 Demo)

* 교사용 인터랙티브 수업 콘텐츠 9종
* 학생용 반응형 평가
* 학생 개별 리포트
* 교사 학급 대시보드
* 커리큘럼 태그 및 인지영역 태그
* 영어 UI + 아랍어 토글 준비 구조

## Out of Scope (v1 Demo)

* 실시간 다인 동시 접속 최적화
* 실제 SIS 연동
* 정식 오프라인 설치 패키지
* 장기 학습 이력 누적 분석

## Phase 2 Preview

* 설치형 PWA/Desktop package
* 로컬 문항 엔진 + 경량 로컬 추론 모델
* 로컬 서버형 대시보드
* 인터넷 복구 시 동기화

---

# 2. Oman Alignment Principles

## 2-1. Curriculum Alignment

이번 데모는 오만 공식 자료에서 확인되는 주제 흐름을 따른다.
**1-6 구간**에서는 수, 시간, 길이/무게/용량, 도형, 분수, 비율, 데이터 처리, 대칭/이동, 좌표, 확률 등이 반복되고, **7-10 구간**에서는 algebra, equations, inequalities, ratio and proportion, coordinate geometry, transformation, data handling, probability, graphs가 크게 확장된다. **11-12 구간**에서는 quadratics, functions, graph transformations, differentiation, statistics, probability가 분명한 고등수학 축으로 제시된다. 

## 2-2. Assessment Alignment

평가 엔진은 내부적으로 **K/U/A/R 4영역**을 사용한다.
단, 오만 현행 수학 평가 문서는 최종 목표를 **knowledge / application / reasoning** 3그룹으로 요약하고 continuous assessment, formative assessment, e-assessment, summative assessment, 부모 보고를 함께 강조한다. 그래서 결과 화면은 아래처럼 이중 구조로 설계한다. 

* **교사용 상세 보기:** Knowledge / Understanding / Application / Reasoning
* **학생/학부모 요약 보기:** Knowledge / Application / Reasoning

## 2-3. Language Alignment

오만의 공교육은 기본적으로 아랍어 중심이고, bilingual/international contexts에서는 영어 활용이 가능하다. 데모는 대표단 시연 효율 때문에 **영문 기본 + 아랍어 UI 토글 준비형**으로 설계한다. ([TIMSS 및 PIRLS 국제 연구 센터][1])

---

# 3. User Journey

## Teacher Journey

1. 학년 밴드 선택
2. 콘텐츠 모듈 선택
3. 5-7분 인터랙티브 수업 진행
4. 6-8분 반응형 평가 실행
5. 즉시 학급 대시보드 확인
6. 학생별 리포트 확인
7. 다음 수업 추천 확인

## Student Journey

1. 교사 안내로 모듈 접속
2. 조작/예측/응답 중심 미니 수업 참여
3. 반응형 평가 응시
4. 즉시 개별 리포트 확인
5. 추천 활동 1개 수행

---

# 4. IA / 화면 구조

## 4-1. Primary Screens

* Teacher Home
* Lesson Player
* Student Assessment
* Student Report
* Teacher Dashboard
* Curriculum Map Admin

## 4-2. Route Structure

* `/teacher/home`
* `/teacher/modules`
* `/lesson/:moduleId`
* `/assessment/:sessionId`
* `/report/student/:studentId`
* `/dashboard/class/:classId`
* `/admin/curriculum-map`

---

# 5. 공통 화면 와이어프레임

## 5-1. Teacher Home

### 목적

수업 시작 전 학년/단원/인지영역 기반으로 모듈을 고르는 화면

### 구성

* 상단: 학년 밴드 탭
* 좌측: Strand 필터
* 중앙: 모듈 카드 9개
* 우측: 오늘 수업 추천 / 최근 학급 성취 변화
* 하단: “Start Lesson” CTA

### 핵심 데이터

* module_id
* grade_band
* strand_tags
* cognitive_focus
* estimated_lesson_time
* estimated_assessment_time

---

## 5-2. Lesson Player

### 목적

교사용 메인 시연 화면

### 구성

* 상단: 모듈명 / 목표 / 커리큘럼 태그
* 중앙: 조작형 캔버스
* 우측: 교사용 진행 가이드
* 하단: 실시간 질문 버튼 / 학생 응답 현황 / 평가 시작 버튼

### 핵심 기능

* projector mode
* student sync code
* hint reveal
* misconception prompt
* quick poll launch

---

## 5-3. Student Assessment

### 목적

반응형 평가 응시

### 구성

* 상단: 진행률 / 남은 문항 수
* 중앙: 문항
* 하단: 선택지 또는 입력창
* 우측 슬라이드: 도구(숫자선, 그리기, 계산기 제한형, 그래프 도구)

### 핵심 기능

* anchor item
* adaptive routing
* drag/drop
* numeric input
* short reasoning response

---

## 5-4. Student Report

### 목적

학생 개별 진단 및 다음 학습 제시

### 구성

* 상단: Overall Mastery
* 중단 좌측: Concept Radar
* 중단 우측: Cognitive Profile
* 하단: 강점 / 취약점 / 다음 추천 2개 / 교사 코멘트

### 출력 항목

* concept_mastery
* K/U/A/R profile
* error patterns
* next step

---

## 5-5. Teacher Dashboard

### 목적

학급 단위 의사결정 지원

### 구성

* 상단 KPI: 평균 mastery / 취약 개념 / 추론 약군 비율
* 중앙: 개념 heatmap
* 하단 좌측: 학생 그룹 분류
* 하단 우측: 다음 수업 추천

### 출력 항목

* class_mastery_by_concept
* class_mastery_by_cognitive_domain
* item_difficulty
* misconception clusters
* intervention groups

---

# 6. 9개 콘텐츠 모듈 상세

---

## A. 1-5 밴드

### A-1. Number Sense and Fraction Lab

**목표**
분수, 소수, 백분율, 비율을 서로 연결해서 이해하게 한다.

**커리큘럼 근거**
1-6 공식 자료에는 fractions, decimals, percentages, proportion and ratio가 명시되고, 저학년부터 number patterns, place value, operations가 반복된다. 

**수업 인터랙션**

* fraction strip drag
* number line placement
* percent slider
* ratio mixer
* “same value in 3 forms” 카드 매칭

**평가 비중**

* K 2
* U 2
* A 2
* R 2

**리포트 포인트**

* representation conversion
* ratio intuition
* conceptual vs procedural gap

#### 샘플 문항 5개

1. **[K]** 0.5와 같은 값을 고르시오.

   * a) 1/4  b) 1/2  c) 2/5  d) 3/5

2. **[U]** 숫자선에 3/4의 위치를 표시하시오.

3. **[A]** 주스 100mL 중 25mL가 딸기맛이다. 딸기맛은 전체의 몇 퍼센트인가?

4. **[A]** 파란 블록 6개, 빨간 블록 9개가 있다. 파란색:빨간색의 비를 가장 간단히 쓰시오.

5. **[R]** 1/2, 0.50, 50%가 왜 같은 양인지 한 문장으로 설명하시오.

---

### A-2. Measure and Shape Explorer

**목표**
시간, 길이/무게/용량, 각도, 둘레/넓이, 대칭을 실제 조작으로 이해하게 한다.

**커리큘럼 근거**
1-6 공식 자료에는 time, length/mass/capacity, perimeter/area, angles, position and direction, symmetry, reflection and translation이 포함된다. 

**수업 인터랙션**

* clock hands move
* perimeter tiles
* area fill
* symmetry mirror
* route and direction arrows

**평가 비중**

* K 2
* U 2
* A 2
* R 2

**리포트 포인트**

* measurement sense
* area/perimeter confusion
* spatial reasoning

#### 샘플 문항 5개

1. **[K]** 시계가 3시 30분을 가리키도록 바늘을 움직이시오.

2. **[U]** 아래 도형의 대칭선 개수를 고르시오.

3. **[A]** 한 변이 5cm, 3cm인 직사각형의 둘레를 구하시오.

4. **[A]** 길이 4칸, 너비 3칸인 직사각형의 넓이를 구하시오.

5. **[R]** 둘레가 같아도 넓이가 달라질 수 있음을 예시 하나로 설명하시오.

---

### A-3. Data and Decision Junior

**목표**
표, 그림그래프, 막대그래프, 간단한 chance를 해석한다.

**커리큘럼 근거**
1-6 자료에는 handling information, data representation, data handling, investigation, statistical cycle, probability/chance가 반복된다. 

**수업 인터랙션**

* class poll
* live bar chart
* pictogram builder
* spinner chance demo

**평가 비중**

* K 2
* U 2
* A 2
* R 2

**리포트 포인트**

* graph reading
* comparison
* evidence-based decision

#### 샘플 문항 5개

1. **[K]** 그래프에서 가장 많은 표를 받은 과일을 고르시오.

2. **[U]** 사과와 바나나의 차이는 몇 표인가?

3. **[A]** 4명이 파랑, 2명이 초록을 골랐다. 이를 막대그래프로 완성하시오.

4. **[A]** 룰렛이 4칸이고 1칸만 빨강이다. 빨강이 나올 가능성은 얼마인가?

5. **[R]** “가장 인기 있는 선택”을 정할 때 그래프를 어떻게 읽어야 하는지 설명하시오.

---

## B. 6-10 밴드

### B-1. Algebra and Graphs Studio

**목표**
식, 방정식, 부등식, 수열, 함수와 그래프의 연결을 이해하게 한다.

**커리큘럼 근거**
7-10 자료에는 introduction to algebra and equation, expressions, equations and inequalities, sequences, relationships and graphs, coordinate geometry and graph, algebraic equations, graphs in practical situations가 핵심 축으로 제시된다. 

**수업 인터랙션**

* balance equation tool
* function machine
* table-to-graph converter
* slope/intercept slider

**평가 비중**

* K 2
* U 2
* A 2
* R 2

**리포트 포인트**

* symbolic manipulation
* graph literacy
* rule finding

#### 샘플 문항 5개

1. **[K]** (3x + 5 = 17)일 때 (x)를 구하시오.

2. **[U]** 표에서 (x)가 1 증가할 때 (y)가 2 증가한다. 식 (y=) ? 를 쓰시오.

3. **[A]** 좌표평면에 (y=2x+1)의 그래프를 그릴 때 필요한 두 점을 고르시오.

4. **[A]** (2x-3>7) 을 만족하는 (x)의 범위를 구하시오.

5. **[R]** 왜 (y=2x+1)의 그래프는 직선인지 설명하시오.

---

### B-2. Geometry, Scale and Transformation Lab

**목표**
좌표, 변환, 축척, 각도와 방향, 넓이/부피를 시각적으로 익히게 한다.

**커리큘럼 근거**
7-10 자료에는 shapes and symmetry, geometric construction, transformation, coordinate geometry, bearing, area and volume, mensuration, surface area and symmetry가 포함된다. 

**수업 인터랙션**

* transformation board
* bearing compass
* map scale tool
* 3D net fold/unfold

**평가 비중**

* K 2
* U 2
* A 2
* R 2

**리포트 포인트**

* spatial transformation
* scale reasoning
* geometry application

#### 샘플 문항 5개

1. **[K]** 점 A(2,3)을 y축 대칭한 좌표를 구하시오.

2. **[U]** 도형이 확대인지, 이동인지, 반사인지 고르시오.

3. **[A]** 지도에서 2cm가 실제 1km라면 6cm는 실제 몇 km인가?

4. **[A]** 북쪽에서 시계방향으로 120도 방향을 bearing으로 쓰시오.

5. **[R]** 넓이는 같지만 모양이 다른 두 도형이 가능한 이유를 설명하시오.

---

### B-3. Statistics and Probability Investigator

**목표**
자료 표현, 평균/중앙값/최빈값, 표본과 확률을 다루게 한다.

**커리큘럼 근거**
7-10 자료에는 collecting data, presenting and interpreting data, thinking statistically, handling data, statistical investigations, probability가 이어진다. 

**수업 인터랙션**

* sample size simulator
* mean/median drag sorter
* histogram builder
* dice experiment

**평가 비중**

* K 2
* U 2
* A 2
* R 2

**리포트 포인트**

* data interpretation
* measure selection
* uncertainty reasoning

#### 샘플 문항 5개

1. **[K]** 3, 4, 4, 5, 9의 최빈값을 구하시오.

2. **[U]** 평균과 중앙값 중 이상치(outlier)에 더 덜 영향을 받는 값을 고르시오.

3. **[A]** 주사위를 30번 던져 6이 3번 나왔다. 실험확률은 얼마인가?

4. **[A]** 막대그래프를 보고 가장 변동이 큰 집단을 고르시오.

5. **[R]** 왜 작은 표본보다 큰 표본이 더 믿을 만한지 설명하시오.

---

## C. 11-12 밴드

### C-1. Functions and Quadratics Studio

**목표**
이차방정식, 판별식, 함수의 정의역/치역, 그래프 변환을 연결한다.

**커리큘럼 근거**
Grade 11/12 공식 자료에는 quadratics, discriminant, functions, range, one-one vs many-one, graph transformations, modulus, straight line graphs가 포함된다. 

**수업 인터랙션**

* quadratic slider
* discriminant visualizer
* inverse overlay
* graph transformation layer

**평가 비중**

* K 1
* U 2
* A 2
* R 3

**리포트 포인트**

* quadratic structure understanding
* function concept mastery
* graph reasoning

#### 샘플 문항 5개

1. **[K]** (x^2-5x+6=0) 의 해를 구하시오.

2. **[U]** 판별식 (b^2-4ac) 가 0일 때 그래프는 x축과 몇 번 만나는가?

3. **[A]** (y=f(x)) 의 그래프를 오른쪽으로 3만큼 이동한 식을 고르시오.

4. **[A]** (y=x^2+4x+3) 의 꼭짓점을 구하시오.

5. **[R]** 판별식을 사용하면 그래프를 그리지 않고도 근의 개수를 어떻게 판단할 수 있는지 설명하시오.

---

### C-2. Trig and Coordinate Modelling Studio

**목표**
직선, 좌표, 라디안, 호의 길이, 삼각함수 그래프를 모델링 맥락으로 익힌다.

**커리큘럼 근거**
고등 단계 자료에는 straight line graphs, gradients, trigonometry, radians, coordinate methods가 포함되고, 수학이 실생활 및 다른 학문과 연결되도록 설계되어 있다. 

**수업 인터랙션**

* unit circle animator
* degree/radian converter
* line equation builder
* real-world wave graph

**평가 비중**

* K 1
* U 2
* A 2
* R 3

**리포트 포인트**

* trig visualization
* coordinate modelling
* graph interpretation

#### 샘플 문항 5개

1. **[K]** (180^\circ) 를 라디안으로 나타내시오.

2. **[U]** 점 (1,2), (3,6)을 지나는 직선의 기울기를 구하시오.

3. **[A]** 반지름 5, 중심각 ( \pi/2 ) 인 부채꼴의 호의 길이를 구하시오.

4. **[A]** (y=mx+c) 에서 (m) 이 커질수록 그래프가 어떻게 바뀌는지 고르시오.

5. **[R]** 라디안을 쓰면 호의 길이 계산이 왜 더 직접적인지 설명하시오.

---

### C-3. Calculus and Uncertainty Studio

**목표**
미분, 접선, 변화율, 정지점, 기초 통계/확률 해석을 연결한다.

**커리큘럼 근거**
고등 공식 자료에는 differentiation, tangents and normal, rates of change, stationary points, second derivatives, representing data, mean/median/mode, standard deviation이 포함된다. 

**수업 인터랙션**

* tangent drag
* stationary point detector
* derivative motion visualizer
* distribution table builder

**평가 비중**

* K 1
* U 2
* A 2
* R 3

**리포트 포인트**

* rate-of-change understanding
* calculus interpretation
* uncertainty reasoning

#### 샘플 문항 5개

1. **[K]** (y=x^3) 의 도함수를 구하시오.

2. **[U]** 정지점(stationary point)의 의미를 가장 잘 설명한 것을 고르시오.

3. **[A]** (y=x^2-4x+1) 의 정지점의 x좌표를 구하시오.

4. **[A]** 속도-시간 그래프 아래 넓이가 의미하는 값을 고르시오.

5. **[R]** 미분값이 양수에서 음수로 바뀌면 왜 최대점이 될 가능성이 높은지 설명하시오.

---

# 7. 반응형 평가 설계

## 7-1. Pool Structure

각 모듈당

* 전체 문항 풀: 16-20문항
* 실제 출제: 8문항
* anchor items: 3문항
* adaptive items: 5문항

## 7-2. Domain Target

* 1-5: K/U/A/R 균형형
* 6-10: K/U/A/R 균형형
* 11-12: R 비중 강화형

## 7-3. Difficulty Ladder

* Level 1: recall / recognition
* Level 2: concept mapping
* Level 3: familiar application
* Level 4: multi-step application
* Level 5: reasoning / explanation

## 7-4. Routing Rule

* anchor 3문항 중 2개 이상 정답 → 중간 난이도 시작
* 1개 이하 정답 → supportive branch
* reasoning short response 질이 높으면 challenge branch
* 연속 오답 2회 → hint-enabled remediation item

오만 평가 문서는 continuous assessment를 **tests, quizzes, homework, oral work, projects**로 구현하고, e-assessment를 **교육용 소프트웨어와 학생 응답 분석을 통한 판단**으로 정의한다. 따라서 adaptive engine은 단순 점수 계산기가 아니라 **형성평가 + 보고 엔진**으로 설명하는 것이 오만 교육부 관점에 더 잘 맞는다. 

---

# 8. 리포트 설계

## 8-1. Student Report Schema

* student_id
* module_id
* overall_mastery
* concept_scores[]
* cognitive_scores {K,U,A,R}
* official_summary_scores {K,A,R}
* misconceptions[]
* recommended_next_modules[]
* teacher_comment

## 8-2. Teacher Dashboard Schema

* class_id
* module_id
* avg_mastery
* mastery_by_concept[]
* mastery_by_domain[]
* weak_group_ids[]
* misconception_distribution[]
* suggested_reteach_points[]
* suggested_group_tasks[]

## 8-3. Narrative Comment Examples

* “학생은 분수-백분율 전환은 가능하지만 비례 상황에서 적용 정확도가 떨어집니다.”
* “학생은 함수 규칙을 찾는 능력은 높으나 그래프 해석형 문항에서 오류가 반복됩니다.”
* “학생은 미분 계산은 가능하지만 변화율의 의미를 설명하는 추론형 응답이 약합니다.”

---

# 9. 개발 요구사항

## 9-1. Frontend

* Next.js
* TypeScript
* Canvas/SVG interactive layer
* Chart library for dashboard
* i18n structure (EN/AR)

## 9-2. Backend

* FastAPI 또는 NestJS
* adaptive engine service
* scoring service
* reporting service
* curriculum tagging service

## 9-3. Data Model

* curriculum_band
* strand
* grade_tag
* objective_tag
* cognitive_domain_tag
* difficulty
* language
* media_assets

## 9-4. Offline-Ready Architecture (Phase 2)

* local content pack
* local assessment engine
* encrypted local storage
* delayed sync queue
* printable/exportable report pack

---

# 10. MVP 우선순위

## Sprint 1

* Teacher Home
* Lesson Player 공통 틀
* Student Assessment 공통 틀
* A-1 / B-1 / C-1 3개 flagship 모듈
* Student Report v1
* Teacher Dashboard v1

## Sprint 2

* 나머지 6개 모듈
* Arabic UI labels
* misconception rule engine
* printable PDF report
* class grouping logic

## Sprint 3

* offline prototype
* local item bank package
* admin curriculum map
* analytics export

---

# 11. 발표용 데모 시나리오 추천

## 7분 버전

1. 교사가 **B-1 Algebra and Graphs Studio** 시작
2. 2분간 function machine / graph 변환 시연
3. 학생 3명 가상 응답으로 adaptive 평가 진행
4. 즉시 학생 리포트 1개 보여주기
5. 교사 대시보드에서 “추론 약군” 확인
6. 다음 수업 추천으로 연결

## 12분 버전

* 1-5에서 A-1
* 6-10에서 B-2
* 11-12에서 C-1
  를 각각 2-3분씩 짧게 보여주며 “전 학년 확장 가능성”을 강조

---

# 12. PRD에 바로 넣을 요약 문안

본 데모는 오만 개편 수학과정의 strand와 learning outcomes에 맞춘 9개 인터랙티브 모듈로 구성된다. 각 모듈은 교실 수업용 콘텐츠, 반응형 평가, 학생 개별 리포트, 교사 대시보드로 이어지는 단일 학습 흐름을 제공한다. 평가 엔진은 TIMSS 대응 과정에서 정착된 Knowledge, Understanding, Application, Reasoning 프레임과 오만 현행 수학 평가 문서의 knowledge, application, reasoning 요약 구조를 함께 반영한다. 이를 통해 교사용 진단 정밀도와 행정/학부모 보고의 단순성을 동시에 확보한다. 오만 공식 자료에 제시된 1-6, 7-10, 11-12 수학 주제 분포와 학습목표를 기반으로 모듈을 선정하여, 국가 커리큘럼과의 정렬성을 시연 수준에서 명확히 보여준다. 


