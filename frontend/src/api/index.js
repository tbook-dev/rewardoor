import request from "./request";
import tw from "@/images/tw.png";
import defaultAvatar from "@/images/default.png";
import { Network, Alchemy } from "alchemy-sdk";

const contractAddresses = "0xACdE17C1A595Ae2Cf12605a157Ae8Ad5Ddf8953F".toLocaleLowerCase();

export const host = "https://rs-service.fly.dev";

const settings = {
  apiKey: "sZe_qnmEekZOmG0pEqdl0LxMeGxNMkJD",
  network: Network.MATIC_MUMBAI,
};

const alchemy = new Alchemy(settings);

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
    return {
      user,
    };
  } catch (err) {
    return {
      user: {
        address,
        profileImageUrl: defaultAvatar,
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

export const getGrantInfo = async function (nftId) {
  return JSON.parse(localStorage.getItem(`nftId_${nftId}`));
};

export const getTop10 = async function (twId, address) {
  return request.Get(`${host}/getIncentiveIds?twitterId=${twId}&fragmentsNum=100&address=${address}`);
};

export const getUserNft = async (address = "0x3BEfF95bBB844015372075AaE6fE8Ff1E0DE5d27") => {
  const res = await alchemy.nft.getMintedNfts("0x3BEfF95bBB844015372075AaE6fE8Ff1E0DE5d27", {
    contractAddresses: [contractAddresses],
  });
  console.log({ res, address });
  if (Array.isArray(res.nfts)) {
    return res.nfts;
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
