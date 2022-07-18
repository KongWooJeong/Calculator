function checkExponentialNumber(number: string) {
  return number.includes("e");
}

function convertExponentialToFloat(targetNumber: string) {
  const targetNumberArray: string[] = targetNumber.split("e");
  const fractionNumber: string = targetNumberArray[0];
  const exponentialNumber: string = targetNumberArray[1];
  const exponent: number = parseInt(exponentialNumber.slice(1));

  let result = "";

  if (exponentialNumber[0] === "-") {
    const fraction: string = fractionNumber.replace(".", "");
    let temp = "0.";

    for (let i = 1; i < exponent; i++) {
      temp += "0";
    }

    result = temp + fraction;
  } else if (exponentialNumber[0] === "+") {
    const fraction: string = fractionNumber;
    let temp = "";

    for (let i = 1; i < exponent; i++) {
      temp += "0";
    }

    result = fraction + temp;
  }

  return result;
}

export { checkExponentialNumber, convertExponentialToFloat };
