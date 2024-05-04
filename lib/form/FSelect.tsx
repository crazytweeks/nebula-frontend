import { useController, type UseControllerProps } from "react-hook-form";
import { Select, SelectItem } from "@nextui-org/select";
import type { SelectProps } from "@nextui-org/select";
import React, { FC } from "react";

type Options =
  | {
      options?: undefined;
      children: React.ReactNode;
    }
  | {
      children?: undefined;
      options: { label: string; value: string }[];
    };

type SelectOptions = {
  placeholder?: string;
  label?: string;

  selectProps?: Partial<SelectProps>;
} & Options;

const FSelect: FC<UseControllerProps<any> & SelectOptions> = (props) => {
  const { field, fieldState } = useController(props);

  return (
    <Select
      {...field}
      label={props.label ?? props.name}
      labelPlacement="outside"
      value={String(field.value ?? "")}
      placeholder={props.placeholder}
      isInvalid={fieldState.invalid}
      errorMessage={fieldState.error?.message}
      isRequired={Boolean(props.rules?.required) ?? false}
      disabled={props.disabled ?? false}
      {...props.selectProps}
    >
      <>
        {props.children
          ? props.children
          : props.options?.map((option, i) => (
              <SelectItem key={`${option.value}-${i}`} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
      </>
    </Select>
  );
};

export default FSelect;
