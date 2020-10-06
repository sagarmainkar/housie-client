import React, { useState } from "react";

const Square = ({ value, key, onChange }) => {
	const [marked, setMarked] = useState(false);

	return (
		<button
			key={key}
			className={marked ? "square marked" : "square"}
			onClick={() => {
				setMarked(!marked);
				onChange(value, !marked);
			}}
		>
			{value === -1 ? "" : value}
		</button>
	);
};

export default Square;
