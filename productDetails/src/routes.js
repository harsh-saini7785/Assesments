import { lazy } from 'react';
import endPoints from './endPoints.js';

const routes = [
    {
        path: endPoints.home,
        component: lazy(() => import('../src/pages/ProductDetails/ProductDetails.jsx')),
        exact: true,
    },
    {
        path: endPoints.comepareProducts,
        component: lazy(() => import('../src/pages/CompareProducts/CompareProducts.jsx')),
        exact: true,
    },
];

export default routes;