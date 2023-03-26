import { Input } from "antd";
import { TwitterOutlined } from "@ant-design/icons";
import { twOrigin, pathPatern } from "@/components/conf";
import { useNavigate } from "react-router-dom";
import { match } from "path-to-regexp";
import { useSelector } from "react-redux";

export default function () {
  const navigate = useNavigate();
  const useStroe = useSelector((state) => state.user.user);
  const authUser = useSelector((state) => state.user.authUser);

  const handleChange = (evt) => {
    const val = evt.target.value;
    try {
      const { origin, pathname } = new URL(val);
      if (origin === twOrigin && match(pathPatern)(pathname)) {
        const { params = {} } = match(pathPatern)(pathname);
        const { twId, username } = params;
        if (twId) {
          navigate(`/twitter/${username}/${twId}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-[600px] mx-auto">
      <div className="mb-10">
        <h2 className="text-4xl text-[#333] font-bold mb-2 flex items-center">
          <span className="text-colorful">Mint Tweets</span>
          <TwitterOutlined style={{ color: "#1DA1F2", marginLeft: 10, marginRight: 10 }} />
          {authUser && useStroe?.userName && <span>@{useStroe?.userName}</span>}
        </h2>
        <h3 className="text-base text-[#999]">Unlock the power of authentic social impact</h3>
      </div>

      <Input placeholder="Tweet url" onChange={handleChange} />
    </div>
  );
}
