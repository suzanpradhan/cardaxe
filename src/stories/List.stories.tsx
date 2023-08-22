import type { Meta, StoryObj } from '@storybook/react';

import List from '../components/List';

const meta = {
  title: 'Example/List',
  component: List,
  tags: ['autodocs'],
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const list1: Story = {
  args: {
    listItems: ['About', 'Services', 'Pricing', 'Blog'],
  },
};

export const list2: Story = {
  args: {
    listItems: [
      'Help and Support',
      'Terms and Conditions',
      'Privacy Policy',
      'Careers',
      'Security',
    ],
  },
};
