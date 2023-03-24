import { Form, Button } from "antd";
// 透明的图片
import preview from '@/images/preview.png'

export default function ({ twUrl, onMint,  }) {
  return (
    <div>
      <div className="shadow-[1px_1px_10px_rgba(0, 0, 0, 0.1)] relative mb-10 rounded-lg overflow-hidden">
        {/* {twUrl && <SplitImg img={twUrl} className="w-full" />} */}
        {twUrl &&<img src={preview} className="w-full absolute top-0 left-0 right-0" />}
        {twUrl && <img src={twUrl} className="w-full"/>}
      </div>

      <div>
        {/* <h2 className="text-3xl mb-2">what</h2> */}

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" className="w-full mt-7 button-colorful" onClick={onMint}>
            INCENTIVIZE SOCIAL IMPACT 
          </Button>
        </Form.Item>
      </div>
    </div>
  );
}
