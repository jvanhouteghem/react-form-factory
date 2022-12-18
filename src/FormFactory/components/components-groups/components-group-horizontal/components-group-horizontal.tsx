import "./components-group-horizontal.css";
import React from "react";

export const ComponentsGroupHorizontal = (props: any) => {
  // todo in hook
  function isDisplay(): boolean {
    let res = true;
    // if (props.catalogItem.display &&  props.catalogItem.display() && )
    if (props.catalogItem.display) {
      res = props.catalogItem.display(props.useFbContext);
    }
    return res;
  }

  return (
    <>
      {/* {JSON.stringify(props.path)} */}
      <div id={props.catalogItem.id} className="components-group-horizontal">
        {props.catalogItem.children.map((catalogItem: any, index: number) => (
          <React.Fragment key={index}>
            {isDisplay() &&
              props.useFbContext.createElement(
                catalogItem,
                props.useFbContext,
                [
                  ...props.path,
                  catalogItem.id, // todo make it auto
                ]
              )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};
