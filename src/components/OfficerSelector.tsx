import { type createClubSchema } from '@src/pages/directory/create';
import {
  type Control,
  type UseFieldArrayRemove,
  type UseFormRegister,
  useFieldArray,
  type FieldErrors,
} from 'react-hook-form';
import { type z } from 'zod';

type OfficerSelectorProps = {
  control: Control<z.infer<typeof createClubSchema>>;
  register: UseFormRegister<z.infer<typeof createClubSchema>>;
  errors: FieldErrors<z.infer<typeof createClubSchema>>;
};
const OfficerSelector = ({
  control,
  register,
  errors,
}: OfficerSelectorProps) => {
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
      <div>
        {errors.officers && (
          <p className="text-red-500">{errors.officers.message}</p>
        )}
      </div>
      <div className="space-y-2">
        {fields.map((field, index) => (
          <OfficerItem
            key={field.id}
            register={register}
            index={index}
            remove={remove}
            errors={errors}
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
  errors: FieldErrors<z.infer<typeof createClubSchema>>;
};
const OfficerItem = ({ register, index, remove, errors }: OfficerItemProps) => {
  return (
    <div className="flex flex-row items-center rounded-md bg-slate-300 p-2">
      <div className="flex flex-col">
        <div>
          <input
            type="text"
            placeholder="Name"
            className="mb-1 bg-slate-300 text-xl font-bold text-black"
            {...register(`officers.${index}.name` as const)}
            aria-invalid={
              errors.officers && errors.officers[index] ? 'true' : 'false'
            }
          />
          {errors.officers && errors.officers[index]?.name && (
            <p className="text-red-500">
              {errors.officers[index]?.name?.message}
            </p>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="Position"
            className="bg-slate-300 font-semibold text-black"
            {...register(`officers.${index}.position` as const)}
            aria-invalid={
              errors.officers && errors.officers[index]?.position
                ? 'true'
                : 'false'
            }
          />
          {errors.officers && errors.officers[index]?.position && (
            <p className="text-red-500">
              {errors.officers[index]?.position?.message}
            </p>
          )}
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
