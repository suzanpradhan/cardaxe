'use client';

import TextInput from '@/components/Inputs/TextInput';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { updateCardBasics } from '@/module/cards/cardSlice';

export default function SharePage() {
  const cardState = useAppSelector((state: RootState) => state.card);
  const dispatch = useAppDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateCardBasics({ slug: e.target.value }));
  };

  console.log('title and slug', cardState);

  return (
    <div className="h-[calc(100vh-17rem)] overflow-y-scroll lg:h-[calc(100vh-6rem)]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col gap-4"
      >
        <Card className="pb-4 shadow-none">
          <CardHeader className="font-bold">Share Card Info</CardHeader>
          <CardContent className="flex flex-col gap-3">
            <TextInput
              id={'slug'}
              type={'text'}
              name={'slug'}
              //   error={cardState.cardBasics.errors.slug}
              label={'Card Slug'}
              value={cardState.cardBasics.values.slug ?? ''}
              placeholder={'edit your card slug'}
              onChange={handleChange}
            />
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
