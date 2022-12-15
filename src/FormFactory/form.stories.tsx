import TestComponent from "./../TestComponent/TestComponent";
import React from "react";

import { FormCatalogItem, FORM_CATALOG_MOCK } from "./form.model";
import { useFormContextProvider } from "./form.context";
import { FormFactoryComponent } from "./form";

export default {
  title: "kikoo",
  component: TestComponent,
};

export const Default = (args) => {
  const catalog: FormCatalogItem[] = FORM_CATALOG_MOCK;
  // important to set it once, else multiple context will exist
  const context = useFormContextProvider(catalog);

  return (
    <>
      <FormFactoryComponent context={context}></FormFactoryComponent>
    </>
  );
};

export const Default2 = (args) => {
  return <div>kikoo</div>;
};
