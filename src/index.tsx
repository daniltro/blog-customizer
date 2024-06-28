import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, FormEvent, useState } from 'react';
import clsx from 'clsx';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	OptionType,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [appState, setAppState] = useLocalStorage<ArticleStateType>(
		'state',
		defaultArticleState
	);
	const [formState, setFormState] = useState(appState);
	const [formOpen, setFormOpen] = useState(false);

	const resetState = () => {
		setAppState(defaultArticleState);
		setFormState(defaultArticleState);
		setFormOpen(false);
	};

	const applyState = (event: FormEvent) => {
		event.preventDefault();
		setAppState(formState);
		setFormOpen(false);
	};

	const changeFontFamily = (selected: OptionType) => {
		setFormState({ ...formState, fontFamilyOption: selected });
	};

	const changeFontColor = (selected: OptionType) => {
		setFormState({ ...formState, fontColor: selected });
	};

	const changeBackgroundColor = (selected: OptionType) => {
		setFormState({ ...formState, backgroundColor: selected });
	};

	const changeContentWidth = (selected: OptionType) => {
		setFormState({ ...formState, contentWidth: selected });
	};

	const changeFontSize = (selected: OptionType) => {
		setFormState({ ...formState, fontSizeOption: selected });
	};
	const toggleFormOpen = () => {
		setFormOpen(!formOpen);
	};

	const props = {
		formState,
		changeFontFamily,
		changeFontColor,
		changeBackgroundColor,
		changeContentWidth,
		changeFontSize,
		applyState,
		resetState,
		formOpen,
		toggleFormOpen,
	};
	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appState.fontFamilyOption.value,
					'--font-size': appState.fontSizeOption.value,
					'--font-color': appState.fontColor.value,
					'--container-width': appState.contentWidth.value,
					'--bg-color': appState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm {...props} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
