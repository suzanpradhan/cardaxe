import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import FormWrapper from '../FormWrapper';
import InputComp from '../InputComp';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';

const SwitchFormSchema = z.object({
  isDefault: z.boolean(),
});
type SwitchFormSchemaType = z.infer<typeof SwitchFormSchema>;

const MyCardsContentSwitch = ({ label }: { label: string }) => {
  return (
    <FormWrapper>
      
    </FormWrapper>
  );
};

export default MyCardsContentSwitch;
