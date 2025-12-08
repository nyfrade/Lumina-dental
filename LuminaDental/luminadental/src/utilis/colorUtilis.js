// luminadental/src/utilis/colorUtilis.js

export function getContrastTextColor(hexcolor) {
  if (!hexcolor || hexcolor === 'inherit') {
    return '#000'; // Default to black for inherit or undefined
  }

  // If hexcolor is a short form (e.g., #CCC), expand it
  const hex = hexcolor.startsWith('#') ? hexcolor.slice(1) : hexcolor;
  const expandedHex = hex.length === 3
    ? hex.split('').map(char => char + char).join('')
    : hex;

  const r = parseInt(expandedHex.substr(0, 2), 16);
  const g = parseInt(expandedHex.substr(2, 2), 16);
  const b = parseInt(expandedHex.substr(4, 2), 16);

  // Perceived brightness (luminance) formula: (R*299 + G*587 + B*114) / 1000
  // Values range from 0 (black) to 255 (white)
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

  // Use white text for dark backgrounds (YIQ < 128), else use black
  return (yiq >= 128) ? '#000' : '#fff';
}
