import { Input } from "@nextui-org/input";
import { useController, type UseControllerProps } from "react-hook-form";
import type { InputOptions } from "./InputOptions";

const FInput = (props: UseControllerProps<any> & InputOptions) => {
  const { field, fieldState } = useController(props);

  return (
    <Input
      {...field}
      label={props.label ?? props.name}
      labelPlacement="outside"
      value={String(field.value ?? "")}
      placeholder={props.placeholder}
      type={props.type ?? "string"}
      isInvalid={fieldState.invalid}
      errorMessage={fieldState.error?.message}
      isRequired={Boolean(props.rules?.required) ?? false}
    />
  );
};

export default FInput;
