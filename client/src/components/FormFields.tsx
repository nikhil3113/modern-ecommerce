import { Controller, FieldValues, Control, Path } from "react-hook-form";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface FormFieldProps<T extends FieldValues> {
  name: keyof T;
  control: Control<T>;
  label: string;
  placeholder?: string;
  type?: string;
  description?: string;
}

const FormFields = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = "text",
  description,
}: FormFieldProps<T>) => {
  return (
    <FormItem>
      <FormLabel className="text-[18px]">{label}</FormLabel>
      <Controller
        name={name as Path<T>}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <FormControl>
              {/* <Input
                            {...field}
                            placeholder={placeholder}
                            type={type}
                            aria-invalid={!!fieldState.error}
                            onChange={(e)=>field.onChange(e.target.value)}
                        /> */}
              {type === "textarea" ? (
                <Textarea
                  {...field}
                  placeholder={placeholder}
                  aria-invalid={!!fieldState.error}
                  onChange={(e) => field.onChange(e.target.value)}
                  rows={5}
                />
              ) : (
                <Input
                  {...field}
                  placeholder={placeholder}
                  type={type}
                  aria-invalid={!!fieldState.error}
                  onChange={(e) =>
                    type === "number"
                      ? field.onChange(parseInt(e.target.value)) // Use parseFloat if you expect floating-point numbers
                      : field.onChange(e.target.value)
                  }
                />
              )}
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            {fieldState.error && (
              <FormMessage>{fieldState.error.message}</FormMessage>
            )}
          </>
        )}
      />
    </FormItem>
  );
};

export default FormFields;
