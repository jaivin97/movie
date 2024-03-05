import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomeContainer from "../Container/Home";
import AboutContainer from "../Container/About";
import MoviewContainer from "../Container/Movies";
import SearchContainer from "../Container/Search";
import FooterComponent from "../Components/Footer";
import HeaderComponent from "../Components/Header";

const RouteComponent = () => {

    return (
        <>
        <BrowserRouter>
         <HeaderComponent/>

         <Routes>
            <Route path="/"  element={<HomeContainer/>} />
            <Route path="/about"  element={<AboutContainer/>} />
            {/* <Route path="/movies"  element={<MoviewContainer/>} /> */}
            <Route path="/movies/:movieid"  element={<MoviewContainer/>} />
            <Route path="/search"  element={<SearchContainer/>} />

         </Routes>
         <FooterComponent/>
        </BrowserRouter>
        </>
    )
}

export default RouteComponent;