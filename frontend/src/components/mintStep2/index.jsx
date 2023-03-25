import { Form, Button } from "antd";
// 透明的图片
import preview from "@/images/preview.png";
import Image from "../image";

export default function ({ twUrl, onMint }) {
  return (
    <div>
      <div className="shadow-[1px_1px_10px_rgba(0, 0, 0, 0.1)] relative mb-10 rounded-lg overflow-hidden">
        {/* {twUrl && <SplitImg img={twUrl} className="w-full" />} */}
        <img src={preview} className="absolute top-0 left-0 right-0 w-full" />
        <Image src={twUrl} className="w-full" />
      </div>

      <div>
        {/* <h2 className="mb-2 text-3xl">what</h2> */}

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" className="w-full mt-7 button-colorful" onClick={onMint}>
            INCENTIVIZE SOCIAL IMPACT
          </Button>
        </Form.Item>
      </div>
    </div>
  );
}
