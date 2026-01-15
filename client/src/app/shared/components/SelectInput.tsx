import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import type { SelectInputProps } from "@mui/material/Select/SelectInput";
import { useController, type FieldValues, type UseControllerProps } from "react-hook-form"

// Props type that extends both UseControllerProps and SelectInputProps
// the items prop is an array of objects with text and value properties for the select options
// use the Partial utility type to make some SelectInputProps optional
type Props<T extends FieldValues> = {
    items: { text: string; value: string }[];
    label: string;
} & UseControllerProps<T> & Partial<SelectInputProps>

// Generic SelectInput component that uses a type parameter T for form values and extends FieldValues
export default function SelectInput<T extends FieldValues>(props: Props<T>) {
    // use the useController hook to connect the input to react-hook-form
    // field contains input props and fieldState contains validation state from react-hook-form
    const { field, fieldState } = useController({ ...props });

    return (
        <FormControl fullWidth error={!!fieldState.error}>
            <InputLabel>{props.label}</InputLabel>
            <Select
                // ensure the value is never undefined by providing a default empty string  
                value={field.value || ''}
                label={props.label}
                // use the onChange handler from react-hook-form to register the select input
                onChange={field.onChange}
            >
                {/* loop through the items array and create a MenuItem for each item */}
                {props.items.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                        {item.text}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
    )
}