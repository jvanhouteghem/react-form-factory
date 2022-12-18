import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import React from "react";
import { FormFactoryComponent } from "../../form";
import { useFormContextProvider } from "../../form.context";
import { FormCatalogItem } from "../../form.model";
import { FORM_CATALOG_MOCK } from "../../mocks/form-nested-groups.mock";

describe("Form Validators Required", () => {
  const catalogWithOneRequired: FormCatalogItem[] = FORM_CATALOG_MOCK; /* [
    {
      id: "bitrate",
      component: MuiText,
      validators: () => [
        (data: any, id: string) => {
          return null;
        },
      ],
    },
    {
      id: "dvbWithErrors",
      component: MuiText,
      validators: () => [VALIDATOR_REQUIRED],
    },
    {
      id: "titi",
      component: MuiText,
    },
  ]; */

  let data: any;
  let container: any;

  beforeEach(() => {
    data = renderHook(() =>
      useFormContextProvider(catalogWithOneRequired)
    ).result;

    container = render(
      <FormFactoryComponent context={data.current}></FormFactoryComponent>
    );
  });

  test("At start, the Form should be invalid", () => {
    // global form should be on error
    expect(data.current.isValid()).toBeFalsy();
  });

  test("At start, the field dvbWithErrors should be the only one to have the required error", async () => {
    // dvb is set empty with a required validator, so the form should contains no traces of value
    // TypeError: Cannot read properties of undefined (reading 'value')
    expect(data.current.data.dvb.value).toBeFalsy();

    // dvb should be on error because this field is set empty with a required validator
    expect(
      data.current.data.dvb.errors.find((error: any) => error.required)
    ).toBeTruthy();

    // bitrate should not be contaminated by dvb, so it should be without errors
    expect(
      data.current.data.bitrate?.errors?.find((error: any) => error.required)
    ).toBeFalsy();

    // titi should not be contaminated by dvb, so it should be without errors
    expect(
      data.current.data.titi?.errors?.find((error: any) => error.required)
    ).toBeFalsy();
  });

  test("The field dvbWithErrors should not be on error if filled then on error if empty", () => {
    // fill dvbWithErrors and check there is NO required error in the FIELD
    const input = screen.getByTestId("dvb");
    fireEvent.change(input, { target: { value: "matti" } });
    expect(
      data.current.data.dvb?.errors?.find((error: any) => error.required)
    ).toBeFalsy();

    // unfill dvbWithErrors and check there IS required error in the FIELD
    fireEvent.change(input, { target: { value: "" } });
    expect(
      data.current.data.dvb?.errors?.find((error: any) => error.required)
    ).toBeUndefined();
  });

  test("The form should be valid if dvbWithErrors is filled and invalid if empty", () => {
    // fill dvbWithErrors and check the form IS valid
    const input = screen.getByTestId("dvb");
    fireEvent.change(input, { target: { value: "mattilol" } });
    expect(data.current.isValid()).toBeTruthy();
  });

  test("The form should be valid if dvbWithErrors is filled and invalid if empty", () => {
    // fill dvbWithErrors and check the form is NOT valid
    const input = screen.getByTestId("dvb");
    fireEvent.change(input, { target: { value: "" } });
    expect(data.current.isValid()).toBeFalsy();
  });
});
