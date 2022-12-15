import { FormInputText } from "../components/form-input-text";
import { FormCatalogItem } from "./../form.model";

export const FORM_CATALOG_MOCK_SINGLE_FIELD: FormCatalogItem[] = [
  {
    id: "bitrate",
    component: FormInputText,
    componentInputs: (context: any, metadata?: any) => {
      return { label: "bitrateLabel" };
    },
    inputValue: (context: any, metadata?: any) => {
      return "bitrateValue";
    },
    onChanges: (context: any, metadata?: any) => {},
  },
];
