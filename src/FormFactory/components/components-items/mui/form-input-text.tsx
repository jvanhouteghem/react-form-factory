import { TextField } from "@mui/material";
import React from "react";

export function FormInputText(props: any) {
  console.log("FormInputText", props);
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
          {...props.useFbContext.muiItemAttributes(props)}
        />
      }
    </>
  );
}
