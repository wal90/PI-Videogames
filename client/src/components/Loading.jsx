import React from "react";
import s from "../styles/loading.module.css"

class Loading extends React.Component {
  
    render() {
      return (
        <div className={s.loader}></div>
      )
    }
  }
  
  export default Loading;