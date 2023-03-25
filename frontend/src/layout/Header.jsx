import React, { useRef, useState } from "react";
import UserMenu from "@/components/DropdownProfile";
import { useSelector } from "react-redux";
import Connect from "@/components/connect";
import logo from "@/images/icon/logo.svg";
import { useResponsive } from "ahooks";
import { Link, NavLink } from "react-router-dom";
import { Spin, Drawer, Input } from "antd";
import clsx from "clsx";
import { chains } from "@/utils/const";
import useCurrentProject from "@/hooks/useCurrentProject";
import SwitchNet from "@/components/connect/switchV0";
import { match } from "path-to-regexp";
import { useNavigate, useLocation } from "react-router-dom";
import { twOrigin, pathPatern } from "@/components/conf";
import { useAccount, useConnect, useDisconnect } from "wagmi";

function Header() {
  const authUser = useSelector((state) => state.user.authUser);
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [inputVal, setInputVal] = useState("");
  const { address, isConnected } = useAccount();

  const project = useCurrentProject();
  const projectChain = chains.find((v) => project.chain === v.name);
  const loadingUserStatus = useSelector((state) => state.user.loadingUserStatus);
  const location = useLocation();
  // console.log({address, isConnected})
  const headerTransparent = ["/built"].includes(location.pathname);

  // console.log({loadingUserStatus, authUser})

  // console.log('loadingUserStatus->',loadingUserStatus)
  const { pc } = useResponsive();

  const handleChange = (evt) => {
    const val = evt.target.value;
    setInputVal(val);
    try {
      const { origin, pathname } = new URL(val);
      if (origin === twOrigin && match(pathPatern)(pathname)) {
        const { params = {} } = match(pathPatern)(pathname);
        const { twId, username } = params;
        if (twId) {
          // console.log(twId);
          setTimeout(() => {
            inputRef?.current.blur();
            setInputVal("");
            // inputRef?.current?.blur();
          }, 1000);
          navigate(`/twitter/${username}/${twId}`);
          return;
        }
      }
    } catch (error) {
      // console.log(error)
    }
    // if(match(//)(val))
  };
  return (
    <header
      className={clsx(
        !headerTransparent ? "sticky top-0 z-30  shadow-c11 bg-white" : "fixed top-0 left-0 right-0 z-30"
      )}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            <Link to="/">
              <img src={logo} className="relative z-40 mr-2 h-9 lg:h-auto" />
            </Link>
          </div>

          <div className="absolute inset-0">
            <div className="w-[600px] h-full mx-auto flex justify-center items-center">
              <Input ref={inputRef} placeholder="Tweet url" onChange={handleChange} value={inputVal} />
            </div>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            {loadingUserStatus ? <Spin /> : isConnected ? <UserMenu align="right" /> : <Connect />}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
