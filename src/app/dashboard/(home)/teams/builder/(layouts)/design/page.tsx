'use client';

import ColorInput from '@/components/Inputs/ColorInput';
import SwitchInput from '@/components/Inputs/SwitchInput';
import TextInput from '@/components/Inputs/TextInput';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { updateDesignForm } from '@/module/teams/teamTemplateSlice';
// import {
//   DesignFormSchema,
//   DesignFromSchemaType,
// } from '@/module/cards/cardsType';
import { ChangeEvent } from 'react';

export default function Page() {
  const teamTemplateState = useAppSelector(
    (state: RootState) => state.teamTemplate
  );
  const dispatch = useAppDispatch();

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement;

    const filesToCache = files?.[0];

    if (filesToCache) {
      caches.open('filesCache').then(function (cache) {
        cache.put(name, new Response(filesToCache));
      });
    }

    const stateValue =
      type === 'file' && files ? window.URL.createObjectURL(files[0]) : value;
    dispatch(updateDesignForm({ [name]: stateValue }));
  };

  const handleSwitchChange = async (checked: boolean, zSchemaName: string) => {
    dispatch(updateDesignForm({ [zSchemaName]: checked }));
  };

  return (
    <div className="h-[calc(100vh-17rem)] overflow-y-scroll lg:h-[calc(100vh-6rem)]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col gap-4"
      >
        <Card className="pb-4 shadow-none">
          <CardHeader className="pb-2 font-bold">Basic Design</CardHeader>
          <CardContent className="">
            <div className="flex flex-col gap-3">
              <div className="flex items-end gap-2">
                <TextInput
                  id="backgroundColor"
                  rows={5}
                  name={'backgroundColor'}
                  label={'Background Color'}
                  required={true}
                  value={teamTemplateState.design.backgroundColor ?? undefined}
                  onChange={handleChange}
                />
                <div className="h-[42px] basis-4/5 rounded-md border-1 border-borderMain bg-inputBgGrey">
                  <ColorInput
                    id="backgroundColor"
                    name={'backgroundColor'}
                    value={
                      teamTemplateState.design.backgroundColor ?? undefined
                    }
                    onChange={handleChange}
                    required={true}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="pb-4 shadow-none">
          <CardHeader className="pb-2 font-bold">Other Design</CardHeader>
          <CardContent className="">
            <div className="flex flex-col gap-3">
              <SwitchInput
                handleChange={handleSwitchChange}
                inputLabel={'Show logo'}
                inputValue={teamTemplateState.design.showLogo ?? false}
                zSchemaName={'showLogo'}
              />
              <SwitchInput
                handleChange={handleSwitchChange}
                inputLabel={'Show social Icons'}
                inputValue={teamTemplateState.design.showSocialIcons ?? false}
                zSchemaName={'showSocialIcons'}
              />
              <SwitchInput
                handleChange={handleSwitchChange}
                inputLabel={'Dark Mode'}
                inputValue={teamTemplateState.design.darkMode ?? false}
                zSchemaName={'darkMode'}
              />
              {/* <FileInput
                id="backgroundImage"
                // className="mb-3 w-[98%]"
                required
                label="Background Image"
                name="backgroundImage"
                placeholder="Background Image"
                value={values['backgroundImage'] ?? undefined}
                error={errors?.['backgroundImage']}
                onChange={
                  handleChange as
                    | ((
                        e:
                          | boolean
                          | ChangeEvent<HTMLInputElement>
                          | ChangeEvent<HTMLTextAreaElement>
                      ) => void)
                    | undefined
                }
              /> */}
              {/* <FileInput
                id="logo"
                // className="mb-3 w-[98%]"
                required
                label="Logo"
                name="logo"
                placeholder="Logo image"
                value={values['logo'] ?? undefined}
                error={errors?.['logo']}
                onChange={
                  handleChange as
                    | ((
                        e:
                          | boolean
                          | ChangeEvent<HTMLInputElement>
                          | ChangeEvent<HTMLTextAreaElement>
                      ) => void)
                    | undefined
                }
              /> */}
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
