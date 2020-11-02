export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  //The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getTicketNumbers = () => {
  const numbers = [];
  let i = 0;

  while (i < 5) {
    const num = getRandomIntInclusive(1, 25);
    if (numbers.includes(num)) {
      continue;
    } else {
      numbers.push(num);
      i++;
    }
  }
  while (i < 9) {
    const num = getRandomIntInclusive(26, 50);
    if (numbers.includes(num)) {
      continue;
    } else {
      numbers.push(num);
      i++;
    }
  }
  while (i < 13) {
    const num = getRandomIntInclusive(51, 75);
    if (numbers.includes(num)) {
      continue;
    } else {
      numbers.push(num);
      i++;
    }
  }
  while (i < 19) {
    const num = getRandomIntInclusive(76, 99);
    if (numbers.includes(num)) {
      continue;
    } else {
      numbers.push(num);
      i++;
    }
  }

  // for (let i = 0; i < 19; i++) {
  //   numbers.push(getRandomIntInclusive(1, 99));
  // }
  return numbers;
};
