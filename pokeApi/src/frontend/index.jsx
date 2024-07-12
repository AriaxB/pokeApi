import React from "react";
import Peticion from "../backend/fetch";
import Title from "./titulo";


const View=()=>{
    return(
        <div className="container-carts">
            <Title />
            <Peticion />
        </div>
    )
}
export default View