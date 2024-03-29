import { type SettingSchema } from '@src/components/settings/FormCard';
import {
  type UseFormRegister,
  type Control,
  useFieldArray,
} from 'react-hook-form';
import Image from 'next/image';

type Props = {
  register: UseFormRegister<SettingSchema>;
  control: Control<SettingSchema>;
};

export default function ClubSelector({ control }: Props) {
  const { fields, remove } = useFieldArray({
    control,
    name: 'clubs',
    keyName: 'club.id',
  });
  return (
    <div className="-mt-4 w-1/2 md:mx-6">
      <h2 className="mb-4 font-medium text-slate-500">Clubs</h2>
      <div className="flex flex-wrap">
        {fields.map((club, i) => (
          <div
            className="m-5 flex min-w-[10rem] items-center justify-center rounded-full border p-2"
            key={club.id}
          >
            <Image
              src={club.image}
              alt={club.name}
              width={40}
              height={40}
              className="-pl-1 rounded-full pr-1"
            />
            <h1 className="truncate p-1 text-xs font-bold">{club.name}</h1>
            <button
              type="button"
              className="ml-2 text-xs font-bold text-red-500"
              onClick={() => remove(i)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
