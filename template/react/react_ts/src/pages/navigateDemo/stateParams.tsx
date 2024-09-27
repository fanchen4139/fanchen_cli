import {useLocation} from "react-router-dom";
import React from "react";

const StateParams: React.FC<React.PropsWithChildren> = ({children}) => {
  const {state} = useLocation()
  const id = state.id
  console.log(id)
  return (
    <>
      {children}
      <div>id: {id}</div>
    </>
)
}

export default StateParams