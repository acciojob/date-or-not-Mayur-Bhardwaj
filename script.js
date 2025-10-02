var isDate = function (input) {
  // Handle null/empty or non-string
  if (!input || typeof input !== "string") return false;

  let parts = [];
  let temp = "";

  // Manually break the string into parts (no split used)
  for (let i = 0; i < input.length; i++) {
    let ch = input[i];
    if (ch === "-" || ch === "/") {
      if (temp === "") return false; // Consecutive separators
      parts.push(temp);
      temp = "";
    } else {
      // Must be digit
      let code = input.charCodeAt(i);
      if (code < 48 || code > 57) return false; // Not a digit
      temp += ch;
    }
  }
  if (temp !== "") parts.push(temp);

  // Must have exactly 3 parts
  if (parts.length !== 3) return false;

  // Validate part lengths (e.g., year should be 4 digits, month/day 1-2 digits)
  if (parts[0].length < 1 || parts[1].length < 1 || parts[2].length < 1) return false;

  // Convert parts to numbers manually
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

  // Guess format: YYYY-MM-DD or DD/MM/YYYY
  if (a >= 1000 && parts[0].length === 4) { // Year first, enforce 4-digit year
    year = a;
    month = b;
    day = c;
  } else if (c >= 1000 && parts[2].length === 4) { // Year last, enforce 4-digit year
    day = a;
    month = b;
    year = c;
  } else {
    return false; // Ambiguous or invalid year
  }

  // Validate ranges
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  if (year < 1000 || year > 9999) return false;

  // Validate days based on month
  const daysInMonth = [
    31, // January
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28, // February (leap year check)
    31, // March
    30, // April
    31, // May
    30, // June
    31, // July
    31, // August
    30, // September
    31, // October
    30, // November
    31  // December
  ];

  if (day > daysInMonth[month - 1]) return false;

  return true;
};