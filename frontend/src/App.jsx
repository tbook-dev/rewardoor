import React, { Suspense, useCallback, useLayoutEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useAsyncEffect } from "ahooks";
import "./css/style.css";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "@/store/user";

import PageNotFound from "./pages/utility/PageNotFound";
import Layout from "./layout/Layout";
import { configResponsive } from "ahooks";

import routes from "./router";
import { Spin } from "antd";


import { WagmiConfig, useAccount } from "wagmi";
import { watchAccount, getAccount, fetchSigner } from "wagmi/actions";
import { wagmiClient, changeAccountSignIn, logout } from "./utils/web3";
import { useNavigate } from "react-router-dom";

configResponsive({
  pc: 1120,
});

const currentAccount = getAccount();
watchAccount(async (acc) => {
  console.log("account changed:", acc);
  if (currentAccount.address == acc.address) return;
  if (!acc.address) {
    // disconnect
    logout().then((r) => {
      location.href = `${location.origin}`;
    });
  } else {
    const signer = await fetchSigner();
    changeAccountSignIn(acc.address, signer).then((r) => {
      location.href = `${location.origin}`;
    });
  }
});

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { address, isConnected } = useAccount()



  useAsyncEffect(async () => {
    if(isConnected && address){
      dispatch(fetchUserInfo({address, showLoading: true}));
    }
  }, [isConnected, address]);

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <Layout>
          <Routes>
            {routes.map((route) => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Suspense
                      fallback={
                        <div className="flex flex-col items-center justify-center h-screen">
                          <Spin />
                        </div>
                      }
                    >
                      <route.component />
                    </Suspense>
                  }
                />
              );
            })}

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Layout>
      </WagmiConfig>
    </>
  );
}

export default App;
