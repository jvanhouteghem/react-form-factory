import React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

export interface SelectProps {
  id: string;
  label?: string;
  defaultValue?: string;
  helperText?: string;
  values: { key: any; value: any }[];
}

export function Select(props: any) {
  const currencies = [
    {
      value: "USD",
      label: "$",
    },
    {
      value: "EUR",
      label: "€",
    },
    {
      value: "BTC",
      label: "฿",
    },
    {
      value: "JPY",
      label: "¥",
    },
  ];

  return (
    <>
      <TextField
        id="standard-select-currency-native"
        select
        label="Native select"
        SelectProps={{
          native: true,
        }}
        helperText="Please select your currency"
        variant="standard"
        {...props.useFbContext.muiItemAttributes(props)}
      >
        {currencies.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>
    </>
  );
}
