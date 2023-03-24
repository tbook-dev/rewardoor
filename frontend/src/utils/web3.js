import { host } from "@/api/index";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { mainnet, bsc } from "wagmi/chains";
import { reset } from "../store/user";

const { chains, provider, webSocketProvider } = configureChains([mainnet, bsc], [publicProvider()]);

export const wagmiClient = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

export async function fetchLoginNonce(address) {
  return fetch(`${host}/nonce?address=${address}`, { credentials: "include" }).then((r) => r.text());
}

export async function loginWithSign(address, sign) {
  const d = new FormData();
  d.append("address", address);
  d.append("sign", sign);
  return fetch(`${host}/authenticate`, {
    credentials: "include",
    method: "POST",
    body: d,
  });
}

async function signLogin(addr, signer, chain, pubKey) {
  if (!addr) return;
  const address = addr.toLowerCase();
  const r = await fetch(`${host}/nonce?address=${address}`, { credentials: "include" });
  const nonce = await r.text();
  const sign = await signer.signMessage(nonce);
  const d = new FormData();
  d.append("address", address);
  d.append("sign", sign);
  // d.append("chain", chain);
  // if (pubKey) {
  //   d.append("publicKey", pubKey);
  // }
  const authResult = await fetch(`${host}/authenticate`, {
    credentials: "include",
    method: "POST",
    // headers:{
    //   "Content-type":'application/x-www-form-urlencoded; charset=UTF-8'
    // },
    body: d,
  });
  return authResult;
}

export function logout() {
  reset();
  return fetch(`${host}/signout`, { credentials: "include" });
}

export async function changeAccountSignIn(addr, signer) {
  return logout().then(() => signLoginMetaMask(addr, signer));
}

export async function signLoginMetaMask(addr, signer) {
  return signLogin(addr, signer, "Ethereum");
}

export async function loginSui(wallet) {
  const signer = {
    signMessage: (message) =>
      wallet.signMessage({
        message: new TextEncoder().encode(message),
      }),
  };
  return signLogin(wallet.account.address, signer, "Sui", wallet.account.publicKey.toString("hex"));
}
