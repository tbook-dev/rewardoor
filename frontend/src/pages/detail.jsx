import { useState } from "react";
import { useAsyncEffect } from "ahooks";
import { useParams } from "react-router-dom";
import { getTwImg, getGrantInfo, getTop10 } from "@/api";
import { Button, Spin, Statistic, Typography } from "antd";
import { shortAddress } from "@/utils/const";
import Creator from "@/components/card/Creator";
import Contributor from "@/components/card/Contributor";
import preview from "@/images/preview.png";
import alarmIcon from "@/images/icon/alarm.svg";
import { timeFormat } from "@/components/conf";
import dayjs from "dayjs";
import { useAccount } from "wagmi";
import { useSelector } from "react-redux";

const { Countdown } = Statistic;
const { Paragraph } = Typography;

export default function () {
  const { twId, nftId } = useParams();
  const [img, setImg] = useState();
  const [grantInfo, setGrantInfo] = useState(null);
  const [top10, setTop10] = useState([]);
  const { address } = useAccount();
  const useStore = useSelector((state) => state.user.user);
  console.log(grantInfo);
  useAsyncEffect(async () => {
    const url = await getTwImg(twId);
    setImg(url);
  }, [twId]);

  useAsyncEffect(async () => {
    const info = await getGrantInfo(nftId, address);
    setGrantInfo(info);
  }, [twId]);

  useAsyncEffect(async () => {
    // const twId = "1600122565090889728";
    const res = await getTop10(twId, address);
    setTop10(res);
  }, [twId]);

  // console.log("setTop10->", top10);

  return (
    <div className="w-[1300px] grid grid-cols-2 gap-x-5 mx-auto">
      <div className="rounded-lg">
        {img ? (
          <div className="relative overflow-hidden bg-white rounded-lg shadow-c5">
            <img src={img} className="w-full" />
            <img src={preview} className="absolute top-0 left-0 right-0 w-full" />
          </div>
        ) : (
          <Spin />
        )}

        <div className="bg-white rounded-lg shadow-c5">
          {grantInfo ? (
            <div className="p-6 mt-6">
              {dayjs().isBefore(dayjs(grantInfo.endTime)) && (
                <div className="flex flex-col items-end mb-6">
                  <p className="text-[#999999] text-sm">Incentive ends in</p>

                  <div className="flex items-center">
                    <img src={alarmIcon} className="mr-2" />
                    <Countdown
                      value={dayjs(grantInfo.endTime)}
                      valueStyle={{
                        color: "#333",
                        fontSize: 18,
                        lineHeight: "24px",
                        fontWeight: 500,
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-around">
                <Button type="text" className="shadow-[0px_0px_4px_rgba(0, 0, 0, 0.2)]">
                  <Paragraph copyable={{ text: grantInfo?.contract?.slice(-42) }}>
                    {shortAddress(grantInfo?.contract?.slice(-42))}
                  </Paragraph>
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    window.open(grantInfo.opensea);
                  }}
                  className="w-[300px]"
                >
                  Link to Opensea
                </Button>
              </div>
            </div>
          ) : (
            <Spin />
          )}
        </div>
      </div>
      <div>
        {grantInfo ? (
          <div>
            <span className="text-colorful text-[42px] font-extrabold">Rewardoor</span>
            <p className="text-[#999] font-bold text-sm mb-4">View authentic contributions.</p>
            <div>
              <div className="mb-10">
                <h3 className="text-[#333] mb-8 font-bold text-[12px]">Creator</h3>
                <Creator
                  name={top10?.[0]?.name}
                  img={top10?.[0]?.profileImageUrl}
                  createTime={dayjs(top10?.[0]?.commentDate).format(timeFormat)}
                  extral={`50/100 of #${nftId}`}
                />
              </div>

              <div>
                <h3 className="inline-block text-[#333] mb-8 font-bold text-[12px] pb-[13px] border-b-2 border-[#000]">
                  The TOP 10 most viewed retweets
                </h3>
                <div className="space-y-6">
                  {top10.slice(1).length > 0 ? (
                    top10.slice(1).map((v) => {
                      return (
                        <Contributor
                          key={v.userId}
                          name={v.name}
                          createTime={dayjs(v.commentDate).format(timeFormat)}
                          num={v.likeCount}
                          img={v.profileImageUrl}
                          extral={`5/100 of #${nftId}`}
                        />
                      );
                    })
                  ) : (
                    <p>no data yet, please wait!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Spin />
        )}
      </div>
    </div>
  );
}
