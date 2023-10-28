type SettingsDropdownProps = {
  options: string[];
  label: string;
  disabled?: boolean;
  defaultValue: string;
};

const SettingsDropdown = ({
  options,
  label,
  disabled,
  defaultValue,
}: SettingsDropdownProps) => {
  return (
    <label className="text-lg">
      {label}:
      <select
        id={label}
        className={
          'w-full rounded-sm bg-slate-200 p-1 ' +
          (disabled ? 'hover:cursor-not-allowed' : '')
        }
        defaultValue={defaultValue}
        disabled={disabled}
        name={label.charAt(0).toLowerCase() + label.replace(' ', '').slice(1)}
      >
        {options.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export default SettingsDropdown;
