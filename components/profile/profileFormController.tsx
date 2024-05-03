import { Select, SelectItem } from "@nextui-org/select";
import { DatePicker } from "@nextui-org/date-picker";
import { UseControllerProps, useController } from "react-hook-form";
import type {
  DatePickerOptions,
  IProfile,
  SelectOptions,
} from "./profileSchemaTypes";

const FDatePicker = (
  props: UseControllerProps<IProfile> & DatePickerOptions
) => {
  const { field, fieldState } = useController(props);

  return (
    <DatePicker
      label={props.label ?? props.name}
      labelPlacement="outside"
      isInvalid={fieldState.invalid}
      errorMessage={fieldState.error?.message}
      isRequired={Boolean(props.rules?.required) ?? false}
      {...field}
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
      isInvalid={fieldState.invalid}
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

export { FDatePicker, FSelect };
