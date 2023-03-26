import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Popover, Drawer } from "antd";
import { useAccount, useDisconnect } from "wagmi";
import { shortAddress } from "@/utils/const";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { setCurrentProjectId } from "@/store/user";
import NetWork from "./icon/NetWork";
import closeIcon from "@/images/icon/close.svg";
import arrowIcon from "@/images/icon/arrow.svg";
import useCurrentProjectId from "@/hooks/useCurrentProjectId";
import useProjects from "@/hooks/useProjects";
import useCurrentProject from "@/hooks/useCurrentProject";
import { useResponsive } from "ahooks";
// import { logout } from "@/utils/web3";
import { PlusOutlined } from "@ant-design/icons";
//import { createInstance } from "dotbit";

function DropdownProfile() {
  const userStore = useSelector((state) => state.user.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [expanded, setExpaned] = useState(false);
  const dispatch = useDispatch();
  const currentProjectId = useCurrentProjectId();

  const { address } = useAccount();
  const projects = useProjects();
  const currentProject = useCurrentProject();
  const { pc } = useResponsive();
  const { disconnect } = useDisconnect();
  const { bitAccount, setBitAccount } = useState();
  //const dotbit = createInstance();

  return (
    <Link to="/built" className="relative z-10 inline-flex items-center h-10 rounded-full shadow-c2">
      <div className="mx-5  text-black hover:text-[#333] text-[12px] leading-[16px]">
        My social impact NFT collectives
      </div>
      <div className={clsx("h-10 w-10  rounded-full  flex justify-center overflow-hidden items-center")}>
        <img src={userStore?.profileImageUrl} className="object-cover w-full h-full" />
      </div>
    </Link>
  );
}

export default DropdownProfile;
