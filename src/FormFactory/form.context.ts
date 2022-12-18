import React, { useMemo, useState } from "react";
import { ObjectUtils } from "./utils/object.utils";

export interface FormContext {
  data: { [key: string]: any };
  setData: Function;
  [key: string]: any;
}

// should be used in App.hook.ts ?
export const FormContext = React.createContext<FormContext>({
  data: {},
  setData: (value: any) => {},
});

export const useFormContextProvider = (_catalog?: any) => {
  const [catalog, setCatalog] = useState(_catalog); // todo check if consistency for optional (optional already made somewhere else ?)
  const [data, setData] = useState<{ [key: string]: any }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dataContextValue = useMemo(() => ({ data, setData }), [data]);

  // submit change the isSubmitted value (and make all fields dirty?)
  function submit() {
    setIsSubmitted(true);
  }

  function initForm() {
    const initValue = (catalogItem: any) => {
      const currValue = catalogItem.inputValue
        ? catalogItem.inputValue(getContext(), { metadatafoo: 2 })
        : "";
      return {
        value: currValue,
        dirty: false,
        blur: false,
        errors: getCatalogItemValidatorsResult(catalogItem, currValue), // ex: [{"required":true}]
      };
    };
    // TODO replace by global loop function ?
    setData(ObjectUtils.initFormStructure(catalog, "children", initValue));
  }

  // todo rename is validForm ?
  const isValid = (): boolean => {
    let errors = { errors: [] };
    getDataItemsOnError(data, errors);
    return errors.errors.length === 0;
  };

  // TODO generic loop with function ?
  function getDataItemsOnError(data: any, res: any) {
    for (const [key, value] of Object.entries(data)) {
      if (ObjectUtils.isObject(value)) {
        getDataItemsOnError(data[key], res);
      } else {
        if (key === "errors") {
          if ((value as Array<any>)?.length > 0) {
            res.errors = [...res.errors, data];
          }
        }
      }
    }
  }

  // recommanded behavior
  function shouldDisableSubmit() {
    return getContext().isSubmitted && !getContext().isValid();
  }

  // todo not sure if usefull for global form (submit should be more usefull); // but it still usefull for field
  /* const isDirty = (): boolean => {
    let isDirty = true;
    for (const [key, value] of Object.entries(data)) {
      if (value.dirty) {
        isDirty = false;
        break;
      }
    }
    return isDirty;
  }; */

  // blur (react) === lostfocus (js)
  // todo hook
  function isFieldErrorFromPath(fieldData: any, path: string[]) {
    const field = ObjectUtils.deepFindFromPath(fieldData, path);
    return (
      field?.errors?.length > 0 &&
      ((field?.errors && field.dirty) || (field?.errors && field.blur))
    );
  }

  function getCatalogItemValidatorsResult(catalogItem: any, value?: any) {
    const compValidators: any = [];

    if (catalogItem.validators) {
      for (let validator of catalogItem.validators(getContext(), {
        metadataFoo: 2,
      })) {
        if (value !== "" && !value) {
          value = ObjectUtils.deepFind(data, catalogItem.id).value;
        }

        const validation = validator(value); // validator(data, catalogItem.id);
        if (validation) {
          compValidators.push(validation);
        }
      }
    }

    return compValidators;
  }

  // TODO make it once with getValidators
  function setValidator(catalogItem: any) {
    // set validators
    if (catalogItem.validators) {
      const compValidators = getCatalogItemValidatorsResult(catalogItem);
      if (compValidators.length > 0) {
        /* setData({
          ...ObjectUtils.mergeRecursive(data, {
            [catalogItem.id]: { errors: [...compValidators] }, // TODO fix here, deep upgrade
          }),
        }); */
        // TODO FIX: catalogItem.id send back dvb... (replace foo)
        const path = ObjectUtils.getPathFromObj(data, catalogItem.id);
        const deepSetValue = ObjectUtils.deepSetValue(path, {
          errors: [...compValidators],
          dirty: true,
        });
        setData({
          ...ObjectUtils.mergeRecursive(data, deepSetValue),
        });
      }
    }
  }

  //
  function loopActionThroughCatalog(catalog: any, funct: Function, res: any) {
    for (let catalogItem of catalog) {
      if (catalogItem.children) {
        res[catalogItem.id] = {};
        loopActionThroughCatalog(
          catalogItem.children,
          funct,
          res[catalogItem.id]
        );
      } else {
        res[catalogItem.id] = {};
        funct(catalogItem, res);
      }
    }
  }

  function getValidatorsObj(catalog: any) {
    function functLoopItemGetErrorsObj(catalogItem: any, res: any) {
      // init data errors
      res[catalogItem.id] = { ...res[catalogItem.id], errors: [] };
      // set errors
      if (catalogItem.validators) {
        for (let v of catalogItem.validators(getContext(), {
          metadataFoofofo: 6,
        })) {
          const contextValue = ObjectUtils.deepFind(data, catalogItem.id);
          if (contextValue) {
            const error = v(contextValue.value);
            if (error) {
              res[catalogItem.id].errors = [
                ...res[catalogItem.id].errors,
                v(contextValue.value),
              ];
            }
          }
        }
      }

      return res;
    }

    let res = {};
    loopActionThroughCatalog(catalog, functLoopItemGetErrorsObj, res);
    return res;
  }

  // todo use it also in initialization ? or at least the getValidators
  function setValidators() {
    const validatorsObj = getValidatorsObj(catalog);
    setData({
      ...ObjectUtils.mergeRecursive(data, validatorsObj),
    });
  }

  function handleBlur(id: string, path: string[]) {
    let blurValue = ObjectUtils.deepSetValue(path, { blur: true });
    setData({
      ...ObjectUtils.mergeRecursive(data, blurValue),
    });
  }

  function getComponentInputs(catalogItem: any) {
    return catalogItem.componentInputs
      ? catalogItem.componentInputs(getContext(), { metadatalui: 65 })
      : {};
  }

  function createElement(catalogItem: any, context: any, path: any) {
    // todo remove catalogoitem.foo and give only catalogitem
    return React.createElement(catalogItem.component, {
      catalogItem, // TODO remove ?
      path: path,
      useFbContext: context,
      ...getComponentInputs(catalogItem),
    });
  }

  function changeHandler(catalogItem: any, formValue: any, path: any) {
    // set data + dirty and reset validators
    //setFieldValue(catalogItem.id, formValue);
    setFieldValueFromPath(catalogItem.id, formValue, false, path);

    // call catalogItem onChanges
    catalogItem.onChanges &&
      catalogItem.onChanges(getContext(), { metadataExample: "toto" });

    setValidators(); // todo check if usefull (remove ?)
  }

  function setFieldValue(id: any, value: any, callValidators: boolean = false) {
    setData({
      ...ObjectUtils.mergeRecursive(data, {
        [id]: { value: value, dirty: true, errors: undefined }, // TODO why errors: undefined ???
      }),
    });
    if (callValidators) {
      setValidators();
    }
  }

  function setFieldValueFromPath(
    id: any,
    value: any,
    callValidators: any,
    path: any
  ) {
    const objectValue = { value: value, dirty: true, errors: undefined }; // TODO why errors: undefined ???

    setData({
      ...ObjectUtils.mergeRecursive(
        data,
        ObjectUtils.deepSetValue(path, objectValue)
      ),
    });
    if (callValidators) {
      setValidators();
    }
  }

  // todo replace path by field id
  function getFieldValue(path: any) {
    const data = this.data;
    const value = ObjectUtils.deepFindFromPath(data, path);
    return value ? value.value : "";
  }

  function isRequired(catalogItem): boolean {
    let res = false;
    if (catalogItem.validators) {
      const validators = catalogItem
        .validators(getContext())
        .find((v: any) => v.name === "VALIDATOR_REQUIRED");
      res = validators ? true : false;
    }
    return res;
  }

  // TODO transform to function to check if validator exist (with validator as input)
  function getValueFormattedWithRequired(value: any, catalogItem: any) {
    let res = value;
    if (isRequired(catalogItem)) {
      res = `${value}*`;
    }
    return res;
  }

  // TODO test it with other mui field and no mui fields
  function uiItemAttributes(props) {
    return {
      label: props.useFbContext.getValueFormattedWithRequired(
        props.catalogItem.componentInputs
          ? props.catalogItem.componentInputs(props.useFbContext, {
              metadatalui: 65,
            }).label
          : "",
        props.catalogItem
      ),
      onBlur: (event: any) =>
        props.useFbContext.handleBlur(props.catalogItem.id, props.path),
      value: props.useFbContext.getFieldValue(props.path),
      inputProps: { "data-testid": props.catalogItem.id },
      onChange: (event: any) =>
        props.useFbContext.changeHandler(
          props.catalogItem,
          event.target.value,
          props.path
        ),
      error: props.useFbContext.isFieldErrorFromPath(
        props.useFbContext.data,
        props.path
      )
        ? true
        : false,
      helperText: props.useFbContext.isFieldErrorFromPath(
        props.useFbContext.data,
        props.path
      )
        ? "Incorrect entry."
        : null,
    };
  }

  function getContext() {
    // todo make it clean, all the function should be in utils object ?
    return {
      data,
      setData,
      isSubmitted,
      setIsSubmitted,
      submit,
      shouldDisableSubmit,
      dataContextValue,
      isValid,
      // isDirty,
      isFieldErrorFromPath,
      setValidator,
      handleBlur,
      catalog,
      setCatalog,
      setValidators,
      getComponentInputs, // todo remove
      createElement,
      changeHandler,
      setFieldValue,
      setFieldValueFromPath,
      initForm,
      getFieldValue,
      getValueFormattedWithRequired,
      uiItemAttributes,
    };
  }

  return getContext();
};
