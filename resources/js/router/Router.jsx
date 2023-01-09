import React from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import '../../css/Router.css';
import { AnimatePresence } from "framer-motion";

import Mylist from "../components/pages/Mylist"
import Home from "../components/pages/Home"
import MovieInfo from '../components/pages/MovieInfo';
import Change from "../components/movies/Change";
import Index from "../components/movies/Index";
import NotFound from "../components/NotFound";
import Management from "../components/movies/Management";
import NewMovie from "../components/movies/New";

function Router() {
    const location = useLocation();
    return (
        <div className='App'>
            <AnimatePresence>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Home />} />
                    <Route path="/mylist" element={<Mylist />} />
                    <Route path="/movieinfo/:id" element={<MovieInfo />} />
                    <Route path="/management/change" element={<Change />} />
                    <Route path="/management" element={<Management />} />
                    <Route path="/movie/new" element={<NewMovie />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </AnimatePresence>
        </div>
    );
}

export default Router;


