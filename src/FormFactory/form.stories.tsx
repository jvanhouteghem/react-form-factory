import React from "react";

import { FormCatalogItem } from "./form.model";
import { useFormContextProvider } from "./form.context";
import { FormFactoryComponent } from "./form";
import { FORM_CATALOG_MOCK } from "./mocks/form-nested-groups.mock";
import { FORM_CATALOG_MOCK_SINGLE_FIELD } from "./mocks/form-single-field.mock";

export default {
  title: "FormFactory",
  component: FormFactoryComponent,
};

const Template = (args: any) => {
  const catalog: FormCatalogItem[] = args.catalog;
  // important to set it once, else multiple context will exist
  const context = useFormContextProvider(catalog);

  return (
    <>
      <p>data: {JSON.stringify(context.data)}</p>
      <FormFactoryComponent context={context}></FormFactoryComponent>
    </>
  );
};

export const SimpleExample = Template.bind({});
SimpleExample.args = {
  t: 2,
  catalog: FORM_CATALOG_MOCK_SINGLE_FIELD,
};

export const ComplexNestedExample = Template.bind({});
ComplexNestedExample.args = {
  catalog: FORM_CATALOG_MOCK,
};
