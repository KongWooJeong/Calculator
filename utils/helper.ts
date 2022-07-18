function checkExponentialNumber(number: string) {
  return number.includes("e");
}

function convertExponentialToFloat(targetNumber: string) {
  const number: string = targetNumber.split("e")[0];
  const exponentialNumber: string = targetNumber.split("e")[1];
  let result = "";

  if (exponentialNumber[0] === "-") {
    const fraction: string = number.replace(".", "");
    const exponent: number = parseInt(exponentialNumber.slice(1));
    let temp = "0.";

    for (let i = 1; i < exponent; i++) {
      temp += "0";
    }

    result = temp + fraction;
  } else if (exponentialNumber[0] === "+") {
    const fraction: string = number;
    const exponent: number = parseInt(exponentialNumber.slice(1));
    let temp = "";

    for (let i = 1; i < exponent; i++) {
      temp += "0";
    }

    result = fraction + temp;
  }

  return result;
}

export { checkExponentialNumber, convertExponentialToFloat };
