import type { Meta, StoryObj } from '@storybook/react';
import square_image from '../../public/square_image.jpg';

import ClientsOpinion from '../components/landingPage/ClientsOpinion';

const meta = {
  title: 'Example/ClientsOpinion',
  component: ClientsOpinion,
  tags: ['autodocs'],
} satisfies Meta<typeof ClientsOpinion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Enlarged: Story = {
  args: {
    clientView:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis, doloremque?',
    clientName: 'Avishek Dahal',
    clientPosition: 'CEO',
    clientPic: square_image,
    isSelected: true,
  },
};

export const Regular: Story = {
  args: {
    clientView:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis, doloremque?',
    clientName: 'Pratick Joshi',
    clientPosition: 'Manager',
    clientPic: square_image,
    isSelected: false,
  },
};
