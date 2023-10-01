type SettingsInputProps = {
  label: string;
  defaultValue: string;
  isEditing: boolean;
};

const SettingsInput = ({
  label,
  defaultValue,
  isEditing,
}: SettingsInputProps) => {
  return (
    <label className="text-lg">
      {label}:{' '}
      <input
        className="w-full rounded-sm bg-slate-200 p-1"
        defaultValue={defaultValue}
        disabled={!isEditing}
        aria-label="First name"
      />
    </label>
  );
};

export default SettingsInput;
