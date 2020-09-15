export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  //The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getTicketNumbers = () => {
  const numbers = [];
  for (let i = 0; i < 19; i++) {
    numbers.push(getRandomIntInclusive(1, 99));
  }
  return numbers;
};
