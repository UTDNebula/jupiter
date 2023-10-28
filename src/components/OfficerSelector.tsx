import { type createClubSchema } from '@src/pages/directory/create';
import {
  type Control,
  type UseFieldArrayRemove,
  type UseFormRegister,
  useFieldArray,
} from 'react-hook-form';
import { type z } from 'zod';

type OfficerSelectorProps = {
  control: Control<z.infer<typeof createClubSchema>>;
  register: UseFormRegister<z.infer<typeof createClubSchema>>;
};
const OfficerSelector = ({ control, register }: OfficerSelectorProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'officers',
  });
  return (
    <div>
      <div className="flex flex-row py-1">
        <h2>Officers</h2>
        <button
          className="ml-auto rounded-lg bg-slate-200 p-2"
          type="button"
          onClick={() => {
            append({ name: '', position: '' });
          }}
        >
          add new officer
        </button>
      </div>
      <div className="space-y-2">
        {fields.map((field, index) => (
          <OfficerItem
            key={field.id}
            register={register}
            index={index}
            remove={remove}
          />
        ))}
      </div>
    </div>
  );
};
export default OfficerSelector;

type OfficerItemProps = {
  register: UseFormRegister<z.infer<typeof createClubSchema>>;
  remove: UseFieldArrayRemove;
  index: number;
};
const OfficerItem = ({ register, index, remove }: OfficerItemProps) => {
  return (
    <div className="flex flex-row items-center rounded-md bg-slate-300 p-2">
      <div className="flex flex-col">
        <div>
          <input
            type="text"
            placeholder="Name"
            className="mb-1 bg-slate-300 text-xl font-bold text-black"
            {...register(`officers.${index}.name` as const)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Position"
            className="bg-slate-300 font-semibold text-black"
            {...register(`officers.${index}.position` as const)}
          />
        </div>
      </div>
      <div className="ml-auto">
        <button type="button" onClick={() => remove(index)}>
          remove
        </button>
      </div>
    </div>
  );
};
