import { Button, Spin } from "antd";
import { TwitterOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { shortAddress } from "@/utils/const";
import banner from "@/images/banner-bg.png";
import clsx from "clsx";
import { useAsyncEffect } from "ahooks";
import { getUserNft } from "@/api";
import { useState } from "react";
import { Link } from "react-router-dom";
import preview from "@/images/preview.png";
import bgVideo from "@/images/bg.mp4";

export default function () {
  const useStroe = useSelector((state) => state.user.user);
  const [nftList, setNftList] = useState([]);
  const [loading, setLoading] = useState(false);

  useAsyncEffect(async () => {
    if (useStroe.address) {
      setLoading(true);
      // const list = await getUserNft(useStroe.address)
      const list = await getUserNft(useStroe.address);
      console.log(list);
      setNftList(list);
      setLoading(false);
    }
  }, [useStroe]);
  console.log({ useStroe });
  return (
    <div>
      <div className="h-[330px] -mt-10 overflow-hidden">
        <video className="object-cover w-full h-full " loop autoPlay>
          <source src={bgVideo} type="video/mp4"></source>
        </video>
      </div>

      <div className="w-[1250px] -mt-[50px] flex mx-auto">
        <div className="w-[270px] flex-none h-[340px] py-10 bg-white flex flex-col items-center rounded-lg shadow-c14 mr-[60px]">
          <div className="w-[100px] h-[100px] flex justify-center items-center overflow-hidden mb-2 rounded-full bg-[rgb(203,203,203)]">
            <img src={useStroe?.profileImageUrl} className="w-full" />
          </div>
          <h2 className="text-2xl text-[#333] font-bold mb-6 flex items-center">
            <span className="text-colorful">{useStroe?.userName || "Setup account"}</span>
          </h2>

          <Button
            className="mb-3"
            onClick={() => {
              if (!useStroe?.address) {
                window.open(`https://mask.io/`);
              }
            }}
          >
            {useStroe?.address ? shortAddress(useStroe?.address) : "Connect"}{" "}
          </Button>

          <Button
            type="primary"
            onClick={() => {
              if (!useStroe?.userName) {
                window.open(`https://mask.io/`);
              }
            }}
            className="!bg-[#1DA1F2] flex items-center"
          >
            <TwitterOutlined style={{ color: "#fff", marginRight: 4, verticalAlign: 0 }} />
            <span className="flex items-center ml-1">{useStroe?.userName || "Connect Twitter"}</span>
          </Button>
        </div>

        <div className="mt-[100px] flex-auto">
          <h2 className="text-[14px] leading-[21px] mb-4 font-bold">Your Rewardoor NFT Collectives</h2>

          <div className="w-[200px] h-[2px] mb-8 bg-black" />

          <div className={clsx("grid", nftList.length > 1 ? "grid-cols-3 gap-2.5" : "grid-cols-1")}>
            {loading ? (
              <Spin />
            ) : nftList.length === 0 ? (
              <div className="flex justify-center items-center h-[285px] shadow-c5 rounded-lg bg-white">
                {!useStroe?.userName || !useStroe?.address
                  ? "Please set up your account to view your NFT fragments."
                  : "Nothing here yet."}
              </div>
            ) : (
              <>
                {nftList.map((nft) => {
                  const { tokenId, rawMetadata } = nft;
                  const img = rawMetadata?.image;
                  const twId = rawMetadata?.attributes.find((v) => v.traitType === "twit_id")?.value;
                  if (twId && img) {
                    return (
                      <Link to={`/nft/${tokenId}/${twId}`} key={tokenId} className="relative">
                        <img src={preview} className="absolute inset-0 w-full" />
                        <img src={img} className="w-full" />
                      </Link>
                    );
                  } else {
                    return null;
                  }
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
