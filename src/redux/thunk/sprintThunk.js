import { getAllAggregatedWords, getWords } from '../../api/api';
import {
	setCorrectAnswer,
	setLoadPair,
	setRate,
	setScore,
	setStartedSprint,
	setWinStreak,
	setWordsForSprint,
	setWrongAnswer
} from '../actions/sprintActions';

export function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const loadWordsForSprint = () => async (dispatch, getState) => {

	if (getState().sprint.from === 'menu') {
		const level = getState().sprint.level;
		const res = await getAllAggregatedWords(level, 0, 600, '{"$or":[{"userWord.difficulty":"hard"},{"userWord":null}]}');
		const temp = res[0].paginatedResults.map(word => {
			return {
				word: word.word,
				translate: word.wordTranslate,
				transcription: word.transcription,
				id: word._id,
				audio: word.audio
			};
		});
		dispatch(setWordsForSprint(temp));
	} else {
		const currentPage = getState().words.currentPage
		const group = getState().words.group
		const res = await getWords(group, currentPage)
		const temp = res.map(word => {
			return {
				word: word.word,
				translate: word.wordTranslate,
				transcription: word.transcription,
				id: word._id,
				audio: word.audio
			};
		})
		dispatch(setWordsForSprint(temp))
	}
};

export const loadPair = () => async (dispatch, getState) => {
	const words = getState().sprint.words;
	const index = getRandomNumber(2, words.length - 2);
	const currentPair = (Math.floor(Math.random() * 2) === 0)
		? {
			word: words[index].word,
			translate: words[index].translate,
			correctTranslate: words[index].translate,
			transcription: words[index].transcription,
			id: words[index].id,
			audio: words[index].audio,
			status: true
		}
		: {
			word: words[index].word,
			translate: words[index + 1].translate,
			correctTranslate: words[index].translate,
			transcription: words[index].transcription,
			id: words[index].id,
			audio: words[index].audio,
			status: false
		};
	dispatch(setLoadPair(currentPair));
};

export const startSprint = () => async (dispatch, getState) => {
	dispatch(setStartedSprint());
	dispatch(loadPair());
};

export const clickAnswer = (answer) => async (dispatch, getState) => {
	const currentPair = getState().sprint.loadPair;
	const rate = getState().sprint.rate;
	const score = getState().sprint.score;
	const winSteak = getState().sprint.winStreak;

	if (currentPair.status === answer) {
		dispatch(setWinStreak(winSteak + 1));
		if (getState().sprint.winStreak === 4 || getState().sprint.winStreak === 7 || getState().sprint.winStreak === 10) {
			dispatch(setRate(rate * 2));
		}
		dispatch(setScore(score + (10 * getState().sprint.rate)));
		dispatch(setCorrectAnswer(currentPair));
		dispatch(loadPair());

	} else {
		dispatch(setRate(1));
		dispatch(setWinStreak(0));
		dispatch(setWrongAnswer(currentPair));
		dispatch(loadPair());
	}
};