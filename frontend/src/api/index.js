import request from "./request";
import tw from "@/images/tw.png";
// import defaultAvatar from "@/images/default.png";
import { Network, Alchemy } from "alchemy-sdk";
import { readAttestation } from "@eth-optimism/atst";

const contractAddresses = "0x965DfEac842166A67c255AAE63925098FBF0080d".toLocaleLowerCase();

export const host = "https://rs-service.fly.dev";

const settings = {
  apiKey: "8s2Swo7n62XYd3ApkcnentYuEi5BI1Yj",
  network: Network.OPT_MAINNET,
};

const alchemy = new Alchemy(settings);

const saveToLs = (list) => {
  // console.log(list);
  const nftId_list = list
    .map((v) => {
      const id = Number(v.tokenId);
      return `nftId_${id}`;
    })
    .join(",");
  localStorage.setItem("nftId_list", JSON.stringify(nftId_list));
  list.forEach((v) => {
    const id = Number(v.tokenId);
    const twId = v.rawMetadata?.attributes?.find((v) => v.traitType === "twit_id")?.value;
    const twUrl = v.rawMetadata?.image;
    const contract = v.contract?.address;
    const opensea = `https://opensea.io/assets/optimism/${contract}/${id}`;
    localStorage.setItem(`nftId_${id}`, JSON.stringify({ twUrl, opensea, contract, twId, nftId: id }));
  });
};

// Get all outbound transfers for a provided address

// Get all the NFTs owned by an address

const deloay = (time) =>
  new Promise((res) => {
    setTimeout(() => {
      res();
    }, time);
  });
export const getUserInfo = async function (address) {
  // return request(`${host}/userInfo`);
  // console.log("getUserInfo");
  // await deloay(1000);
  try {
    const user = await request(`${host}/userInfo?address=${address}`);
    const readCreatorAddr = "0x60c5C9c98bcBd0b0F2fD89B24c16e533BaA8CdA3";
    const aboutAddr = "0x2335022c740d17c2837f9C884Bfe4fFdbf0A95D5";
    const key = "optimist.base-uri";
    const userName = await readAttestation(readCreatorAddr, aboutAddr, key, "string");
    console.log(`According to ${readCreatorAddr} the ${key} for ${aboutAddr} is ${userName}`);
    console.log({ userName, user });
    return {
      user,
    };
  } catch (err) {
    console.log(err);
    return {
      user: {
        address,
        // profileImageUrl: defaultAvatar,
      },
    };
  }

  // return {
  //   user: {
  //     userId: 21681550006,
  //     mainWallet: "0x624f313007ca80eae6cd1536362721f479558e3f",
  //     avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=azhxks",
  //     email: "posuihushui@icloud.com",
  //     name: "rain_Peter",
  //     userName: "rain_Peter",
  //     wallets: [],
  //   },
  // };
};

export const getTwImg = async function (tweetUrl) {
  // return fetch("https://tweetpik.com/api/images", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     authorization: "f4031fac-22ee-440b-b5e9-6faba2305c55",
  //   },
  //   body: JSON.stringify({
  //     tweetId,
  //   }),
  // });
  // await deloay(1000);
  // return tw
  try {
    const res = await request.PostFormV1(`${host}/screenshotAddress`, {
      tweetUrl,
    });
    return res?.image;
  } catch (error) {
    return tw;
  }
};

export const createIncentive = async function (values) {
  // console.log("values", values);
  return request.PostFormV1(`${host}/addMapping`, values);
};

export const getGrantInfo = async function (nftId, address) {
  await getUserNft(address);
  return JSON.parse(localStorage.getItem(`nftId_${nftId}`));
};

export const getTop10 = async function (twId, address) {
  return request.Get(`${host}/getIncentiveIds?twitterId=${twId}&fragmentsNum=100&address=${address}`);
};

// '0x3BEfF95bBB844015372075AaE6fE8Ff1E0DE5d27'
export const getUserNft = async (address) => {
  if (!address) {
    return [];
  }
  const res = await alchemy.nft.getNftsForOwner(address, {
    contractAddresses: [contractAddresses],
  });
  console.log({ res, address });
  if (Array.isArray(res.ownedNfts)) {
    saveToLs(res.ownedNfts);
    return res.ownedNfts;
  } else {
    return [];
  }
  // try {
  //   const listId = JSON.parse(localStorage.getItem("nftId_list"));
  //   console.log({ listId });
  //   return listId.map((id) => {
  //     return JSON.parse(localStorage.getItem(id));
  //   });
  // } catch (error) {
  //   console.log(error);
  //   return [];
  // }
};

// getUserNft().then(res => console.log(res))
