import { ChangeEventHandler } from "react";

export type CaptionColor = "ok" | "warning" | "danger" | "muted";

type Margins = [number, number, number, number];

interface TextInputProps {
  id: string;
  type?: "text" | "email" | "password";
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  label?: string;
  placeholder?: string;
  caption?: string;
  captionColor?: CaptionColor;
  margins?: Margins;
}

const TextInput = (props: TextInputProps) => {
  const inputProps = {
    id: props.id,
    type: props.type,
    placeholder: props.placeholder,
    value: props.value,
    onChange: props.onChange,
  };

  return (
    <div className="textinput" style={prepareMargins(props.margins)}>
      <label htmlFor={props.id} className="textinput__label">
        {props.label || "No label"}
      </label>
      <input {...inputProps} className="textinput__input" />
      <span
        className={`textinput__caption ${
          props.captionColor && `textinput__caption--${props.captionColor}`
        }`}
      >
        {props.caption}&nbsp;
      </span>
    </div>
  );
};

function prepareMargins(margins?: Margins) {
  if (margins) {
    return {
      marginTop: margins[0],
      marginRight: margins[1],
      marginBottom: margins[2],
      marginLeft: margins[3],
    };
  }
  return {};
}

export default TextInput;