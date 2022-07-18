

# 💻 Calculator

<br>

# 💡 실행 방법
```
 npm install

 npm start
```

<br>

# 🔍 외부 라이브러리

### webpack, babel, eslint
- 사용 이유
  - eslint: 일정한 규칙에 맞는 코드 퀄리티 및 스타일을 유지하기 위해 eslint를 적용하였습니다.
  - webpack, babel: es6 구문 및 타입스크립트를 사용하여 브라우저 호환성 개선 하기 위해 babel을 사용하였고 webpack을 활용하여 여러 스크립트 요청을 피하기 위해 자바스크립트를 번들하여 사용하였습니다.

<br>

# 🛠 문제 정의 및 접근 방법, 해결 방법
- 숫자 버튼 클릭 시 화면에 클릭한 숫자 표시
  - 숫자만 연속으로 입력 시 문자열로 연결하여 반환합니다.
- dot(.) 입력 시
  - 현재 피연산자가 0이면 문자열 0에 문자열 dot(.) 연결하여 반환합니다.
  - 현재 피연산자가 존재하지 않는다면("", 빈 문자열) 현재 피연산자에 0 할당하여 dot(.) 연결하여 반환합니다.
  - 현재 피연산자에 dot(.)이 존재한다면 문자열 dot(.)을 연결하지 않고 반환합니다.
- 숫자 0 입력 시
  - 현재 피연산자가 0이면 문자열 0을 연결하지 않고 반환합니다.
- 숫자 1,2,3,4,5,6,7,8,9 입력 시
  - 현재 피연산자가 문자열 0이면 현재 피연산자 빈 문자열("") 할당하고 숫자를 연결하고 반환합니다.
- 연산자(+, -, /, *) 입력 시
  - 현재 피연산자가 존재하지 않는다면(빈 문자열, "") 연산 관련 로직을 수행하지 않는다.
  - 이전 피연산자가 존재한다면 연산 관련 로직 수행합니다.
  - 현재 피연산자가 존재한다면 입력한 연산자 저장, 현재 피연산자를 이전 피연산자로 할당, 현재 피연산자를 빈 문자열("") 초기화합니다.
- 연산 수행
    - 이전 피연산자, 현재 피연산자, 연산자를 활용하여 연산을 수행합니다.
    - 각 피연산자가 문자열이므로 숫자로 변환하여 해당 연산을 수행합니다.
    - 연산 수행 완료후
      - 결괏값을 현재 피연산자에 할당합니다.
      - 연산자, 이전 피연산자를 빈 문자열로 초기화합니다.
- 화면에 숫자 하나만 표기
  - 숫자 -> 연산자 -> 숫자 입력 후 연산자 입력 시 이전 피연산자, 현재 피연산자, 이전에 입력했던 연산자를 활용하여 연산 수행 후 결괏값을 화면에 표시한다.
- 상태 초기화 버튼(C) 클릭 시
  - 현재 피연산자, 이전 피연산자, 연산자, 화면에 표시된 값 모두 초기화합니다.
- +/- 버튼 클릭 시 양수/음수로 전환
  - 숫자 버튼 클릭 후 +/- 버튼 클릭 시
    - 현재 피연산자 "-" 포함하고 있다면 양수로 변환하여 반환합니다.
    - 현재 피연산자 "-" 포함하고 있지 않는다면 음수로 변환하여 반환합니다.
  - 숫자 버튼 클릭 후 연산자 버튼 클릭 후 +/- 버튼 클릭 시
    - 연산자 버튼 클릭 시 현재 피연산자가 초기화되므로 이전 피연산자를 사용하여 위와 같은 논리로 적용합니다.
    - 현재 피연산자가 존재하지 않거나(빈 문자열, "") 0이면 해당 연산 수행하지 않고 반환합니다.
- % 버튼 클릭 시
  - 현재 피연산자가 존재하지 않는다면(빈 문자열, "") percent 로직 수행하지 않고 반환합니다.
  - 현재 피연산자가 존재한다면 현재 피연산자를 100으로 나누는 연산 수행
- 지수 표기를 하지 않고 값 그대로 표기
  - 1e+3이나 1e-3처럼 지수로 표기되었을 때 지수부와 가수부로 나누어서 문자열로 1000이나 0.001로 변환하여 표시하였습니다.

<br>

# 🙏 아쉬운 점 및 개선할 부분

#### 현재 숫자 입력 후 여러 개의 연산자 입력 시 첫 입력한 연산자로 연산을 수행합니다. 이 부분을 마지막으로 입력한 연산자로 연산을 수행하는 방향으로 개선할 수 있을 것 같습니다.

<br />

#### 현재 제가 구현한 계산기에서 "(" ")" 통해 우선순위가 있는 연산 기능이 추가된다면 전체 로직을 수정을 해야 하므로 기능 확장성이 조금 아쉬운 부분이 있는 것 같습니다. 이 부분을 스택 구조를 통하여 로직을 개선하게 된다면 기능에 대하여 확장성을 개선할 수 있을 것 같습니다.
