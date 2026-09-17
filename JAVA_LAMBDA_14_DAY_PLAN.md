# 자바 람다 배우기 14일 학습 계획

> 학습 기간: 10일~24일 (14일 학습)
>
> 도서: [자바 람다 배우기 - 람다에 대해 이해하고 활용하기](https://www.acornpub.co.kr/book/java-lambdas)
>
> 저자/역자: 토비 웨슨 / 조승진 · 출판사: 에이콘출판사 · ISBN: 9791161750378
>
> 사용법: `이론 날짜`, `실습 날짜`, `시간` 칸은 실제 공부한 뒤 기록한다. 14일 동안 책 목차를 따라가며 학습하고, 매일 응용 내용을 남긴다.

## 1. 책을 선정한 이유

AI 에이전트는 일반 메서드와 람다 함수를 모두 생성한다. 중요한 능력은 람다의 사용 비율을 높이는 것이 아니라, 생성된 코드에서 다음을 판단하는 것이다.

- 이 코드는 이름이 있는 일반 메서드가 더 읽기 쉬운가?
- 짧은 일회성 동작이나 콜백으로 람다를 쓰는 것이 적절한가?
- 함수형 인터페이스, 메서드 참조, 타입 추론이 코드를 명확하게 만드는가?
- 람다의 스코프·예외·클로저 특성이 테스트와 디버깅에 어떤 영향을 주는가?

목차가 개념의 순서를 제공하므로, AI가 제시한 코드를 그대로 복사하지 않고 문법·타입·실행 흐름을 역으로 설명하는 기반을 만들기 위해 이 책을 선정한다.

## 2. 10일~24일 학습 목표

1. Java 람다 문법을 직접 작성하고 일반 메서드와 변환할 수 있다.
2. 함수형 인터페이스와 `@FunctionalInterface`의 조건을 설명할 수 있다.
3. 타입 추론, 대상 타이핑, 메서드 참조의 동작을 코드로 확인할 수 있다.
4. 유사 파이널 변수, 예외 처리, 콜백, 클로저 차이를 설명할 수 있다.
5. 바이트코드 개요와 메서드 시그니처 변환을 관찰할 수 있다.
6. AI가 생성한 일반 함수·람다 코드를 가독성, 테스트 가능성, 변경 비용 기준으로 리뷰할 수 있다.
7. Java의 람다 개념을 C# delegate·lambda와 비교하되 두 언어의 차이를 섞어 말하지 않는다.

## 3. 도서 목차 정리

### 1장. 도입

- 모던 자바로의 길
  - 모던 자바의 기능들

### 2장. 람다 소개

- 함수형 프로그래밍에서 람다(λ)
  - 1930년대와 람다 대수
  - 1950년대와 리스프
  - 람다란 무엇인가
- 함수와 클래스
  - 최신 자바의 람다
  - 이론상의 차이점
  - 함수와 클래스
  - 점유 문법과 가려진 변수
- 람다(λ) 기본 문법
  - 문법 상세 내역

### 3장. 람다 깊이 이해하기

- 함수형 인터페이스
  - `@FunctionalInterface`, 상속, 인터페이스 개선 사항
- 타입 추론 개선 사항
  - 자바의 타입 추론
  - 람다를 위한 대상 타이핑
  - 메서드 호출·연쇄 메서드 호출 시의 타입 인자
- 메서드 참조
  - 생성자, 정적 메서드, 특정 객체의 인스턴스 메서드 참조
  - 임의 객체의 인스턴스 메서드 참조
- 변수 범위
  - 유사 파이널과 파이널 우회
- 예외 처리
  - 콜백, 람다 작성 중 예외, 람다 호출자에서의 오류 처리
- 람다와 클로저
  - 기본·기타 차이점
  - 바이트코드 개요, 기술자, 메서드 시그니처 변환
  - 예제 1~5와 메서드 참조 변형

## 4. 14일 학습 기록표

| 일차 | 목차 기반 학습 범위 | 이론 날짜 | 실습 날짜 | 응용 내용 | 관련 YouTube 링크 | 시간 | 완료 |
|---:|---|---|---|---|---|---|:---:|
| 1 | 1장: 모던 자바로의 길 | ____ | ____ | Java 버전과 람다 도입 배경을 5문장으로 정리 | [Java 8 람다 소개 검색](https://www.youtube.com/results?search_query=Java+8+lambda+introduction) | __분 | [ ] |
| 2 | 1장: 모던 자바의 기능들 | ____ | ____ | 람다·인터페이스·스트림의 관계를 그림으로 정리 | [Modern Java features 검색](https://www.youtube.com/results?search_query=modern+Java+features+lambda+functional+interface) | __분 | [ ] |
| 3 | 2장: 함수형 프로그래밍, 람다 대수, 리스프 | ____ | ____ | 명령형 코드와 함수형 코드를 같은 문제로 비교 | [Lambda calculus for programmers 검색](https://www.youtube.com/results?search_query=lambda+calculus+for+programmers) | __분 | [ ] |
| 4 | 2장: 람다란 무엇인가, 함수와 클래스 | ____ | ____ | 익명 클래스와 람다를 같은 동작으로 작성 | [Java anonymous class vs lambda 검색](https://www.youtube.com/results?search_query=Java+anonymous+class+vs+lambda) | __분 | [ ] |
| 5 | 2장: 람다 기본 문법 | ____ | ____ | 매개변수 0·1·2개, 블록식·표현식 람다 작성 | [Java lambda syntax 검색](https://www.youtube.com/results?search_query=Java+lambda+expression+syntax) | __분 | [ ] |
| 6 | 3장: 함수형 인터페이스 | ____ | ____ | `Runnable`, `Supplier`, `Consumer`, `Function`, `Predicate` 예제 작성 | [Java functional interfaces 검색](https://www.youtube.com/results?search_query=Java+functional+interfaces+Runnable+Supplier+Consumer+Function+Predicate) | __분 | [ ] |
| 7 | 3장: `@FunctionalInterface`와 상속 | ____ | ____ | 사용자 정의 함수형 인터페이스와 컴파일 실패 사례 만들기 | [Java FunctionalInterface annotation 검색](https://www.youtube.com/results?search_query=Java+FunctionalInterface+annotation) | __분 | [ ] |
| 8 | 3장: 타입 추론과 대상 타이핑 | ____ | ____ | 명시적 타입과 추론 타입을 바꾸며 컴파일 오류 기록 | [Java lambda target typing type inference 검색](https://www.youtube.com/results?search_query=Java+lambda+target+typing+type+inference) | __분 | [ ] |
| 9 | 3장: 메서드 참조 | ____ | ____ | 람다를 정적·인스턴스·생성자 참조로 리팩터링 | [Java method reference 검색](https://www.youtube.com/results?search_query=Java+method+reference+constructor+static+instance) | __분 | [ ] |
| 10 | 3장: 변수 범위와 유사 파이널 | ____ | ____ | 캡처 가능한 변수와 변경 가능한 변수의 차이 실험 | [Java effectively final lambda 검색](https://www.youtube.com/results?search_query=Java+effectively+final+lambda) | __분 | [ ] |
| 11 | 3장: 예외 처리와 콜백 | ____ | ____ | 체크 예외를 람다·호출자에서 처리하는 두 방식 비교 | [Java lambda checked exception callback 검색](https://www.youtube.com/results?search_query=Java+lambda+checked+exception+callback) | __분 | [ ] |
| 12 | 3장: 람다와 클로저 | ____ | ____ | Java 람다의 캡처와 다른 언어의 클로저를 비교표로 작성 | [Java lambda closure 검색](https://www.youtube.com/results?search_query=Java+lambda+closure+captured+variables) | __분 | [ ] |
| 13 | 3장: 바이트코드·기술자·시그니처 변환 | ____ | ____ | `javap`로 일반 메서드와 람다 생성 결과 관찰 | [Java lambda bytecode invokedynamic javap 검색](https://www.youtube.com/results?search_query=Java+lambda+bytecode+invokedynamic+javap) | __분 | [ ] |
| 14 | 1~3장 1회독 통합·회고 | ____ | ____ | 작은 필터·정렬 프로그램을 일반 메서드와 람다 두 방식으로 작성하고 AI 코드 선택 기준 기록 | [Java lambda practical example 검색](https://www.youtube.com/results?search_query=Java+lambda+practical+example+filter+sort) | __분 | [ ] |

## 5. 매일 남길 기록

- 오늘 배운 개념:
- 직접 작성한 코드와 실행 결과:
- 일반 메서드와 람다 중 선택한 이유:
- AI가 만든 코드에서 수정하거나 되물은 부분:
- 막힌 점과 다음 날 첫 행동:

## 6. 완료 기준

- 문법을 외운 것이 아니라, 람다를 일반 메서드로 풀어 설명할 수 있다.
- 함수형 인터페이스와 타입 추론 오류를 컴파일러 메시지로 좁혀 갈 수 있다.
- 람다를 사용하지 않는 편이 나은 사례를 말할 수 있다.
- Java와 C#의 유사한 표현을 같은 언어 기능이라고 단정하지 않는다.
- AI 생성 코드에서 람다 사용을 검토하고 선택 근거를 기록할 수 있다.
