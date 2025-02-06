//Home.jsx
import { Outlet, useLocation } from "react-router";
import Menu from "../components/Menu";
import MovieCarousel from "../components/MovieCarousel";

function Home() {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <>
            <Menu />
            {isHomePage && <MovieCarousel />}
            <Outlet />
        </>
    );
}

export default Home;