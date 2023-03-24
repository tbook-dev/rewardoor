import _ from "lodash";

export const errMsg = 'An error happens, plase try it later!'

export const dateFormat = "YYYY-MM-DD";

// grant状态：0-default/unknown，1-draft草稿，2-signing签约中，3-effective生效，4-completed完成，5-suspended暂停，6-terminated终止

export const formatDollar = (v = "") => {
  return `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const shortAddress = (address) => {
  return (
    `${address}`.slice(0, 6) +
    "..." +
    `${address}`.slice(`${address}`.length - 4)
  );
};

export const chains = [
  {
    name: "Ethereum",
    fullName: "Ethereum MainNet",
    evm: true,
    evmChainId: 1,
  },
  {
    name: "BSC",
    fullName: "Binance Smart Chain",
    evm: true,
    evmChainId: 56,
  },
];