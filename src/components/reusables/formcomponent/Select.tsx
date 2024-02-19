type Option = {
  id: string;
  name: string;
};
type SelectProps = {
  labelOne?: string;
  labelTwo?: string;
  data: Option[];
  style: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  onSelect?: (selectedOption: Option) => void;
  disabled?: boolean;
};

export const Select = (props: SelectProps) => {
  //this is use to emit changes
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = props.data.find(
      (option) => option.id === event.target.value,
    );

    if (selectedOption && props.onSelect) {
      props.onSelect(selectedOption);
    }

    if (props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-between">
        <label className="mb-2 font-bold">{props.labelOne}</label>

        <label className="mb-2 font-bold">{props.labelTwo}</label>
      </div>
      <select
        className={props.style}
        onChange={handleSelect}
        value={props.value}
        disabled={props.disabled}
      >
        <option value="" disabled>
          {props.placeholder}
        </option>
        {props.data.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};
