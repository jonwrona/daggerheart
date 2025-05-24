interface RadioButtonOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  options: RadioButtonOption[];
  value: string;
  onChange: (value: string) => void;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
}) => {
  const handleRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    onChange(event.target.value);
  };

  return (
    <div>
      {options.map((option: RadioButtonOption) => (
        <label key={option.value}>
          <input
            type="radio"
            name="radio-group"
            value={option.value}
            checked={value === option.value}
            onChange={handleRadioChange}
            disabled={option.disabled}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};
