import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';
import { Select } from '../select/Select';
import { RadioGroup } from 'components/radio-group/RadioGroup';
import { Text } from '../text/Text';
import { useClose } from '../../hooks/useClose';
import { useRef, useEffect, FormEvent, useState } from 'react';
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
	articleSettings: typeof defaultArticleState;
	applyState: (formState: typeof defaultArticleState) => void;
	resetState: () => void;
	formOpen: boolean;
	toggleFormOpen: () => void;
}

export const ArticleParamsForm = ({
	articleSettings,
	applyState,
	resetState,
	formOpen,
	toggleFormOpen,
}: ArticleParamsFormProps) => {
	const [formState, setFormState] = useState(articleSettings);

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

	const handleApplyState = (event: FormEvent) => {
		event.preventDefault();
		applyState({
			fontFamilyOption: formState.fontFamilyOption,
			fontColor: formState.fontColor,
			backgroundColor: formState.backgroundColor,
			contentWidth: formState.contentWidth,
			fontSizeOption: formState.fontSizeOption,
		});
	};
	const formRef = useRef<HTMLDivElement>(null);
	useClose({
		isOpen: formOpen,
		onClose: toggleFormOpen,
		rootRef: formRef,
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
				<form className={styles.form} onSubmit={handleApplyState}>
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
