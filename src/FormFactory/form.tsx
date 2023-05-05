import React, {useState} from "react";

import { useEffect } from "react";
import { useFormContextProvider } from "./form.context";

// TODO when submit, all field should be touched

export function FormFactoryComponent(props: any) {
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
    if (catalogItem.display) {
      res = catalogItem.display(props.context);
    }
    return res;
  }

  const [show, setShow] = useState(false)
  // quickfix for prob with mui rollup build when used in nextjs app
  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, 0)
  })

  return (
    <>
      {show && <div>
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
      </div>}
    </>
  );
}

export default FormFactoryComponent;
