import { Textarea } from "@nextui-org/input";
import { useController, type UseControllerProps } from "react-hook-form";
import type { InputOptions } from "./InputOptions";

const FTextarea = (props: UseControllerProps<any> & InputOptions) => {
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
    />
  );
};

export default FTextarea;
