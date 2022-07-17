const $calculatorResult: HTMLInputElement | null =
  document.querySelector(".calculator-result");

const $numberContainer: HTMLDivElement | null =
  document.querySelector(".number-container");
const $signContainer: HTMLDivElement | null =
  document.querySelector(".sign-container");

class Calculator {
  calculatorResultElement: HTMLInputElement | null;
  currentOperand: string;
  previousOperand: string;
  operator: string;
  displayedResult: string;

  constructor(calculatorResultElement: HTMLInputElement | null) {
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
    let caculationResult: number;
    const previousNumber: number = parseFloat(this.previousOperand);
    const currentNumber: number = parseFloat(this.currentOperand);

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
      case "/":
        caculationResult = previousNumber / currentNumber;
        break;
      default:
        return;
    }

    this.currentOperand = caculationResult.toString();
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

$numberContainer?.addEventListener("click", ({ target }: MouseEvent) => {
  const $button: HTMLButtonElement = target as HTMLButtonElement;

  if ($button.className === "number-container") {
    return;
  }

  calculator.selectNubmer($button.innerText);
  calculator.updateDisplay();
});

$signContainer?.addEventListener("click", ({ target }: MouseEvent) => {
  const $button: HTMLButtonElement = target as HTMLButtonElement;

  if ($button.className === "sign-container") {
    return;
  }

  if ($button.className === "sign-equal") {
    calculator.caculate();
  } else if ($button.className === "sign-clear") {
    calculator.clear();
  } else if ($button.className === "sign-plus-minus") {
    calculator.changePlusMinusSign();
  } else if ($button.className === "sign-percent") {
    calculator.setPercent();
  } else {
    calculator.selectOperator($button.innerText);
  }

  calculator.updateDisplay();
});
