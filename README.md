# React Form Catalog (RFC) 📋🚀

<img src="https://raw.githubusercontent.com/jvanhouteghem/react-form-factory/storybook-init/assets/imgs/logosmall.png" alt="logo" width="350"/>

### (ง︡'-'︠)ง WARNING : This library is under development (ALPHA). (ɔ◔‿◔)ɔ ♥

## A powerful and easy tool to create forms for React applications.

[![Edit jamesmcallister/styled-components-tachyons: example-site](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-form-catalog-q31frp)

RFC follow these principles:

- Fast: create your form in just a few minutes.
- Easy to use and developper friendly: The tool is design to be simple and intuitive. A lot of examples are provided.
- No boilerplate: you define a catalog and RFC do the rest.
- Full dynamic: fields interacts which each others. You can change dynamically value, validators, display etc.
- Fully personalisable: you can use every field you want, and display them like you want.

## I. How it works ?

Here is the steps to create a new form:

### 1. Create your form catalog (i.e an array of fields and/or structures).

```tsx
const FORM_CATALOG_SIMPLE_EXAMPLE: FormCatalogItem[] = [
  {
    id: "bitrate", // the field uniq key
    component: FormInputText, // your field component
  },
];
```

### 2. Create a context variable

```tsx
const context = useFormContextProvider(FORM_CATALOG_SIMPLE_EXAMPLE);
```

### 3. Call the form component and inject the context:

```tsx
<FormFactoryComponent context={context}></FormFactoryComponent>
```

Thats all. Enjoy the form and the UI 👍.

## II. More examples

### 1. How to create custom field item component ?

a. You have to give the form context to your component (ex: props.useFbContext)

```tsx
import { TextField } from "@mui/material";
import React from "react";

export function FormInputText(props: any) {
  return (
    <>
      {
        <TextField
          margin="dense"
          variant="outlined"
          size="small"
          /** order is important for overriding: put it after all the other attributes */
          {...props.useFbContext.muiItemAttributes(props)}
        />
      }
    </>
  );
}
```

b. Add this to your field component

```tsx
{...props.useFbContext.muiItemAttributes(props)}
```
