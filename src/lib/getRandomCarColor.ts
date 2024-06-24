/**
 * The function getRandomCarColor generates a random hexadecimal color code for a car.
 * @returns The function `getRandomCarColor` returns a randomly generated hexadecimal color code in the
 * format `#RRGGBB`, where RR, GG, and BB are two-digit hexadecimal values representing the red, green,
 * and blue components of the color respectively.
 */
function getRandomCarColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor.padStart(6, '0')}`;
}

export default getRandomCarColor;
