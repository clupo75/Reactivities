import { TextField, type TextFieldProps } from "@mui/material";
import { useController, type FieldValues, type UseControllerProps } from "react-hook-form"

// Props type that extends both UseControllerProps and TextFieldProps
type Props<T extends FieldValues> = {} & UseControllerProps<T> & TextFieldProps

// Generic TextInput component that uses a type parameter T for form values and extends FieldValues
export default function TextInput<T extends FieldValues>(props: Props<T>) {
    // use the useController hook to connect the input to react-hook-form
    // field contains input props and fieldState contains validation state from react-hook-form
    const { field, fieldState } = useController({...props});

    return (
        <TextField
            {...props}
            {...field}
            value={field.value || ''}
            fullWidth
            variant="outlined"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
        />
    )
}
