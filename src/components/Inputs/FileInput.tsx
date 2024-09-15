import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { cn } from '@/lib/utils';
import { updateDesignForm } from '@/module/cards/cardSlice';
import { CardState } from '@/module/cards/cardsType';
import { Trash } from 'iconsax-react';
import Image from 'next/image';
import { ChangeEventHandler } from 'react';
import InputLable from './InputLabel';

export enum ImageShape {
  square,
  rectangle,
}

export interface FileInputProps {
  label?: string;
  imageShape?: ImageShape;
  placeholder?: string;
  id: string;
  value?: string;
  name?: string;
  className?: string;
  required?: boolean;
  error?: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}

const FileInput = ({
  required = true,
  imageShape = ImageShape.rectangle,
  ...props
}: FileInputProps) => {
  console.log(props.value);

  const cardState = useAppSelector((state: RootState) => state.card);

  const dispatch = useAppDispatch();

  return (
    <div className="w-full">
      {props.id && props.label && (
        <InputLable htmlFor={props.id} inputLabel={props.label} />
      )}
      <div className="flex flex-col gap-2">
        {props.value ? (
          <div
            className={cn(
              'relative overflow-hidden rounded-md border border-borderMain bg-inputBgGrey',
              imageShape === ImageShape.rectangle
                ? 'aspect-rectangle w-full'
                : 'aspect-square w-1/2'
            )}
          >
            <button
              onClick={async () => {
                const fecthCachedImage = async (name: string) => {
                  const cache = await caches.open('filesCache');
                  const response = await cache.match(name);
                  if (!response) return;
                  const blob = await response.blob();
                  await cache.delete(name);
                  return blob;
                };
                if (props.name) {
                  // await caches.delete(props.name);
                  const myFile = await fecthCachedImage(props.name);
                  console.log('myFile', myFile);
                  const cache = await caches.open('filesCache');
                  await cache.delete(`${props.name}`);
                  const updatedFormState: CardState<string>['cardDesign']['values'] =
                    {
                      [props.name]: '',
                    };
                  dispatch(updateDesignForm(updatedFormState));
                }
              }}
              className="absolute right-0 z-50 rounded-sm bg-white p-1"
            >
              <Trash size="16" color="red" />
            </button>
            <Image
              src={
                props.value?.startsWith('blob')
                  ? props.value
                  : `${apiPaths.serverUrl}${props.value}`
              }
              alt="bg-image"
              fill
              objectFit="cover"
              sizes=""
            />
          </div>
        ) : (
          <></>
        )}
        <label
          htmlFor={props.id}
          className={cn(
            'line-clamp-1 block !h-11 w-full truncate rounded-md border-1 bg-inputBgGrey p-2 text-inputPlaceholder placeholder:text-inputPlaceholder focus:outline-1 focus:outline-blueTheme disabled:bg-inputDisabled disabled:text-gray-50',
            props.error ? 'border-redError' : 'border-borderMain'
          )}
        >
          {props.placeholder}
        </label>
      </div>

      <input
        onChange={(e) => props.onChange?.(e)}
        className="hidden"
        type="file"
        id={props.id}
        name={props.name}
      />
    </div>
  );
};

export default FileInput;
