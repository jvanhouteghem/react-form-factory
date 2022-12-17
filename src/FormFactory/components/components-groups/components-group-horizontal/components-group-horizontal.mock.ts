import { ComponentsGroupVertical } from "../components-group-vertical/components-group-vertical";
import { FormInputText } from "../../components-items/form-input-text";
import { VALIDATOR_REQUIRED } from "../../../validators/required/required.validator";
import { FormCatalogItem } from "../../../form.model";
import { ComponentsGroupHorizontal } from "./components-group-horizontal";

export const MOCK_FORM_NESTED_HORIZONTAL: FormCatalogItem[] = [
  {
    id: "tuit",
    component: ComponentsGroupHorizontal,
    componentInputs: () => {
      return { label: "tuitlabel" };
    },
    children: [
      {
        id: "nyee",
        component: ComponentsGroupVertical,
        componentInputs: () => {
          return { label: "testlabel" };
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
        ],
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
