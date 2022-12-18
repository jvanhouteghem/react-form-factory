import { ComponentsGroupVertical } from "../components/components-groups/components-group-vertical/components-group-vertical";
import { FormInputText } from "../components/components-items/mui/form-input-text";
import { VALIDATOR_REQUIRED } from "../validators/required/required.validator";
import { FormCatalogItem } from "./../form.model";

export const FORM_CATALOG_MOCK: FormCatalogItem[] = [
  {
    id: "bitrate",
    component: FormInputText,
    componentInputs: (context: any, metadata?: any) => {
      // console.log("componentInputs", context, metadata);
      return context?.data?.dvb?.value === ""
        ? { label: "bitrateDvbIsEmpty" }
        : { label: "bitrateDvbIsNOTEmpty" };
    },
    inputValue: (context: any, metadata?: any) => {
      return "bitrateValue";
    },
    // todo remove catalog from input since it is in context
    onChanges: (context: any, metadata?: any) => {
      // TODO use without path
      /* context.setFieldValueFromPath("nyee0", "frombitrate", true, [
          "tuit",
          "nyee",
          "nyee0",
        ]); */
    },
  },
  {
    id: "dvb",
    component: FormInputText,
    validators: (context: any, metadata?: any) => {
      // console.log("validators dvb", context, metadata);
      return [VALIDATOR_REQUIRED];
    },
    componentInputs: () => {
      return { label: "dvbLabel" };
    },
    // inputValue: () => "dvbValue",
  },
  {
    id: "titi",
    component: FormInputText,
    componentInputs: () => {
      return { label: "titiLabel" };
    },
  },
  {
    id: "nelly",
    component: FormInputText,
    componentInputs: () => {
      return { label: "nellyLabel" };
    },
    // TODO data should not display nelly if hidden (or add catalog parameter to ignore)
    display: (context: any, metadata?: any) => {
      return context?.data?.dvb?.value !== "";
    },
  },
  {
    id: "tuit",
    component: ComponentsGroupVertical,
    componentInputs: () => {
      return { label: "tuitlabel" };
    },
    children: [
      {
        id: "mew",
        component: FormInputText,
        componentInputs: () => {
          return { label: "fooLabel" };
        },
        validators: () => [VALIDATOR_REQUIRED],
      },
      {
        id: "bar",
        componentInputs: () => {
          return { label: "barLabel" };
        },
        component: FormInputText,
      },
      {
        id: "nyee",
        component: ComponentsGroupVertical,
        componentInputs: () => {
          return { label: "testlabel" };
        },
        children: [
          {
            id: "nyee0",
            component: FormInputText,
            componentInputs: () => {
              return { label: "nyee0Label" };
            },
            inputValue: () => "nyee0Value",
            validators: () => [VALIDATOR_REQUIRED],
          },
          {
            id: "huu",
            component: ComponentsGroupVertical,
            componentInputs: () => {
              return { label: "huulabel" };
            },
            children: [
              {
                id: "foo",
                component: FormInputText,
                componentInputs: () => {
                  return { label: "huu0Label" };
                },
                inputValue: () => "fooValue",
                validators: () => [VALIDATOR_REQUIRED],
              },
              {
                id: "bar",
                componentInputs: () => {
                  return { label: "huu1Label" };
                },
                component: FormInputText,
              },
            ],
          },
          {
            id: "nyee1",
            componentInputs: () => {
              return { label: "nyee1Label" };
            },
            component: FormInputText,
          },
        ],
      },
    ],
  },
];
