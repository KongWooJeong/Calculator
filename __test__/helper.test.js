import {
  checkExponentialNumber,
  convertExponentialToFloat,
} from "../utils/helper";

describe("checkExponentialNumber function testing", () => {
  test("Check exponential number", () => {
    const exponentialNumber = "1e+3";
    const number = "3";

    expect(checkExponentialNumber(exponentialNumber)).toBe(true);
    expect(checkExponentialNumber(number)).toBe(false);
  });
});

describe("convertExponentialToFloat function testing", () => {
  test("Check convert exponentialNumber to float number", () => {
    const exponentialNumber = "1e+3";
    const anotherExponentialNumber = "1e-3";

    expect(convertExponentialToFloat(exponentialNumber)).toBe("100");
    expect(convertExponentialToFloat(anotherExponentialNumber)).toBe("0.001");
  });
});
