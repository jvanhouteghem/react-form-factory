import { FormInputText } from "../components/components-items/mui/form-input-text";
import { VALIDATOR_REQUIRED } from "../validators/required/required.validator";
import { FormCatalogItem } from "./../form.model";

export const FORM_CATALOG_MOCK_SINGLE_FIELD: FormCatalogItem[] = [
  {
    id: "bitrate",
    component: FormInputText,
    componentInputs: (context: any, metadata?: any) => {
      return { label: "bitrateLabel" };
    },
    inputValue: (context: any, metadata?: any) => {
      return "";
    },
    onChanges: (context: any, metadata?: any) => {},
    validators: (context: any, metadata?: any) => {
      // console.log("validators dvb", context, metadata);
      return [VALIDATOR_REQUIRED];
    },
  },
];
