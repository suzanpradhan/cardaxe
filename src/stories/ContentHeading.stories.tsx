import type { Meta, StoryObj } from '@storybook/react';
import ContentHeading from '../components/landingPage/ContentHeading';

const meta = {
  title: 'Example/ContentHeading ',
  component: ContentHeading,
  tags: ['autodocs'],
} satisfies Meta<typeof ContentHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Content1: Story = {
  args: { headingTitle: 'Quod maxime placeat option facere possimus' },
};
