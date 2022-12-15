import React from "react";
import { render, renderHook } from "@testing-library/react";
import { FormFactoryComponent } from "./form";
import { useFormContextProvider } from "./form.context";
import { FORM_CATALOG_MOCK } from "./mocks/form-nested-groups.mock";

// https://github.com/testing-library/jest-dom#inspiration
// for more expect matchers with Jest

// fill input and check validator truthy
// https://dev.to/mbarzeev/testing-a-simple-component-with-react-testing-library-5bc6

describe("Form validator required", () => {
  let container: any;
  let catalog: any;
  let context: any;

  beforeAll(() => {
    catalog = FORM_CATALOG_MOCK;
    // fail if set directly .current
    context = renderHook(() => useFormContextProvider(catalog)).result;
    container = render(
      <FormFactoryComponent context={context.current}></FormFactoryComponent>
    );
  });

  test("Form is not submitted on init", async () => {
    expect(context.current.isSubmitted).toBeFalsy();
  });

  test("Form is invalid because dvb is required and is value is empty", async () => {
    expect(context.current.data.dvb.value).toBeFalsy();
    expect(context.current.isValid()).toBeFalsy();
  });

  // quicktest: update if data changes...
  test("Form init data working as expected", async () => {
    const expectedData = {
      bitrate: { value: "bitrateValue", dirty: false, blur: false, errors: [] },
      dvb: {
        value: "",
        dirty: false,
        blur: false,
        errors: [{ required: true }],
      },
      titi: { value: "", dirty: false, blur: false, errors: [] },
      nelly: { value: "", dirty: false, blur: false, errors: [] },
      tuit: {
        mew: {
          value: "",
          dirty: false,
          blur: false,
          errors: [{ required: true }],
        },
        bar: { value: "", dirty: false, blur: false, errors: [] },
        nyee: {
          nyee0: { value: "nyee0Value", dirty: false, blur: false, errors: [] },
          huu: {
            foo: { value: "fooValue", dirty: false, blur: false, errors: [] },
            bar: { value: "", dirty: false, blur: false, errors: [] },
          },
          nyee1: { value: "", dirty: false, blur: false, errors: [] },
        },
      },
    };

    expect(context.current.data).toMatchObject(expectedData);
  });
});

/*
  TODO TEST when start the submit button is enable but the form have errors
  then click submit the button is disable
  then fill form
  there is no more error and the button is enabled
*/

/* TODO TEST blur: 
no field is blured on load
when lost focus the field is blur
also the other field are still not blured
*/

/* TODO TEST dirty: 
no field is dirty on load
when typing the field become dirty
also the other field are still not dirty
*/

// TODO TEST onchanges
// check context is not empty
// fill bitrate--> check dvblabel is filled and titi is not field
