import React from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import '../../css/Router.css';
import { AnimatePresence } from "framer-motion";

import Mylist from "../components/pages/Mylist"
import Home from "../components/pages/Home"
import MovieInfo from '../components/pages/MovieInfo';
import EditMovie from "../components/movies/EditMovie.jsx";
import Index from "../components/movies/Index";
import NotFound from "../components/NotFound";
import Management from "../components/movies/Management";
import AddMovie from "@/components/movies/AddMovie";

function Router() {
    const location = useLocation();
    return (
        <div className='App'>
            <AnimatePresence>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Home />} />
                    <Route path="/my_list" element={<Mylist />} />
                    <Route path="/movieinfo/:id" element={<MovieInfo />} />
                    <Route path="/management" element={<Management />} />
                    <Route path="/management/add_movie" element={<AddMovie />} />
                    <Route path="/management/edit_movie/:id" element={<EditMovie />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </AnimatePresence>
        </div>
    );
}

export default Router;


