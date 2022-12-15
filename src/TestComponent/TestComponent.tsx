import React from "react";

import { TestComponentProps } from "./TestComponent.types";

import "./TestComponent.css";

const TestComponent: React.FC<TestComponentProps> = ({ heading, content }) => (
  <div data-testid="test-component" className="test-component">
    abc
    <h1 data-testid="test-component__heading" className="heading">
      {heading}hiii
    </h1>
    <div data-testid="test-component__content">{content}</div>
  </div>
);

export default TestComponent;

/* import React from "react";

import "./TestComponent.css";
import PropTypes, { InferProps } from "prop-types";

const ComponentPropTypes = {
  heading: PropTypes.string,
  content: PropTypes.string,
};

type ComponentTypes = InferProps<typeof ComponentPropTypes>;

const TestComponent: React.FC<ComponentTypes> = ({ heading, content }) => (
  <div data-testid="test-component" className="test-component">
    abc
    <h1 data-testid="test-component__heading" className="heading">
      {heading}hiii
    </h1>
    <div data-testid="test-component__content">{content}</div>
  </div>
);

TestComponent.propTypes = ComponentPropTypes;
export default TestComponent; */
