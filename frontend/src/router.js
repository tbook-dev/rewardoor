import { lazy } from "react";

const routes =[
    {
        path: '/',
        layout: 'v1',
        component: lazy(() => import('@/pages/index'))
    },
    {
        path: '/mint',
        component: lazy(() => import('@/pages/mint'))
    },
    {
        path: '/twitter/:username/:twId',
        component: lazy(() => import('@/pages/twitter'))
    },
    {
        path: '/nft/:nftId/:twId',
        component: lazy(() => import('@/pages/detail'))
    },
    {
        path: '/built',
        component: lazy(() => import('@/pages/built'))
    },
]

export default routes;
