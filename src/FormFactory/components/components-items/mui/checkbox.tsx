import * as React from "react";
import Switch from "@mui/material/Switch";
import { Checkbox } from "@mui/material";

const label = { inputProps: { "aria-label": "Size switch demo" } };

export function MuiCheckBox(props) {
  return (
    <div>
      <label>{props.componentInputs?.label}</label>
      <Checkbox defaultChecked />
    </div>
  );
}
