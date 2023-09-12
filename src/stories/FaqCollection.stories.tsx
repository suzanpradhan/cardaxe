import type { Meta, StoryObj } from '@storybook/react';

import FaqCollection from '../components/FaqCollection';

const meta = {
  title: 'Example/FaqCollection',
  component: FaqCollection,
  tags: ['autodocs'],
} satisfies Meta<typeof FaqCollection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  args: {},
};
