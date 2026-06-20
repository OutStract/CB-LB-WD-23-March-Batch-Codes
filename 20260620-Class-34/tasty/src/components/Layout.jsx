import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

function Layout() {
    return (
        <div className="app">
            <style>{`
                html, body, #root {margin: 0}
                body {
                    font-family: system-ui, -apple-system, Segoe UI;
                    background: #f5f7fa;
                    color: #1f2933;
                }
            `}</style>
            <Navbar />
            <main className='app-main'>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout;