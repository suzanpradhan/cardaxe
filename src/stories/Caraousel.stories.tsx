import type { Meta, StoryObj } from '@storybook/react';

import Caraousel from '../components/landingPage/Caraousel';

const meta = {
  title: 'Example/Caraousel',
  component: Caraousel,
  tags: ['autodocs'],
} satisfies Meta<typeof Caraousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const myCaraousel: Story = {
  args: {},
};
