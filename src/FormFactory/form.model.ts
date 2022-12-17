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
