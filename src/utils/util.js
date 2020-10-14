export function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	//The maximum is inclusive and the minimum is inclusive
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getTicketNumbers = () => {
	const numbers = [];
	const i = 0;
	while (i < 19) {
		const randNum = getRandomIntInclusive(1, 99);
		if (!numbers.includes(randNum)) {
			numbers.push(randNum);
			i++;
		}
	}

	return numbers;
};
