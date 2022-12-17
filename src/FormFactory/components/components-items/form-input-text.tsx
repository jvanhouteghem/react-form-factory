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
  // todo fix here get value from path
  function value(path: any) {
    const data = props.useFbContext.data;
    const value = ObjectUtils.deepFindFromPath(data, path);

    // isRequired();
    return value ? value.value : "";
  }

  // TODO transform to function to check if validator exist (with validator as input)
  // todo in context hook
  function isRequired(): boolean {
    let res = false;
    if (props.catalogItem.validators) {
      const validators = props.catalogItem
        .validators(props.useFbContext)
        .find((v: any) => v.name === "VALIDATOR_REQUIRED");
      res = validators ? true : false;
    }
    return res;
  }

  // todo in context hook
  function getValueFormattedWithRequired(value: any) {
    let res = value;
    if (isRequired()) {
      res = `${value}*`;
    }
    return res;
  }

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
          label={getValueFormattedWithRequired(
            props.catalogItem.componentInputs
              ? props.catalogItem.componentInputs(props.useFbContext, {
                  metadatalui: 65,
                }).label
              : ""
          )} // todo change for componentinputs
          margin="dense"
          variant="outlined"
          size="small"
          value={value(props.path)}
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
