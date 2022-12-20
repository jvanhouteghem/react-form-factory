import React from "react";
import "./data-debug.css";

export const DataDebug = (props) => {
  return (
    <>
      <div className="data-debug">
        {/* <p>data: {JSON.stringify(props.data)}</p> */}
        {Object.keys(props.data).map((key) => (
          <div>
            {props.data.value !== undefined ? (
              <div className="key">
                {key}: {JSON.stringify(props.data[key])}
              </div>
            ) : (
              <div className="title">
                <div>{key}</div>
                <div className="title-inner">
                  <DataDebug data={props.data[key]}></DataDebug>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
