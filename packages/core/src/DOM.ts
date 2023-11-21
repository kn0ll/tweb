import * as React from "react";

export const createElement =
  <P extends React.DOMAttributes<T>, T extends Element>(type: string) =>
  (props?: (React.ClassAttributes<T> & P) | null) =>
    React.createElement(type, props);
