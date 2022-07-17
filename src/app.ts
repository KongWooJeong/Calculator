const $calculatorResult: HTMLDivElement | null =
  document.querySelector(".current-operand");

const $numberButtons = document.querySelectorAll(
  "[data-number]"
) as NodeListOf<HTMLElement>;
const $operationButtons = document.querySelectorAll(
  "[data-operation]"
) as NodeListOf<HTMLElement>;

const $clearButton: HTMLButtonElement | null =
  document.querySelector("[data-clear]");
const $plusMinusSignButton: HTMLButtonElement | null = document.querySelector(
  "[data-plusMinus-sign]"
);
const $percentButton: HTMLButtonElement | null =
  document.querySelector("[data-percent]");
const $equalButton: HTMLButtonElement | null =
  document.querySelector("[data-equal]");

class Calculator {
  calculatorResultElement: HTMLDivElement | null;
  currentOperand: string;
  previousOperand: string;
  operator: string;
  displayedResult: string;

  constructor(calculatorResultElement: HTMLDivElement | null) {
    this.calculatorResultElement = calculatorResultElement;
    this.currentOperand = "";
    this.previousOperand = "";
    this.operator = "";
    this.displayedResult = "0";
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operator = "";
    this.displayedResult = "0";
  }

  setPercent() {
    if (this.currentOperand === "") {
      return;
    }

    this.operator = "/";
    this.previousOperand = this.currentOperand;
    this.currentOperand = "100";

    this.caculate();
  }

  changePlusMinusSign() {
    if (this.currentOperand === "" && this.displayedResult !== "0") {
      if (this.displayedResult[0] === "-") {
        this.displayedResult = this.displayedResult.slice(1);
      } else {
        this.displayedResult = "-" + this.displayedResult;
      }

      this.previousOperand = this.displayedResult;

      return;
    } else if (this.currentOperand === "" || this.currentOperand === "0") {
      return;
    }

    if (this.currentOperand[0] === "-") {
      this.currentOperand = this.currentOperand.slice(1);
    } else {
      this.currentOperand = "-" + this.currentOperand;
    }

    this.displayedResult = this.currentOperand;
  }

  selectNubmer(number: string) {
    if (number === "." && this.currentOperand.includes(".")) {
      return;
    }

    if (this.currentOperand === "0" && number === "0") {
      return;
    }

    if (
      (this.currentOperand === "" || this.currentOperand === "0") &&
      number === "."
    ) {
      this.currentOperand = "0";
    } else if (this.currentOperand === "0") {
      this.currentOperand = "";
    }

    this.currentOperand += number;
    this.displayedResult = this.currentOperand;
  }

  selectOperator(operator: string) {
    if (this.currentOperand === "") {
      return;
    }

    if (this.previousOperand !== "") {
      this.caculate();
    }

    this.operator = operator;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  caculate() {
    let caculationResult;
    const previousNumber = parseFloat(this.previousOperand);
    const currentNumber = parseFloat(this.currentOperand);

    switch (this.operator) {
      case "+":
        caculationResult = previousNumber + currentNumber;
        break;
      case "-":
        caculationResult = previousNumber - currentNumber;
        break;
      case "*":
        caculationResult = previousNumber * currentNumber;
        break;
      case "÷":
        caculationResult = previousNumber / currentNumber;
        break;
      default:
        return;
    }

    const isExponential = checkExponentialNumber(caculationResult.toString());
    let result = "";

    if (isExponential) {
      result = convertExponentialToFloat(caculationResult.toString());
    }

    const calcResult = isExponential ? result : caculationResult.toString();

    this.currentOperand = calcResult;
    this.displayedResult = this.currentOperand;
    this.operator = "";
    this.previousOperand = "";
  }

  updateDisplay() {
    if (this.calculatorResultElement) {
      this.calculatorResultElement.innerText = this.displayedResult;
    }
  }
}

const calculator = new Calculator($calculatorResult);

$numberButtons.forEach(($numberButton) => {
  $numberButton.addEventListener("click", () => {
    calculator.selectNubmer($numberButton.innerText);
    calculator.updateDisplay();
  });
});
$operationButtons.forEach(($operationButton) => {
  $operationButton.addEventListener("click", () => {
    calculator.selectOperator($operationButton.innerText);
    calculator.updateDisplay();
  });
});

$clearButton?.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

$plusMinusSignButton?.addEventListener("click", () => {
  calculator.changePlusMinusSign();
  calculator.updateDisplay();
});

$percentButton?.addEventListener("click", () => {
  calculator.setPercent();
  calculator.updateDisplay();
});

$equalButton?.addEventListener("click", () => {
  calculator.caculate();
  calculator.updateDisplay();
});

function checkExponentialNumber(number: string) {
  return number.includes("e");
}

function convertExponentialToFloat(targetNumber: string) {
  const number: string = targetNumber.split("e")[0];
  const exponentialNumber = targetNumber.split("e")[1];
  let result = "";

  if (exponentialNumber[0] === "-") {
    const fraction = number.replace(".", "");
    const exponent = parseInt(exponentialNumber.slice(1));
    let temp = "0.";

    for (let i = 1; i < exponent; i++) {
      temp += "0";
    }

    result = temp + fraction;
  } else if (exponentialNumber[0] === "+") {
    const fraction = number;
    const exponent = parseInt(exponentialNumber.slice(1));
    let temp = "";

    for (let i = 1; i < exponent; i++) {
      temp += "0";
    }

    result = fraction + temp;
  }

  return result;
}
