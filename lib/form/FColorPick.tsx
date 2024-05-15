import { useController, type UseControllerProps } from "react-hook-form";
import { TwitterPicker } from "react-color";
import { cn } from "../utils";

const FColorPick = (
  props: UseControllerProps<any> & {
    label: string;
  }
) => {
  const { field, fieldState } = useController(props);

  return (
    <div
      className={cn(
        "flex flex-row space-y-1",
        "border border-grey-300 dark:border-gray-900 rounded-md my-2 p-2",
        fieldState.error ? "border-red-500" : "",
        fieldState.invalid ? "border-red-500" : ""
      )}
    >
      <span>
        <label htmlFor={field.name} className="text-sm">
          {props.label}
          {props.rules?.required ? (
            <span className="ml-2 text-red-500">{"*"}</span>
          ) : (
            ""
          )}
        </label>
      </span>
      <TwitterPicker
        {...field}
        onChange={(color) => {
          field.onChange(color.hex);
        }}
        color={field.value}
        styles={{
          default: {
            card: {
              boxShadow: "none",
              borderRadius: "0",
              backgroundColor: "transparent",
            },

            triangle: {
              display: "none",
            },
          },
        }}
      />

      {fieldState.error && (
        <div className="text-red-500 text-xs mt-1">
          {fieldState.error.message}
        </div>
      )}
    </div>
  );
};

export default FColorPick;
