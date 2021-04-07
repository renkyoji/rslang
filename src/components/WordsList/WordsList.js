import React from 'react';
import classes from './WordsList.module.scss';

const WordsList = props => {
	return (
		<div style={{ top: props.position + '%' }} className={classes.words}>
			{props.words.map((word, i) => (
				<span
					onClick={() => props.onClick(event.target.textContent.slice(3))}
					id="word"
					className={classes.word}
					key={word.word}>
					{i + 1}. {word.wordTranslate}
				</span>
			))}
		</div>
	);
};

export default WordsList;
