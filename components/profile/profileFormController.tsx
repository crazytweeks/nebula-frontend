import { Input, Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { parseDate } from "@internationalized/date";
import { DatePicker } from "@nextui-org/date-picker";
import { UseControllerProps, useController } from "react-hook-form";
import type {
  DatePickerOptions,
  IProfile,
  InputOptions,
  SelectOptions,
} from "./profileSchemaTypes";

const FInput = (props: UseControllerProps<IProfile> & InputOptions) => {
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

const FTextarea = (props: UseControllerProps<IProfile> & InputOptions) => {
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
const FDatePicker = (
  props: UseControllerProps<IProfile> & DatePickerOptions
) => {
  const { field, fieldState } = useController(props);

  return (
    <DatePicker
      label={props.label ?? props.name}
      labelPlacement="outside"
      isInvalid={
        fieldState.isTouched && fieldState.isDirty && fieldState.invalid
      }
      errorMessage={fieldState.error?.message}
      isRequired={Boolean(props.rules?.required) ?? false}
      {...field}
      value={parseDate(`${field.value ?? "2024-04-04"}`)}
    />
  );
};

const FSelect = (props: UseControllerProps<IProfile> & SelectOptions) => {
  const { field, fieldState } = useController(props);
  return (
    <Select
      {...field}
      label={props.label ?? props.name}
      disabled={props.disabled ?? false}
      labelPlacement="outside"
      isInvalid={
        fieldState.isTouched && fieldState.isDirty && fieldState.invalid
      }
      isRequired={Boolean(props.rules?.required) ?? false}
      errorMessage={fieldState.error?.message}
      required={Boolean(props.rules?.required) ?? false}
      isDisabled={props.disabled}
    >
      {props.options.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export { FInput, FTextarea, FDatePicker, FSelect };
