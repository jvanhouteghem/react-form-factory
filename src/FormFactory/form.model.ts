import { VALIDATOR_REQUIRED } from "./validators/required/required.validator";
import { FormInputText } from "./components/form-input-text";
import { ComponentsGroupVertical } from "./components-groups/components-group-vertical";

export interface FormCatalogItem {
  id: string;
  component: any;
  componentInputs?: any;
  children?: FormCatalogItem[];
  validators?: any;
  onChanges?: any;
  inputValue?: any;
  display?: any;
}
