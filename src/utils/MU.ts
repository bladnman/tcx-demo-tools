export function ymd(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; //months from 1-12
  const day = date.getDate();
  return `${year}-${month}-${day}`;
}

export function ymdhms(date: Date) {
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  return `${ymd(date)} ${pad(h, 2)}:${pad(m, 2)}:${pad(s, 2)}`;
}

export function pad(value: number | string, width: number, char?: string) {
  const valueStr = `${value}`;
  return valueStr.length >= width
    ? valueStr
    : new Array(width - valueStr.length + 1).join(char ?? '0') + valueStr;
}

export function isNoU(value: string | boolean | number | object | undefined | null) {
  return value === undefined || value === null;
}

export function fLeft(
  str: string | null | undefined,
  delim: string | null | undefined,
  defaultValue = '',
) {
  if (!str || !delim) {
    return defaultValue;
  }

  str = `${str}`;
  delim = `${delim}`;

  const theSpot = str.indexOf(delim);
  if (theSpot > -1) {
    return str.substring(0, theSpot);
  }
  return defaultValue;
}

export function replaceFor(string: string, lookFor: string, replaceWith: string) {
  if (string === '') {
    return '';
  }

  // bad lookfor
  if (isNoU(lookFor)) {
    return string;
  }

  // bad replaceWith
  if (isNoU(replaceWith)) {
    replaceWith = '';
  }

  if (lookFor === replaceWith) {
    return string;
  }

  let inText = string,
    outText = '',
    holdText = '',
    foundCount = 0,
    theSpot = -1;
  while (inText.indexOf(lookFor) > -1) {
    foundCount++;
    theSpot = inText.indexOf(lookFor);

    if (outText.length > 0 || foundCount > 1) {
      outText += replaceWith + inText.substring(0, theSpot);
    } else {
      outText = inText.substring(0, theSpot);
    }

    holdText = inText.substring(theSpot + lookFor.length, inText.length);
    inText = holdText;
  }
  if (foundCount > 0) {
    outText += replaceWith + inText;
  } else {
    outText = inText;
  }
  return outText;
}

export function fRight(
  str: string | null | undefined,
  delim: string | null | undefined,
  defaultValue = '',
) {
  if (!str || !delim) return defaultValue;

  str = `${str}`;
  delim = `${delim}`;

  const theSpot = str.indexOf(delim);
  if (theSpot > -1) {
    return str.substring(theSpot + delim.length, str.length);
  }

  return defaultValue;
}

export function fRightBack(
  str: string | null | undefined,
  delim: string | null | undefined,
  defaultValue = '',
) {
  if (!str || !delim) return defaultValue;

  str = `${str}`;
  delim = `${delim}`;

  const theSpot = str.lastIndexOf(delim);
  if (theSpot > -1) {
    return str.substring(theSpot + delim.length, str.length);
  }

  return defaultValue;
}

export function fLeftBack(
  str: string | null | undefined,
  delim: string | null | undefined,
  defaultValue = '',
) {
  if (!str || !delim) return defaultValue;

  str = `${str}`;
  delim = `${delim}`;

  const theSpot = str.lastIndexOf(delim);
  if (theSpot > -1) {
    return str.substring(0, theSpot);
  }

  return defaultValue;
}

export function returnDecimalPlaces(value: number, decimalsToReturn: number) {
  if (value === null) {
    return null;
  }
  decimalsToReturn = decimalsToReturn || 0;

  // 'toFixed' rounds, we are avoiding that by adding another digit of precision
  const fixedValue = value.toFixed(++decimalsToReturn);

  // then dropping that digit
  const ret = fixedValue.slice(0, fixedValue.length - 1);

  // and the leading '+' is to convert back to a number
  return +ret; // convert to number
}

export function secSince(date?: Date): number {
  return ~~secondsDiff(date, new Date());
}

export function minSince(date?: Date): number {
  return ~~(secondsDiff(date, new Date()) / 60);
}

export function hourSince(date?: Date): number {
  return ~~(minSince(date) / 60);
}

export function daysSince(date?: Date): number {
  return ~~(hourSince(date) / 24);
}

function secondsDiff(startDate?: Date, endDate?: Date): number {
  if (!startDate || !endDate) return 0;
  try {
    const startMs = millsFromDate(startDate);
    const endMs = millsFromDate(endDate);
    return Math.max(0, Math.floor(Math.abs(endMs - startMs) / 1000));
  } catch (er) {
    //noop
  }

  return 0;
}

export function secondsFromDate(date: Date) {
  try {
    return ~~(date.getTime() / 1000);
  } catch (e) {
    // noop
  }

  return 0;
}

export function millsFromDate(date: Date) {
  try {
    return date.getTime();
  } catch (e) {
    //noop
  }

  return 0;
}

export function randomItem<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function flipIsHeads() {
  return random(1);
}
export function random(max = 10, min = 0) {
  max = ~~max;
  min = ~~min;

  if (min > max) {
    const t = min;
    min = max;
    max = t;
  }

  return Math.floor(Math.random() * (max + 1 - min)) + min;
}
export function roll(sided = 6) {
  return random(Math.max(1, sided), 1);
}
