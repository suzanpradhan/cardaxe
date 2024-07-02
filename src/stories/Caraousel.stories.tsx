import type { Meta, StoryObj } from '@storybook/react';

import Carousel from '../components/landingPage/Carousel';

const meta = {
  title: 'Example/Caraousel',
  component: Carousel,
  tags: ['autodocs'],
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MyCarousel: Story = {
  args: {},
};
