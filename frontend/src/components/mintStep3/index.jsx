import { Form, Button, Typography, Select, DatePicker } from "antd";
import { shortAddress } from "@/utils/const";
import { formItemCol, timeFormat } from "../conf";
import { InputNumber } from "antd";
const { Paragraph } = Typography;

const divideRulesOptions = [
  {
    label: "The top 10 most liked retweets",
    value: 1,
    disabled: false,
  },
];

export default function ({
  onMint,
  onCancel,
  address = "0x624f313007Ca80eAE6CD1536362721F479558e3F",
  maxNft = 100,
  loading,
}) {
  const [form] = Form.useForm();

  return (
    <div>
      <div className="text-[#333] mb-6">
        <h1 className="text-[56px] leading-[64px] mb-10 text-center"><span className="font-bold text-colorful">NFT Fragments Assignment</span></h1>
        <h2 className="h-10 border rounded-lg font-medium shadow-[0px_0px_4px_rgba(0, 0, 0, 0.2)] flex justify-center items-center">
          <Paragraph copyable={{ text: address }} style={{ marginBottom: 0 }}>
            {shortAddress(address)}
          </Paragraph>
        </h2>
      </div>

      <div>
        <Form
          {...formItemCol}
          form={form}
          layout="horizontal"
          requiredMark={false}
          labelAlign="left"
          labelWrap
          colon={false}
          initialValues={{ divideRulesOption: 1 }}
          onFinish={(values) => {
            values.endTime = values.endTime.format(timeFormat);
            onMint(values);
          }}
        >
          <Form.Item label="Mechanism" name="divideRulesOption">
            <Select options={divideRulesOptions} />
          </Form.Item>
          <Form.Item
            label="How much ownership fragments you want to share"
            name="givenNftNum"
            rules={[
              {
                required: true,
                message: "Please input the Numbers!",
              },
            ]}
          >
            <InputNumber
              placeholder={`Editable, max number ${maxNft}`}
              min={1}
              max={maxNft}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label="End Time"
            name="endTime"
            rules={[
              {
                required: true,
                message: "Please select the End Time!",
              },
            ]}
          >
            <DatePicker format={timeFormat} showTime className="w-full" />
          </Form.Item>

          <Form.Item
            wrapperCol={{ span: 24 }}
            className="flex justify-center !mt-7"
          >
            <Button className="w-[132px] mr-8" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="w-[132px] button-colorful"
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
