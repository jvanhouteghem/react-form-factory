import React from "react";

import { useFormContextProvider } from "../form.context";
import { FormFactoryComponent } from "../form";
import { FORM_CATALOG_MOCK } from "../mocks/form-nested-groups.mock";
import { FORM_CATALOG_MOCK_SINGLE_FIELD } from "../mocks/form-single-field.mock";
import { FormCatalogItem } from "../form.model";
import { Button } from "@mui/material";
// import { ReactMarkdown } from "react-markdown/lib/react-markdown";
// import remarkGfm from 'remark-gfm';

export default {
  title: "FormFactory/Form Features",
  component: FormFactoryComponent,
};

const Template = (args: any) => {
  const catalog: FormCatalogItem[] = args.catalog;
  const context = useFormContextProvider(catalog);

  function handleSubmit(event: any) {
    context.submit();
    event.preventDefault(); // avoid redirection
    console.log(`Submit data: ${JSON.stringify(context.data)}`);
  }

  return (
    <>
      <p>data: {JSON.stringify(context.data)}</p>
      <form onSubmit={handleSubmit}>
        <FormFactoryComponent context={context}></FormFactoryComponent>
        {args.showSubmit && (
          <Button
            disabled={context.shouldDisableSubmit()}
            type="submit"
            variant="contained"
          >
            Submit
          </Button>
        )}
      </form>
    </>
  );
};

export const SubmitWithRequiredField = Template.bind({});
SubmitWithRequiredField.args = {
  showSubmit: true,
  catalog: FORM_CATALOG_MOCK_SINGLE_FIELD,
};
