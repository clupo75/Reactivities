import { useEffect, useMemo, useState } from "react";
import { type FieldValues, useController, type UseControllerProps } from "react-hook-form"
import type { LocationIQSuggestion } from "../../../lib/types";
import { Box, debounce, List, ListItemButton, TextField, Typography } from "@mui/material";
import axios from "axios";

type Props<T extends FieldValues> = {
    label: string
} & UseControllerProps<T>

// Generic LocationInput component that uses a type parameter T for form values and extends FieldValues
export default function LocationInput<T extends FieldValues>(props: Props<T>) {
    // use the useController hook to connect the input to react-hook-form
    // field contains input props and fieldState contains validation state from react-hook-form
    const { field, fieldState } = useController({ ...props });
    // loading state for the location input
    const [loading, setLoading] = useState(false);
    // suggestions state for the location input
    const [suggestions, setSuggestions] = useState<LocationIQSuggestion[]>([]);
    // input value state for the location input
    const [inputValue, setInputValue] = useState(field.value || '');

    // whenever the field value changes, update the input value state
    useEffect(() => {
        // check if editing an existing activity and set the input value with the venue
        if (field.value && typeof field.value === 'object') {
            setInputValue(field.value.venue || '');
        } else {
            // for new activity
            setInputValue(field.value || '');
        }
    }, [field.value]);

    const locationUrl = 'https://api.locationiq.com/v1/autocomplete?key=pk.52ea2ddd3e54aa1a81340154fc3934b2&limit=5&dedupe=1&'

    // memoized function to fetch location suggestions from LocationIQ API. This function is debounced to limit API calls
    // memoize the function so that it is not recreated on every render
    const fetchSuggestions = useMemo(
        // debounce the API call to avoid excessive requests, wait 500ms after the user stops typing
        () => debounce(async (query: string) => {
            if (!query || query.length < 3) {
                setSuggestions([]);
                return;
            }
            // set loading state to true before making the API call
            setLoading(true);

            try {
                // make the API call to LocationIQ to get location suggestions
                const res = await axios.get<LocationIQSuggestion[]>(`${locationUrl}q=${encodeURIComponent(query)}`);
                // update the suggestions state with the API response data as an array of LocationIQSuggestion
                setSuggestions(res.data);

            } catch (error) {
                console.error("Error fetching location suggestions:", error);

            } finally {
                setLoading(false);
            }
        }, 500), [locationUrl]
    )

    // handle input change event to fetch suggestions
    const handleChange = async (value: string) => {
        field.onChange(value); // notify react-hook-form of the input change
        await fetchSuggestions(value); // fetch location suggestions based on the input value
    }

    // handle selection of a location suggestion
    const handleSelection = (location: LocationIQSuggestion) => {
        const city = location.address?.city || location.address?.town || location.address?.village || '';
        const venue = location.display_name;
        const latitude = parseFloat(location.lat);
        const longitude = parseFloat(location.lon);

        // update the input value and notify react-hook-form of the selected location
        setInputValue(venue);
        field.onChange({ venue, city, latitude, longitude });
        // clear suggestions after selection
        setSuggestions([]);
    }

    return (
        <Box>
            <TextField
                {...props}
                value={inputValue}
                onChange={e => handleChange(e.target.value)}
                fullWidth
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
            />
            {loading && <Typography>Loading...</Typography>}
            {suggestions.length > 0 && (
                <List sx={{ border: 1 }}>
                    {suggestions.map((suggestion) => (
                        <ListItemButton
                            divider
                            key={suggestion.place_id}
                            onClick={() => {handleSelection(suggestion) }}
                        >
                            {suggestion.display_name}
                        </ListItemButton>
                    ))}
                </List>
            )}
        </Box>
    )
}
