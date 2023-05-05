import React from "react";
import TextField from "@mui/material/TextField";

export interface SelectProps {
  label?: string;
  defaultValue?: string;
  helperText?: string;
  values: { key: any; value: any }[];
}

export function MuiSelect(props: any) {
  return (
    <>
      <TextField
        id={props.catalogItem.id}
        select
        SelectProps={{
          native: true,
        }}
        variant="standard"
        {...props.useFbContext.muiItemAttributes(props)}
      >
        {props.componentInputs.values.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.value}
          </option>
        ))}
      </TextField>
    </>
  );
}
