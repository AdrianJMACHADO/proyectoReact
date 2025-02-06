//Home.jsx
import { Outlet, useLocation } from "react-router";
import Menu from "../components/Menu";
import MovieCarousel from "../components/MovieCarousel";
import Footer from "../components/Footer";

function Home() {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <>
            <Menu />
            {isHomePage && <MovieCarousel />}
            <Outlet />
            <Footer />
        </>
    );
}

export default Home;