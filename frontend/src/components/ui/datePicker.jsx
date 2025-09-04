import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";

export default function MuiDatePicker({ value, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Due Date"
        value={value}
        dateFormat='dd/MM/yyyy'
        mask="__ ___ ____"
        onChange={onChange}
        renderInput={(params) => <TextField {...params} />}

      />
    </LocalizationProvider>
  );
}
