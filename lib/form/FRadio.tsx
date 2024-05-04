import { useController, type UseControllerProps } from "react-hook-form";
import { RadioGroup, Radio } from "@nextui-org/radio";
import type { RadioGroupProps } from "@nextui-org/radio";
import React, { FC } from "react";

type Options = { label: string; value: string }[];

type RadioOptions = {
  placeholder?: string;
  label?: string;

  radioGroupProps?: Partial<RadioGroupProps>;
  options: Options;
};

const FRadioSelect: FC<UseControllerProps<any> & RadioOptions> = (props) => {
  const { field, fieldState } = useController(props);

  return (
    <RadioGroup
      {...field}
      name={props.name}
      label={props.label ?? props.name}
      value={String(field.value ?? "")}
      isInvalid={fieldState.invalid}
      errorMessage={fieldState.error?.message}
      isRequired={Boolean(props.rules?.required) ?? false}
      isDisabled={props.disabled ?? false}
      orientation="horizontal"
      labelPlacement="outside"
      {...props.radioGroupProps}
    >
      {props.options.map((option) => (
        <Radio key={option.value} value={option.value}>
          {option.label}
        </Radio>
      ))}
    </RadioGroup>
  );
};

export default FRadioSelect;
