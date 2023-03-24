import React, { useState } from "react";
import { signLoginMetaMask, logout } from "@/utils/web3";
import { useDispatch } from "react-redux";
import { setAuthUser, fetchUserInfo } from "@/store/user";
import { chains } from "@/utils/const";
import {
  useAccount,
  useConnect,
  useNetwork,
  useSwitchNetwork,
  useDisconnect,
} from "wagmi";
import { fetchSigner } from "wagmi/actions";

import { useResponsive } from "ahooks";

export default function () {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { pc } = useResponsive();
  const [openLay, setOpenLay] = useState(false);

  const { address, isDisconnected } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  async function handleSignIn() {
    setLoading(true);
    try {
      if (isDisconnected) {
        if (window.ethereum) {
          await connectAsync({
            connector: connectors.find((c) => c.id == "injected"),
            chainId: localStorage.getItem("chainId"),
          });
        } else {
          await open("ConnectWallet");
        }
      }
      const signer = await fetchSigner();
      await signLoginMetaMask(address, signer);
      dispatch(fetchUserInfo({ address, showLoading: false }));
      dispatch(setAuthUser(true));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  return { loading, open, handleSignIn };
}
