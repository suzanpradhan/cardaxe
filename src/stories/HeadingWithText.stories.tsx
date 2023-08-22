import type { Meta, StoryObj } from '@storybook/react';

import HeadingWithText from '../components/HeadingWithText';

const meta = {
    title: "Example/HeadingWithText",
  component: HeadingWithText,
  tags: ['autodocs'],
} satisfies Meta<typeof HeadingWithText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MyHeadingWithText: Story = {
    args: {
        headingText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, commodi?",
        paragraphText: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam, neque explicabo a officia esse quisquam laudantium incidunt beatae enim odit."
    }
  };