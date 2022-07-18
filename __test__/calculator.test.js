/**
 * @jest-environment jsdom
 */

import Calculator from "../utils/calculator";

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
