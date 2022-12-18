// import { TextField } from "@mui/material";
import { ObjectUtils } from "../../utils/object.utils";
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
          onBlur={(event: any) =>
            props.useFbContext.handleBlur(props.catalogItem.id, props.path)
          }
          label={props.useFbContext.getValueFormattedWithRequired(
            props.catalogItem.componentInputs
              ? props.catalogItem.componentInputs(props.useFbContext, {
                  metadatalui: 65,
                }).label
              : "",
            props.catalogItem
          )} // todo change for componentinputs
          margin="dense"
          variant="outlined"
          size="small"
          value={props.useFbContext.getFieldValue(props.path)}
          inputProps={{ "data-testid": props.catalogItem.id }}
          onChange={(event: any) =>
            props.useFbContext.changeHandler(
              props.catalogItem,
              event.target.value,
              props.path
            )
          }
          error={
            props.useFbContext.isFieldErrorFromPath(
              props.useFbContext.data,
              props.path
            )
              ? true
              : false
          }
          helperText={
            props.useFbContext.isFieldErrorFromPath(
              props.useFbContext.data,
              props.path
            )
              ? "Incorrect entry."
              : null
          }
        />
      }
    </>
  );
}
