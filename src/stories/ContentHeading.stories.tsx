import type { Meta, StoryObj } from '@storybook/react';
import ContentHeading from '../components/ContentHeading';

const meta = {
  title: 'Example/ContentHeading ',
  component: ContentHeading,
  tags: ['autodocs'],
} satisfies Meta<typeof ContentHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const content1: Story = {
  args: { headingTitle: 'Quod maxime placeat option facere possimus' },
};
