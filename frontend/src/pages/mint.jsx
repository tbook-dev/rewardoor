import { Input } from "antd";
import { TwitterOutlined } from "@ant-design/icons";
import { twOrigin, pathPatern } from "@/components/conf";
import { useNavigate } from "react-router-dom";
import { match } from "path-to-regexp";


export default function () {
  const navigate = useNavigate();

  const handleChange = (evt) => {
    const val = evt.target.value;
    try {
      const { origin, pathname } = new URL(val);
      if (origin === twOrigin && match(pathPatern)(pathname)) {
        const { params = {} } = match(pathPatern)(pathname);
        const { twId } = params;
        if (twId) {
          navigate(`/twitter/${twId}`);
        }
      }
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="w-[600px] mx-auto">
      <div className="mb-10">
        <h2 className="text-4xl text-[#333] font-bold mb-2 flex items-center">
          <span className="text-colorful">Mint Tweets</span>
          <TwitterOutlined style={{ color: "#1DA1F2", marginLeft: 10 }} />
        </h2>
        <h3 className="text-base text-[#999]">CREATED AND BUILT BY YOU</h3>
      </div>

      <Input placeholder="Tweet url" onChange={handleChange} />
    </div>
  );
}
