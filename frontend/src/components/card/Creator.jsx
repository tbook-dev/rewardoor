import icon from "./creator.svg";

export default function ({ img, name, createTime, extral }) {
  return (
    <div className="flex justify-between text-[14px]">
      <div className="flex">
        <div className="flex items-center justify-center w-12 h-12 mr-4 overflow-hidden rounded-full">
          <img src={img} className="w-full" />
        </div>
        <div>
          <div className="flex items-center text-[#666666]">
            <img src={icon} className="w-[18px] mr-0.5" />
            Created and Tweet
          </div>

          <div className="flex items-center">
            by <span className="text-[#333333] font-bold mx-1">@{name}</span>
            <span className="text-[#666666]">{createTime}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center font-bold">{extral}</div>
    </div>
  );
}
