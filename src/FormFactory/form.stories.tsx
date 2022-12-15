import React from "react";

import { FormCatalogItem, FORM_CATALOG_MOCK } from "./form.model";
import { useFormContextProvider } from "./form.context";
import { FormFactoryComponent } from "./form";

export default {
  title: "FormFactory",
  component: FormFactoryComponent,
};

const Template = (args: any) => {
  console.log("args", args);

  const catalog: FormCatalogItem[] = FORM_CATALOG_MOCK;
  // important to set it once, else multiple context will exist
  const context = useFormContextProvider(catalog);

  return (
    <>
      <FormFactoryComponent context={context}></FormFactoryComponent>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  catalog: FORM_CATALOG_MOCK,
};

export const Default2 = Template.bind({});
Default2.args = {
  kikoo: 2,
};
