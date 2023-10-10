type SettingsInputProps = {
  label: string;
  defaultValue: string;
};

const SettingsInput = ({ label, defaultValue }: SettingsInputProps) => {
  return (
    <label className="text-lg">
      {label}:{' '}
      <input
        className="w-full rounded-sm bg-slate-200 p-1"
        defaultValue={defaultValue}
        aria-label={label}
        name={label.charAt(0).toLowerCase() + label.replace(' ', '').slice(1)}
      />
    </label>
  );
};

export default SettingsInput;
