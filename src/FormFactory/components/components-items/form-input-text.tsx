import { TextField } from "@mui/material";
import React from "react";

/*
{
  label: string;
  value?: string;
  useFbContext: FormContext;
  id: string;
  changeHandler?: any;
  setBlur?: any; // todo remove
}
*/

export function FormInputText(props: any) {
  return (
    <>
      {/*TODO find a way to remove path from inputs*/}
      {/* {JSON.stringify(props.path)} */}
      {/* TODO rename: useFbContext is unconsistant naming with context */}
      {
        <TextField
          margin="dense"
          variant="outlined"
          size="small"
          /** order is important for overriding: put it after all the other attributes */
          {...props.useFbContext.uiItemAttributes(props)}
        />
      }
    </>
  );
}
