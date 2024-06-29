import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleSettings, setArticleSettings] =
		useLocalStorage<ArticleStateType>('state', defaultArticleState);
	const [formOpen, setFormOpen] = useState(false);

	const resetState = () => {
		setArticleSettings(defaultArticleState);
		setFormOpen(false);
	};
	const applyState = (formState: typeof defaultArticleState) => {
		setArticleSettings(formState);
		setFormOpen(false);
	};

	const toggleFormOpen = () => {
		setFormOpen(!formOpen);
	};

	const props = {
		articleSettings,
		applyState,
		resetState,
		formOpen,
		toggleFormOpen,
	};
	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleSettings.fontFamilyOption.value,
					'--font-size': articleSettings.fontSizeOption.value,
					'--font-color': articleSettings.fontColor.value,
					'--container-width': articleSettings.contentWidth.value,
					'--bg-color': articleSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm {...props} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
