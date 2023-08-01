import type { Meta, StoryObj } from '@storybook/react';

import Light from '../components/Light';

const meta: Meta<typeof Light> = {
  component: Light,
  title: 'Example/Light',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {},
};

export const Yellow: Story = {
  args: {
    variant: 'bg-yellow-500',
  },
};

export const Red: Story = {
  args: {
    variant: 'bg-red-600',
  },
};

export const Grouped: Story = {
  render: (args) => (
    <div>
      <Light variant="bg-red-600" />
      <Light variant="bg-yellow-500" />
      <Light variant="bg-green-600" />
    </div>
  ),
};
