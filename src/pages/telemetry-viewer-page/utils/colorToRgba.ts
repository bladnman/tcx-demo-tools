const _cache = new Map();

export default function colorToRgba(color: string) {
  // get from cache
  if (_cache.has(color)) return _cache.get(color);

  const temp = document.createElement("i"); // just a temporary element
  temp.style.cssText = `color: ${color}`; // assign it to the style of the <i> element

  const rgbStr = temp.style.color;
  const values = Array.from(rgbStr.matchAll(/\d+\.?\d*/g), (c) => +c[0]); // temp.style.color gives RGB string
  const value = { rgbStr, values };

  // set cache
  _cache.set(color, value);

  return value;
}
