import type { Meta, StoryObj } from '@storybook/react';
import square_image from '../../public/square_image.jpg';

import CardWithImageSmall from '../components/landingPage/CardWithImageSmall';

const meta = {
  title: 'Example/CardWithImageSmall',
  component: CardWithImageSmall,
  tags: ['autodocs'],
} satisfies Meta<typeof CardWithImageSmall>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  args: {
    headingText: 'Lorem ipsum dolor, sit amet',
    paragraphText:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit fuga expedita maxime autem reiciendis praesentium dolores magnam vero. Assumenda, minus!',
    image: square_image,
  },
};
