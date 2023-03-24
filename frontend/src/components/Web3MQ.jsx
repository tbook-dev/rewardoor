import React, { useState } from "react";
import { Client } from "@web3mq/client";
import "@web3mq/react-components/dist/css/index.css";
import QRCode from "qrcode";

const Main = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [address, setAddress] = useState("");

  const generateQrCode = async (text) => {
    try {
      return await QRCode.toDataURL(text);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const handleWeb3mqCallback = async (event) => {
    console.log(event, "event");
    const { type, data } = event;
    if (type === "connect") {
      if (data === "success") {
        const link = Client.dappConnectClient.getConnectLink();
        const qrCodeImg = await generateQrCode(link);
        setQrCodeUrl(qrCodeImg);
      }
    }

    if (type === "dapp-connect") {
      if (data) {
        if (data.action === "connectResponse" && data.walletInfo) {
          setAddress(data.walletInfo.address);
        }
        if (data.action === "signResponse" && data.approve) {
          console.log(data);
        }
      }
    }
  };

  const init = async () => {
    const fastUrl = await Client.init({
      connectUrl: localStorage.getItem("FAST_URL") || "https://testnet-ap-jp-1.web3mq.com",
      app_key: "vAUJTFXbBZRkEDRE",
      env: "dev",
    });
    Client.initDappConnectClient(
      { dAppID: "SwapChat:im" },
      handleWeb3mqCallback
    );
  };
  const testSign = async () => {
    await Client.dappConnectClient.sendSign({
      didValue: address,
      signType: "test",
      signContent: "123123",
    });
  };

  return (
    <div>
      <button onClick={init}>init</button>
      <button onClick={testSign}>test Sign</button>
      <div>
        <h2>{address}</h2>
        {qrCodeUrl && (
          <img
            src={qrCodeUrl}
            style={{ width: "200px", height: "200px" }}
            alt=""
          />
        )}
      </div>
    </div>
  );
};
export default Main;