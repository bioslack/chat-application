interface ButtonProps {
  type?: "submit" | "button" | "reset";
  label?: string;
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  return (
    <button type={props.type} disabled={props.disabled} className="button">
      {props.label}
    </button>
  );
};

export default Button;