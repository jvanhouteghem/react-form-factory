import * as React from "react";
import Switch from "@mui/material/Switch";

export function MuiSwitch(props) {
  return (
    <div id={props.catalogItem.id}>
      <label>{props.componentInputs?.label}</label>
      <Switch {...props.useFbContext.muiSwitchItemAttributes(props)} />
    </div>
  );
}
