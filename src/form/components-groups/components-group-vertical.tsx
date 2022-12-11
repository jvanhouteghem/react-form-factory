import "./components-group-vertical.scss";

export const ComponentsGroupVertical = (props: any) => {
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
      <div className="components-group-vertical">
        {props.catalogItem.children.map((catalogItem: any, index: number) => (
          <div key={index}>
            {isDisplay() &&
              props.useFbContext.createElement(
                catalogItem,
                props.useFbContext,
                [
                  ...props.path,
                  catalogItem.id, // todo make it auto
                ]
              )}
          </div>
        ))}
      </div>
    </>
  );
};
