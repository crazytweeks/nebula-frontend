import { TextAreaProps, Textarea } from "@nextui-org/input";
import { useController, type UseControllerProps } from "react-hook-form";

type TextAreaOptions = {
  placeholder?: string;
  label?: string;
  type?: "string" | "number" | "password";

  textAreaProps?: TextAreaProps;
};

const FTextarea = (props: UseControllerProps<any> & TextAreaOptions) => {
  const { field, fieldState } = useController(props);

  return (
    <Textarea
      {...field}
      label={props.label ?? props.name}
      labelPlacement="outside"
      value={String(field.value ?? "")}
      placeholder={props.placeholder}
      type={props.type ?? "string"}
      isInvalid={
        fieldState.isTouched && fieldState.isDirty && fieldState.invalid
      }
      errorMessage={fieldState.error?.message}
      isRequired={Boolean(props.rules?.required) ?? false}
      minRows={1}
      maxRows={4}
      {...props.textAreaProps}
    />
  );
};

export default FTextarea;
