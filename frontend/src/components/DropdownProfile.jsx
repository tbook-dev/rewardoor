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
  const { disconnect } = useDisconnect()
  const { bitAccount, setBitAccount } = useState();
  //const dotbit = createInstance();


  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const hanldeChangeProject = function (project) {
    if (currentProjectId === project.projectId) return;
    dispatch(setCurrentProjectId(project.projectId));
    setDropdownOpen(false);
  };

  async function handleLogout() {
    disconnect();
    window.location.href = `${location.origin}`;
  }

  useEffect(() => {
    // dotbit.accountInfo(address).then((d) => {
    //   setBitAccount(d.account_alias)
    // })
  }, [bitAccount])

  const Content = () => (
    <div className="-mx-6 lg:-mx-3 lg:w-[330px]">
      <div className="relative flex items-center justify-center w-full px-6 pb-2.5 shadow-c9">
        <div className="flex h-full">
          <NetWork />
          <span className="text-[18px] lg:leading-[20px] text-[#333]">
            {shortAddress(userStore?.address)}
          </span>
        </div>

        <div className="absolute top-[-3px] flex items-center justify-end right-6">
          <div
            onClick={handleLogout}
            className="cursor-pointer w-6 h-6 bg-[#ECF1FF] rounded-lg flex items-center justify-center"
          >
            <img src={closeIcon} />
          </div>
        </div>
      </div>

      <Link to="/built" onClick={() => setDropdownOpen(false)}>
        <div className="px-3 text-center py-2 mt-4 mb-3 bg-[#f2f2f2] mx-2.5 rounded-lg text-[#999] hover:text-[#333] text-[16px] leading-[24px]">
          built Nft
        </div>
      </Link>
    </div>
  );
  const Avator = () => (
    <div
      className="flex items-center cursor-pointer"
      onClick={() => {
        setDropdownOpen(true);
        setExpaned(false);
      }}
    >
      <div
        className={clsx(
          "w-9 h-9 lg:w-8 lg:h-8 rounded-full  flex justify-center overflow-hidden items-center mr-2 shadow-c9",
          dropdownOpen ? "bg-[#0049FF]" : "bg-[#e6e6e6]"
        )}
      >
        <img src={userStore?.profileImageUrl} className="w-full" />
      </div>
      <span
        className={clsx(
          "hidden lg:block text-[14px] leading-[22px]",
          clsx(dropdownOpen ? "text-[#0049FF]" : "text-[#333]")
        )}
      >
        {shortAddress(userStore?.address)}
      </span>
    </div>
  );
  return (
    <div className="relative inline-flex">
      <Popover
        open={dropdownOpen}
        // open
        content={<Content />}
        placement="bottomRight"
        onOpenChange={(v) => setDropdownOpen(v)}
      >
        <Avator />
      </Popover>
    </div>
  );
}

export default DropdownProfile;
