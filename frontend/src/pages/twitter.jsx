import { useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { getTwImg, createIncentive } from "@/api";
import { useAsyncEffect } from "ahooks";
import MintStep1 from "@/components/mintStep1";
import MintStep2 from "@/components/mintStep2";
import MintStep3 from "@/components/mintStep3";
import { useNavigate } from "react-router-dom";
import { message, Spin } from "antd";
import { errMsg } from "@/utils/const";
import { twOrigin } from "@/components/conf";
import { useAccount } from "wagmi";

export default function () {
  const { twId, username } = useParams();
  const [step, setStep] = useState(1);
  const [twUrl, setTwUrl] = useState(null);
  const [createLoading, setCreateLoading] = useState(false);
  const { address } = useAccount();

  const formValues = useRef();
  const navigate = useNavigate();

  //   console.log({ twId });
  useEffect(() => {
    setStep(1);
  }, [window.location]);

  useAsyncEffect(async () => {
    const url = await getTwImg(`${twOrigin}/${username}/status/${twId}`);
    setTwUrl(url);
    return () => {
      setTwUrl(null);
    };
  }, [twId]);

  const handleMintStep1 = (values) => {
    const { nftNum } = values;
    formValues.current = {
      nftNum,
    };
    setStep(2);
  };
  const handleMintStep2 = () => {
    // const { nftNum } = values;
    // console.log(values)
    // formValues.current = {
    //   nftNum,
    // };
    setStep(3);
  };
  const handleMintStep3 = async (values) => {
    formValues.current = {
      ...formValues.current,
      ...values,
    };

    // const res = await createIncentive({ ...formValues.current, twitId: twId });

    try {
      setCreateLoading(true);
      const res = await createIncentive({ twitId: twId, address });
      if (res.opensea) {
        try {
          localStorage.setItem(
            `nftId_${res.nftId}`,
            JSON.stringify({ ...res, twUrl, twId, nftId: res.nftId })
          );

          const list =
            localStorage.getItem('nftId_list') === null
              ? []
              : JSON.parse(localStorage.getItem('nftId_list'));
          localStorage.setItem(
            `nftId_list`,
            JSON.stringify([...list, `nftId_${res.nftId}`])
          );
        } catch (error) {
          console.log(error);
        }

        navigate(`/nft/${res.nftId}/${twId}`);
      } else {
        message.error(res.message || errMsg);
      }
    } catch (error) {
      message.error(error.message || errMsg);
    }
    setCreateLoading(true);
  };

  return !twUrl ? (
    <div className="w-[705px] mx-auto h-full flex justify-center items-center">
      <Spin />
    </div>
  ) : (
    <div className="w-[705px] mx-auto">
      {step === 1 && <MintStep1 twUrl={twUrl} onMint={handleMintStep1} />}
      {step === 2 && <MintStep2 twUrl={twUrl} onMint={handleMintStep2} />}
      {step === 3 && (
        <MintStep3
          loading={createLoading}
          maxNft={formValues?.current?.nftNum}
          onMint={handleMintStep3}
          onCancel={() => {
            navigate("/");
          }}
        />
      )}
    </div>
  );
}
