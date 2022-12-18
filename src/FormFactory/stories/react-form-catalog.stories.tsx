import React from "react";
import { useFormContextProvider } from "../form.context";
import { FormFactoryComponent } from "./../form";
import { FormCatalogItem } from "./../form.model";
import { Button } from "@mui/material";
import { FORM_CATALOG_MOCK_SINGLE_FIELD } from "../mocks/form-single-field.mock";
import { MOCK_FORM_NESTED_HORIZONTAL } from "./../components/components-groups/components-group-horizontal/components-group-horizontal.mock";

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
  }

  return (
    <>
      {<p>data: {JSON.stringify(context.data)}</p>}
      <form onSubmit={handleSubmit}>
        <FormFactoryComponent context={context}></FormFactoryComponent>
        <Button
          disabled={context.shouldDisableSubmit()}
          type="submit"
          variant="contained"
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export const FormCatalogGroups = Template.bind({});
