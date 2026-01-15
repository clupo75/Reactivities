import { useController, type FieldValues, type UseControllerProps } from "react-hook-form"
import { DateTimePicker, type DateTimePickerProps } from "@mui/x-date-pickers/DateTimePicker";

type Props<T extends FieldValues> = {} & UseControllerProps<T> & DateTimePickerProps;

export default function DateTimeInput<T extends FieldValues>(props: Props<T>) {
    // use the useController hook to connect the input to react-hook-form
    // field contains input props and fieldState contains validation state from react-hook-form
    const { field, fieldState } = useController({...props});
    
    return (
        <DateTimePicker
            {...props}
            value={field.value ? new Date(field.value) : null}
            onChange={value => {
                field.onChange(new Date(value!))
            }}
            sx={{width: '100%'}}
            // using slotProps so the date picker acts like a text field
            slotProps={{
                textField: {
                    onBlur: field.onBlur,
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message,
                }
            }}
        />
    )
}
