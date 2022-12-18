import * as React from "react";
import Switch from "@mui/material/Switch";

export function MuiSwitch(props) {
  return (
    <div>
      <label>{props.componentInputs?.label}</label>
      <Switch {...props.useFbContext.muiItemAttributes(props)} defaultChecked />
    </div>
  );
}
