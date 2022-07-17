interface CalculatorInfo {
  previousOperand: string;
  currentOperand: string;
  operation: string;
  displayedResult: string;
}

const $calculatorResult: HTMLInputElement | null =
  document.querySelector(".calculator-result");

const $numberContainer: HTMLDivElement | null =
  document.querySelector(".number-container");
const $signContainer: HTMLDivElement | null =
  document.querySelector(".sign-container");

const calculatorInfo: CalculatorInfo = {
  previousOperand: "",
  currentOperand: "",
  operation: "",
  displayedResult: "",
};

$numberContainer?.addEventListener("click", ({ target }: MouseEvent) => {
  const $button: HTMLButtonElement = target as HTMLButtonElement;

  if ($button.className === "number-container") {
    return;
  }

  calculatorInfo.currentOperand += $button.innerText;
  calculatorInfo.displayedResult = calculatorInfo.currentOperand;
  updateDisplay(calculatorInfo);
});

$signContainer?.addEventListener("click", ({ target }: MouseEvent) => {
  const $button: HTMLButtonElement = target as HTMLButtonElement;

  if ($button.className === "sign-container") {
    return;
  }
  const selectedOperation = $button.innerText;
  const { currentOperand } = calculatorInfo;

  if (selectedOperation === "=") {
    calculatorInfo.currentOperand = calculate(calculatorInfo);
    calculatorInfo.previousOperand = currentOperand;
    calculatorInfo.operation = "";
  } else {
    selectOperation(calculatorInfo, $button.innerText);
  }

  updateDisplay(calculatorInfo);
});

// module

function selectOperation(
  calculatorInfo: CalculatorInfo,
  selectedOperation: string
) {
  const { currentOperand, previousOperand } = calculatorInfo;

  if (currentOperand === "") {
    return;
  }

  if (previousOperand !== "") {
    calculate(calculatorInfo);
  }

  calculatorInfo.operation = selectedOperation;
  calculatorInfo.previousOperand = currentOperand;
  calculatorInfo.currentOperand = "";
}

function updateDisplay(calculatorInfo: CalculatorInfo) {
  const { displayedResult } = calculatorInfo;

  if ($calculatorResult) {
    $calculatorResult.value = displayedResult;
  }
}

function calculate(calculatorInfo: CalculatorInfo): string {
  let result: number | null = null;

  const { operation, previousOperand, currentOperand } = calculatorInfo;

  switch (operation) {
    case "+":
      result = parseFloat(previousOperand) + parseFloat(currentOperand);
      break;
    case "-":
      result = parseFloat(previousOperand) - parseFloat(currentOperand);
      break;
    case "*":
      result = parseFloat(previousOperand) * parseFloat(currentOperand);
      break;
    case "/":
      result = parseFloat(previousOperand) / parseFloat(currentOperand);
      break;
    case "%":
      console.log("%");
      break;
    default:
      break;
  }

  if (result) {
    calculatorInfo.currentOperand = result.toString();
    calculatorInfo.displayedResult = result.toString();
    calculatorInfo.previousOperand = "";
    return result.toString();
  }

  return "";
}
