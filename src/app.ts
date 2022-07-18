import { Calculator } from "../utils/calculator";

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

const calculator = new Calculator($calculatorResult);

$numberButtons.forEach(($numberButton) => {
  $numberButton.addEventListener("click", () => {
    calculator.selectNumber($numberButton.innerText);
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
