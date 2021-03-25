import React, { ReactElement } from 'react';

const StateHolderHook : Function = ({initialValue, children} : {initialValue : any, children : Function}) => {
  const [value, setValue] = React.useState(initialValue);

  return children(value, setValue);
};

export default StateHolderHook;
