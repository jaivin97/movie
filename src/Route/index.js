import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomeContainer from "../Container/Home";
import MoviewContainer from "../Container/Movies";
import FooterComponent from "../Components/Footer";
import HeaderComponent from "../Components/Header";

const RouteComponent = () => {

    return (
        <>
        <BrowserRouter>
         <HeaderComponent/>

         <Routes>
            <Route path="/"  element={<HomeContainer/>} />
            <Route path="/movies/:movieid"  element={<MoviewContainer/>} />
         </Routes>
         <FooterComponent/>
        </BrowserRouter>
        </>
    )
}

export default RouteComponent;