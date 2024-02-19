type TextAreaIntrface = {
  style: string;
  placeholder: string;
  id: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
};

export const TextArea = (props: TextAreaIntrface) => {
  return (
    <div>
      <textarea
        className={props.style}
        placeholder={props.placeholder}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
      ></textarea>
    </div>
  );
};
