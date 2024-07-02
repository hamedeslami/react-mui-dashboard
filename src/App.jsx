import './global.css';
import 'simplebar-react/dist/simplebar.min.css';


import {useSelector} from "react-redux";
import {Navigate, Route, Routes} from "react-router-dom";
import {filterRoutesByAuthStep} from "./config/routes";
import {authSelector} from "./store/user/user.selector";
import PublicLayout from "@src/layout/public";
import DashboardLayout from "@src/layout/private";

export default function App() {
    // const isAuth = useSelector(authSelector);
    const isAuth = 'ok';
    const routes = filterRoutesByAuthStep(!!isAuth);
    return (
        <Routes>
            <Route element={!!isAuth ? <DashboardLayout/> : <PublicLayout/>}>
                {routes.map((item) => {
                    return (
                        <Route path={item.route} element={item.element} key={item.route}/>
                    );
                })}
                <Route path="*" element={<Navigate replace to={routes[0].route}/>}/>
            </Route>
        </Routes>
    )
}
