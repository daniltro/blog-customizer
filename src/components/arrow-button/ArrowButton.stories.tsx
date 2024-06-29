// import type { Meta, StoryObj } from '@storybook/react';

// import { ArrowButton } from './ArrowButton';

// const meta: Meta<typeof ArrowButton> = {
//   component: ArrowButton,
// };

// export default meta;
// type Story = StoryObj<typeof ArrowButton>;

// export const ArrowButtonStory: Story = {
//   render: () => {
//     return (
//       <>
//         <ArrowButton />
//       </>
//     );
//   },
// };

import type { Meta, StoryObj } from '@storybook/react';

import { ArrowButton } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
	title: 'Components/ArrowButton',
	argTypes: {
		onClick: { action: 'clicked' },
	},
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

export const ArrowButtonStory: Story = {
	render: (args) => {
		return (
			<>
				<ArrowButton {...args} />
			</>
		);
	},
	args: {
		onClick: () => alert('Clicked!'), // Пример функции onClick
	},
};
