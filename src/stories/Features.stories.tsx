import type { Meta, StoryObj } from '@storybook/react';
import square_image from '../../public/square_image.jpg';

import Features from '../components/Features';

const meta = {
  title: 'Example/Features',
  component: Features,
  tags: ['autodocs'],
} satisfies Meta<typeof Features>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Header: Story = {
  args: {
    headingText: 'Lorem ipsum dolor',
    paragraphText:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit fuga expedita maxime autem reiciendis praesentium dolores magnam vero. Assumenda, minus!',
    featurePic: square_image,
  },
};
