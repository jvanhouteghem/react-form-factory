import React from "react";
import TextField from "@mui/material/TextField";

export interface SelectProps {
  label?: string;
  defaultValue?: string;
  helperText?: string;
  values: { key: any; value: any }[];
}

export function Select(props: any) {
  return (
    <>
      <TextField
        select
        SelectProps={{
          native: true,
        }}
        variant="standard"
        {...props.useFbContext.muiItemAttributes(props)}
      >
        {props.componentInputs.values.map((option) => (
          <option key={option.value} value={option.value}>
            {option.value}
          </option>
        ))}
      </TextField>
    </>
  );
}
