/* import { useEffect } from "react";
import { useFormContextProvider } from "./form.context"; */
import React from "react";
/* export function FormFactoryComponent(props: any) {
  // see https://react-hook-form.com/
  return <>heyhey</>;
} */

/* const FormFactoryComponent: React.FC<any> = ({ heading, content }: any) => {
  console.log("haa sans gluten");

  return <div>kikoo</div>;
}; */

import { useEffect } from "react";
import { useFormContextProvider } from "./form.context";

export function FormFactoryComponent(props: any) {
  // make context @input optional
  const defaultContext = useFormContextProvider();
  function getContext() {
    return props.context ? props.context : defaultContext;
  }

  // componentDidMount
  useEffect(() => {
    getContext().initForm();
  }, []);

  // todo in hook
  function isDisplay(catalogItem: any): boolean {
    let res = true;
    // if (props.catalogItem.display &&  props.catalogItem.display() && )
    if (catalogItem.display) {
      res = catalogItem.display(props.context);
    }
    return res;
  }

  // see https://react-hook-form.com/
  return (
    <>
      {/* <p>Form context data: {JSON.stringify(getContext().data)}</p> */}
      {/* data.foo || "" => A component is changing an uncontrolled input of type text to be controlled error in ReactJS: https://stackoverflow.com/a/47012342/3086147 */}
      <div>
        {props.context.catalog.map((catalogItem: any, index: number) => (
          <div key={index}>
            {isDisplay(catalogItem) &&
              getContext().createElement(catalogItem, getContext(), [
                catalogItem.id,
              ])}
            {/* React.createElement(catalogItem.component, {
              useFbContext: getContext(), 
              ...getContext().getComponentInputs(catalogItem),
              //children: catalogItem.children,
            }) */}
          </div>
        ))}
      </div>
    </>
  );
}

export default FormFactoryComponent;
