import type { Meta, StoryObj } from '@storybook/react';

import CardWithImage from '../components/landingPage/CardWithImage';
import square_image from '../../public/square_image.jpg';

const meta = {
  title: 'Example/CardWithImage',
  component: CardWithImage,
  tags: ['autodocs'],
} satisfies Meta<typeof CardWithImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Left: Story = {
  args: {
    imageIsLeft: true,
    headingText: 'Lorem ipsum dolor, sit amet consectetur adipisicing ',
    paragraphText:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit fuga expedita maxime autem reiciendis praesentium dolores magnam vero. Assumenda, minus!',
    image: square_image,
  },
};

export const Right: Story = {
  args: {
    imageIsLeft: false,
    headingText:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis, doloremque?',
    paragraphText:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit fuga expedita maxime autem reiciendis praesentium dolores magnam vero. Assumenda, minus!',
    image: square_image,
  },
};
