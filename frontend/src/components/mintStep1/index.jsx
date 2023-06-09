import { Form, Select, Button } from "antd";
import { formItemCol } from "../conf";
import Image from "../image";

const options = [
  {
    label: "100",
    value: 100,
    disabled: false,
  },
  {
    label: "1000",
    value: 1000,
    disabled: true,
  },
];

export default function ({ twUrl, onMint }) {
  const [form] = Form.useForm();
  return (
    <div>
      <div className="shadow-[1px_1px_10px_rgba(0, 0, 0, 0.1)] mb-10 rounded-lg overflow-hidden">
        <Image src={twUrl} className="w-full" />
      </div>

      <div>
        <h2 className="mb-2 font-bold text-3xl text-[#333]">Mint your promotion twit into a shareable NFT </h2>
        <Form
          {...formItemCol}
          form={form}
          layout="horizontal"
          requiredMark={false}
          labelAlign="left"
          colon={false}
          initialValues={{ nftNum: 100 }}
          onFinish={onMint}
        >
          <Form.Item label="NFT Fragments Amount" name="nftNum">
            <Select options={options} />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button htmlType="submit" className="w-full mt-7 button-colorful">
              MINT
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
