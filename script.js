var isDate = function (input) {
  // handle null/empty
  if (!input || typeof input !== "string") return false;

  let parts = [];
  let temp = "";

  // manually break the string into parts (no split used)
  for (let i = 0; i < input.length; i++) {
    let ch = input[i];
    if (ch === "-" || ch === "/") {
      if (temp === "") return false; // consecutive separators
      parts.push(temp);
      temp = "";
    } else {
      // must be digit
      let code = input.charCodeAt(i);
      if (code < 48 || code > 57) return false; // not a digit
      temp += ch;
    }
  }
  if (temp !== "") parts.push(temp);

  // must have exactly 3 parts
  if (parts.length !== 3) return false;

  // convert parts to numbers manually
  function toNumber(str) {
    let num = 0;
    for (let i = 0; i < str.length; i++) {
      num = num * 10 + (str.charCodeAt(i) - 48);
    }
    return num;
  }

  let a = toNumber(parts[0]);
  let b = toNumber(parts[1]);
  let c = toNumber(parts[2]);

  let year, month, day;

  // guess format: YYYY-MM-DD or DD/MM/YYYY
  if (a > 31) {         // must be year first
    year = a; month = b; day = c;
  } else if (c > 31) {  // must be year last
    day = a; month = b; year = c;
  } else {
    return false; // ambiguous like 10-10-10
  }

  // validate ranges
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  if (year <= 0) return false;

  return true;
};

// Do not change the code below. 
const input = prompt("Enter Date.");
alert(isDate(input));
