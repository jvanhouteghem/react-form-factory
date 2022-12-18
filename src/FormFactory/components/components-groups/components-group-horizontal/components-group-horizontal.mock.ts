import { ComponentsGroupVertical } from "../components-group-vertical/components-group-vertical";
import { MuiText } from "../../components-items/mui/text";
import { VALIDATOR_REQUIRED } from "../../../validators/required/required.validator";
import { FormCatalogItem } from "../../../form.model";
import { ComponentsGroupHorizontal } from "./components-group-horizontal";
import { MuiSelect } from "../../components-items/mui/select";
import { SelectProps } from "./../../components-items/mui/select";
import { MuiSwitch } from "../../components-items/mui/switch";
import { MuiCheckBox } from "../../components-items/mui/checkbox";

export const MOCK_FORM_NESTED_HORIZONTAL: FormCatalogItem[] = [
  {
    id: "tuit",
    component: ComponentsGroupHorizontal,
    componentInputs: () => {
      return { label: "tuitlabel" };
    },
    children: [
      {
        id: "nyee00",
        component: ComponentsGroupVertical,
        componentInputs: () => {
          return { label: "testlabel" };
        },
        children: [
          {
            id: "mew",
            component: MuiText,
            componentInputs: () => {
              return { label: "fooLabel" };
            },
            validators: () => [VALIDATOR_REQUIRED],
          },
          {
            id: "bar",
            component: MuiSelect,
            componentInputs: (context): SelectProps => {
              return {
                label: "barLabel",
                values: [
                  {
                    key: "USD",
                    value: "$",
                  },
                  {
                    key: "EUR",
                    value: "€",
                  },
                ],
              };
            },
            inputValue: () => "EUR", // TODO rename ? input value can be confused with component inputs
          },
          {
            id: "muiswitch",
            component: MuiSwitch,
            componentInputs: () => {
              return { label: "muiSwitchLabel" };
            },
          },
          {
            id: "muiCheckBox",
            component: MuiCheckBox,
            componentInputs: () => {
              return { label: "muiSwitchLabel" };
            },
          },
        ],
      },
      {
        id: "nyee01",
        component: ComponentsGroupVertical,
        componentInputs: () => {
          return { label: "testlabel" };
        },
        children: [
          {
            id: "nyee0",
            component: MuiText,
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
                component: MuiText,
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
                component: MuiText,
              },
            ],
          },
          {
            id: "nyee1",
            componentInputs: () => {
              return { label: "nyee1Label" };
            },
            component: MuiText,
          },
        ],
      },
    ],
  },
];
