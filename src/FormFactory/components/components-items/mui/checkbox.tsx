import * as React from "react";
import Switch from "@mui/material/Switch";
import { Checkbox } from "@mui/material";

const label = { inputProps: { "aria-label": "Size switch demo" } };

export function MuiCheckBox(props) {
  return (
    <div id={props.catalogItem.id}>
      <label>{props.componentInputs?.label}</label>
      <Checkbox {...props.useFbContext.muiSwitchItemAttributes(props)} />
    </div>
  );
}
