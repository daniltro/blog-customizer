import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';
import { Select } from '../select/Select';
import { RadioGroup } from 'components/radio-group/RadioGroup';
import { Text } from '../text/Text';
import { useClose } from '../../hooks/useClose';
import { useRef, useEffect, FormEvent } from 'react';
import {
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Separator } from '../separator';

interface ArticleParamsFormProps {
	formState: typeof defaultArticleState;
	changeFontFamily: (selected: OptionType) => void;
	changeFontColor: (selected: OptionType) => void;
	changeBackgroundColor: (selected: OptionType) => void;
	changeContentWidth: (selected: OptionType) => void;
	changeFontSize: (selected: OptionType) => void;
	applyState: (event: FormEvent) => void;
	resetState: () => void;
	formOpen: boolean;
	toggleFormOpen: () => void;
}

export const ArticleParamsForm = ({
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
}: ArticleParamsFormProps) => {
	const formRef = useRef<HTMLDivElement>(null);
	// хук для закытия формы ко клику в оверлей
	useClose({
		isOpen: formOpen,
		onClose: toggleFormOpen, // Функция, которая закрывает форму
		rootRef: formRef, // Ref, указывающий на корневой элемент формы
	});
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				toggleFormOpen();
			}
		};

		if (formOpen) {
			document.addEventListener('keydown', handleEscape);
		} else {
			document.removeEventListener('keydown', handleEscape);
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	}, [formOpen, toggleFormOpen]);

	return (
		<>
			<ArrowButton onClick={toggleFormOpen} isOpen={formOpen} />
			<aside
				ref={formRef}
				className={`${styles.container} ${
					formOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={applyState}>
					<Text as={'h2'} size={31} weight={800} uppercase>
						{'Задайте параметры'}
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder={defaultArticleState.fontFamilyOption.title}
						onChange={(option) => changeFontFamily(option)}
						title={defaultArticleState.fontFamilyOption.title}
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) => changeFontSize(option)}
						title='Размер шрифта'
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						placeholder={defaultArticleState.fontColor.title}
						onChange={(option) => changeFontColor(option)}
						title='Цвет шрифта'
					/>
					<Separator></Separator>
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						placeholder={defaultArticleState.backgroundColor.title}
						onChange={(option) => changeBackgroundColor(option)}
						title='Цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						placeholder={defaultArticleState.contentWidth.title}
						onChange={(option) => changeContentWidth(option)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetState} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
