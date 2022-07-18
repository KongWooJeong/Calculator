/**
 * @jest-environment jsdom
 */

import { Calculator } from "../utils/calculator";

describe("Calculator selectNumber method testing", () => {
  test("Check when a number is entered", () => {
    const mockDivElement = document.createElement("div");

    const calculator = new Calculator(mockDivElement);

    calculator.selectNumber("1");

    expect(calculator.currentOperand).toBe("1");
    expect(calculator.displayedResult).toBe("1");

    calculator.selectNumber("2");

    expect(calculator.currentOperand).toBe("12");
    expect(calculator.displayedResult).toBe("12");
  });

  test("Check when the number 0 is entered", () => {
    const mockDivElement = document.createElement("div");

    const calculator = new Calculator(mockDivElement);

    calculator.selectNumber("0");
    calculator.selectNumber("0");
    calculator.selectNumber("0");

    expect(calculator.currentOperand).toBe("0");
    expect(calculator.displayedResult).toBe("0");

    calculator.selectNumber("1");
    calculator.selectNumber("0");
    calculator.selectNumber("0");

    expect(calculator.currentOperand).toBe("100");
    expect(calculator.displayedResult).toBe("100");
  });

  test("Check when the dot . is entered", () => {
    const mockDivElement = document.createElement("div");

    const calculator = new Calculator(mockDivElement);

    calculator.selectNumber(".");

    expect(calculator.currentOperand).toBe("0.");
    expect(calculator.displayedResult).toBe("0.");

    calculator.selectNumber(".");
    calculator.selectNumber(".");

    expect(calculator.currentOperand).toBe("0.");
    expect(calculator.displayedResult).toBe("0.");

    calculator.selectNumber("2");
    calculator.selectNumber(".");
    calculator.selectNumber(".");
    calculator.selectNumber("1");
    calculator.selectNumber("5");

    expect(calculator.currentOperand).toBe("0.215");
    expect(calculator.displayedResult).toBe("0.215");
  });

  test("Check when entering a dot after entering a number", () => {
    const mockDivElement = document.createElement("div");

    const calculator = new Calculator(mockDivElement);

    calculator.selectNumber("2");
    calculator.selectNumber(".");
    calculator.selectNumber(".");
    calculator.selectNumber("1");
    calculator.selectNumber("1");

    expect(calculator.currentOperand).toBe("2.11");
    expect(calculator.displayedResult).toBe("2.11");
  });
});

describe("Calculator selectOperator method testing", () => {
  test("Check if the current operand and previous operand does not exist", () => {
    const mockDivElement = document.createElement("div");

    const calculator = new Calculator(mockDivElement);

    jest.spyOn(calculator, "caculate");

    calculator.selectOperator("+");
    calculator.selectOperator("-");
    calculator.selectOperator("*");
    calculator.selectOperator("÷");

    expect(calculator.caculate).toHaveBeenCalledTimes(0);
    expect(calculator.operator).toBe("");
    expect(calculator.previousOperand).toBe("");
    expect(calculator.currentOperand).toBe("");
  });

  test("Check if current operand exists and previous operand does not exist", () => {
    const mockDivElement = document.createElement("div");

    const calculator = new Calculator(mockDivElement);

    jest.spyOn(calculator, "caculate");

    calculator.currentOperand = "1";

    calculator.selectOperator("+");

    expect(calculator.caculate).toHaveBeenCalledTimes(0);
    expect(calculator.operator).toBe("+");
    expect(calculator.previousOperand).toBe("1");
    expect(calculator.currentOperand).toBe("");
  });

  test("Check if current operand exists, previous operand, operator exist", () => {
    const mockDivElement = document.createElement("div");

    const calculator = new Calculator(mockDivElement);

    jest.spyOn(calculator, "caculate");

    calculator.currentOperand = "1";
    calculator.operator = "+";
    calculator.previousOperand = "1";

    calculator.selectOperator("-");

    expect(calculator.caculate).toHaveBeenCalled();
    expect(calculator.operator).toBe("-");
    expect(calculator.previousOperand).toBe("2");
    expect(calculator.currentOperand).toBe("");
  });
});

describe("Calculator updateDisplay method testing", () => {
  test("Check if the result is shown on the screen", () => {
    const mockDivElement = document.createElement("div");

    const calculator = new Calculator(mockDivElement);

    calculator.displayedResult = "10";
    calculator.updateDisplay();

    expect(mockDivElement.innerText).toBe("10");
  });
});

describe("Calculator clear method testing", () => {
  test("Check if all properties are initialized", () => {
    const mockDivElement = document.createElement("div");

    const calculator = new Calculator(mockDivElement);

    calculator.currentOperand = "1";
    calculator.operator = "+";
    calculator.previousOperand = "1";
    calculator.displayedResult = "3";

    calculator.clear();

    expect(calculator.currentOperand).toBe("");
    expect(calculator.previousOperand).toBe("");
    expect(calculator.operator).toBe("");
    expect(calculator.displayedResult).toBe("0");
  });
});

describe("Caculator setPercent method testing", () => {
  test("Check whether the setPercent function works", () => {
    const mockDivElement = document.createElement("div");

    const mockCalculate = (Calculator.prototype.caculate = jest.fn());
    const calculator = new Calculator(mockDivElement);

    calculator.currentOperand = "1";
    calculator.setPercent();

    expect(calculator.operator).toBe("÷");
    expect(calculator.previousOperand).toBe("1");
    expect(calculator.currentOperand).toBe("100");
    expect(mockCalculate).toHaveBeenCalled();
  });

  test("Check if the setPercent function does not work if the current operand does not exist", () => {
    const mockDivElement = document.createElement("div");

    const mockCalculate = (Calculator.prototype.caculate = jest.fn());
    const calculator = new Calculator(mockDivElement);

    calculator.setPercent();

    expect(mockCalculate).toHaveBeenCalledTimes(0);
  });
});

describe("Caculator changePlusMinusSign method testing", () => {
  test("Check when the current operand does not exist or is 0 and the result displayed on the screen is 0", () => {
    const mockDivElement = document.createElement("div");

    const calculator = new Calculator(mockDivElement);

    calculator.changePlusMinusSign();

    expect(calculator.displayedResult).toBe("0");
    expect(calculator.currentOperand).toBe("");

    calculator.currentOperand = "0";

    expect(calculator.displayedResult).toBe("0");
    expect(calculator.currentOperand).toBe("0");
  });

  test("Check if the current operand exists", () => {
    const mockDivElement = document.createElement("div");

    const calculator = new Calculator(mockDivElement);

    calculator.currentOperand = "1";

    calculator.changePlusMinusSign();

    expect(calculator.currentOperand).toBe("-1");
    expect(calculator.displayedResult).toBe("-1");

    calculator.changePlusMinusSign();

    expect(calculator.currentOperand).toBe("1");
    expect(calculator.displayedResult).toBe("1");
  });

  test("Check if the current operand exists and the result displayed on the current screen is not 0, That is, when selecting an operator after selecting a number", () => {
    const mockDivElement = document.createElement("div");

    const calculator = new Calculator(mockDivElement);

    calculator.displayedResult = "1";

    calculator.changePlusMinusSign();

    expect(calculator.displayedResult).toBe("-1");
    expect(calculator.previousOperand).toBe("-1");

    calculator.changePlusMinusSign();

    expect(calculator.displayedResult).toBe("1");
    expect(calculator.previousOperand).toBe("1");
  });
});
