import * as React from "react";

/**
 * TODO: i think we're losing `R` here which is important :o
 * @category constructors
 */
export const make =
  <P extends React.DOMAttributes<T>, T extends Element>(type: string) =>
  (props?: (React.ClassAttributes<T> & P) | null) =>
    React.createElement(type, props);
