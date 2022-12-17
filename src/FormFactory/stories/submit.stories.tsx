import React from "react";

// import { ReactMarkdown } from "react-markdown/lib/react-markdown";
// import remarkGfm from 'remark-gfm';
import { FormFactoryComponent } from "../form";
import { FormCatalogItem } from "../form.model";
import { useFormContextProvider } from "../form.context";
import { Button } from "@mui/material";
import { FORM_CATALOG_MOCK_SINGLE_FIELD } from "../mocks/form-single-field.mock";

export default {
  title: "FormFactory/Form Features/Submit",
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

export const Submit = Template.bind({});
Submit.args = {
  showSubmit: true,
  catalog: FORM_CATALOG_MOCK_SINGLE_FIELD,
};
