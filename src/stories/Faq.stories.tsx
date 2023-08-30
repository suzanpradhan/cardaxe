import type { Meta, StoryObj } from '@storybook/react';

import Faq from '../components/landingPage/Faq';

const meta = {
  title: 'Example/Faq',
  component: Faq,
  tags: ['autodocs'],
} satisfies Meta<typeof Faq>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Q1: Story = {
  args: { question: 'What is CardAxe?' },
};

export const Q2: Story = {
  args: { question: 'Can I use CardAxe on my mobile Phone?' },
};

export const Q3: Story = {
  args: { question: 'What are the perks of Pro plan?' },
};

export const Q4: Story = {
  args: { question: 'Can I change my plan later?' },
};

export const Q5: Story = {
  args: { question: 'Can I keep updating my card myself?' },
};
