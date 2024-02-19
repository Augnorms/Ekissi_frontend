type RadioInterface = {
  style: string;
  labelStyle: string;
  label?: string;
  fieldid: string;
  isChecked?: boolean;
  onSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Checkbox = (props: RadioInterface) => {
  return (
    <div className="flex gap-2">
      <div className="">
        <input
          type="checkbox"
          className={props.style}
          id={props.fieldid}
          checked={props.isChecked}
          onChange={props.onSelect}
        />
      </div>
      <div className={props.labelStyle}>
        <label htmlFor={props.fieldid}>{props.label}</label>
      </div>
    </div>
  );
};
