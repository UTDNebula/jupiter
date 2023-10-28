type SettingsInputProps = {
  label: string;
  defaultValue: string;
  disabled?: boolean;
};

const SettingsInput = ({
  label,
  defaultValue,
  disabled,
}: SettingsInputProps) => {
  return (
    <label className="text-lg">
      {label}:{' '}
      <input
        className={
          'w-full rounded-sm bg-slate-200 p-1 ' +
          (disabled ? 'hover:cursor-not-allowed' : '')
        }
        defaultValue={defaultValue}
        aria-label={label}
        name={label.charAt(0).toLowerCase() + label.replace(' ', '').slice(1)}
        disabled={disabled}
      />
    </label>
  );
};

export default SettingsInput;
