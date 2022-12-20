import React from "react";
import { useFormContextProvider } from "../form.context";
import { FormFactoryComponent } from "./../form";
import { FormCatalogItem } from "./../form.model";
import { Button } from "@mui/material";
import { MOCK_FORM_NESTED_HORIZONTAL } from "./../components/components-groups/components-group-horizontal/components-group-horizontal.mock";
import { DataDebug } from "./../components/components-items/utils/data-debug";
import "./stories.css";

export default {
  title: "FormFactory/FormCatalogGroups",
  component: FormFactoryComponent,
};

const Template = (args: any) => {
  const catalog: FormCatalogItem[] = MOCK_FORM_NESTED_HORIZONTAL;
  const context = useFormContextProvider(catalog);

  function handleSubmit(event: any) {
    context.submit();
    event.preventDefault(); // avoid redirection
    console.log(`Submit data: ${JSON.stringify(context.data)}`);
    context.setAllFieldsBlured();
  }

  return (
    <>
      {/* <p>data: {JSON.stringify(context.data)}</p> */}
      <div className="story-container">
        <form onSubmit={handleSubmit}>
          <FormFactoryComponent context={context}></FormFactoryComponent>
          {JSON.stringify(context.isSubmitted)}-
          {JSON.stringify(context.isValid())}
          <Button
            disabled={context.shouldDisableSubmit()}
            type="submit"
            variant="contained"
          >
            Submit
          </Button>
        </form>
        <div className="data-debug-container">
          <DataDebug data={context.data}></DataDebug>
        </div>
      </div>
    </>
  );
};

export const FormCatalogGroups = Template.bind({});
