import {HomePage} from '@src/pages';

export const routes = [
    {
        route: "/",
        element: <HomePage/>
    },
];

const allwaysShowRoutes = ['/'];
const beforeAuthRoutes = [];

export const filterRoutesByAuthStep = (isAuth) => {
    return routes.filter((item) => {
        if (!isAuth) {
            if (
                beforeAuthRoutes.includes(item.route) ||
                allwaysShowRoutes.includes(item.route)
            ) {
                return item;
            }
        } else if (
            !beforeAuthRoutes.includes(item.route) ||
            allwaysShowRoutes.includes(item.route)
        ) {
            return item;
        }
    });
};