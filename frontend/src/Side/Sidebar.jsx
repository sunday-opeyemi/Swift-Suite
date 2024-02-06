import { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";

// * React icons
import { IoMdHelpCircleOutline } from "react-icons/io";
import { SlSettings } from "react-icons/sl";
import { AiOutlineAppstore } from "react-icons/ai";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { BiBorderRight } from "react-icons/bi";
import { TbReport } from "react-icons/tb";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MdOutlineInventory2 } from "react-icons/md";
import { FaRegAddressBook } from 'react-icons/fa'
import { IoIosArrowUp } from 'react-icons/io'
import {IoChevronDown} from 'react-icons/io5'
import swift from '../Images/swift.png'
import { AppContext } from "../context/Dashboard";


const Sidebar = () => {
  const { sideBarOpen, setSideBarOpen, isTablet } = useContext(AppContext)
  const [host, setHost] = useState(false);
  // const [hosting, setHosting] = useState(false);


  // check on useRef
  const sidebarRef = useRef();
  // this is useParams
  const { pathname } = useLocation();

  useEffect(() => {
    if (isTablet) {
      setSideBarOpen(false)
    } else {
      setSideBarOpen(true)
    }
  }, [isTablet]);



  const overlayClicked = () => {
    setSideBarOpen(false)
  }


  useEffect(() => {
    isTablet && setSideBarOpen(false);
  }, [pathname]);


  const toggleUp = () => {
    setHost(false);
  };

  const toggleDown = () => {
    // setHosting(false);
    setHost(true);
  };

  const Nav_animation = isTablet
    ? {
      open: {
        x: 0,
        width: "13rem",
        transition: {
          damping: 40,
        },
      },
      closed: {
        x: -250,
        width: 0,
        transition: {
          damping: 40,
          delay: 0.15,
        },
      },
    }
    : {
      open: {
        width: "16rem",
        transition: {
          damping: 40,
        },
      },
      closed: {
        width: "4rem",
        transition: {
          damping: 40,
        },
      },
    };

  return (
    <div className=" absolute">
      <div onClick={() => overlayClicked()} className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-blue-100  opacity-30 ${sideBarOpen ? "block" : "hidden"} `}></div>

      <motion.div ref={sidebarRef} variants={Nav_animation} initial={{ x: isTablet ? -250 : 0 }} animate={sideBarOpen ? "open" : "closed"} className="shadow-xl md:z-[9] z-[9999] max-w-[16rem]  w-[16rem] fixed top-0 left-0 h-screen">

        <div className="flex items-center gap-2.5 font-medium bg-white border-b py-4  text-white" >
          <img src={swift} alt="" />

        </div>

        <div className="flex flex-col text-4xl bg-white text-black h-full">
          <ul className=" px-2.5 text-[0.9rem] py-5 flex flex-col gap-2  font-serif   dark:scrollbar-track-slate-400  dark:scrollbar-thumb-slate-700  md:h-[78%] h-[75%]">
            <li>
              <NavLink to={"/layout/home"} className="link flex gap-8  hover:rounded hover:text-black">
                <AiOutlineAppstore size={23} className="mt-2 min-w-max" />
                Dashboard
              </NavLink>
            </li>
            <li className="flex lg:gap-10 gap-5">
              <NavLink to={"/layout/allapp"} className="link flex gap-8 hover:text-green-700 ">
                <FaRegAddressBook size={23} className="mt-2 min-w-max" />
                <div className="flex gap-5">
                  <p>
                    Catalogue
                  </p>
                 
                </div>
              </NavLink>
              <p className="mt-3 cursor-pointer hover:text-green-700">
              <span onClick={toggleUp} className={host ? '' : 'hidden'}>
                <IoIosArrowUp />
              </span>
              <span onClick={toggleDown} className={host ? 'hidden' : ''}>
                <IoChevronDown />
              </span>
            </p>
            </li>
            <li>
              <li className={`ms-14 shadow w-20 p-2 mt-[-4%] ${host ? 'block' : 'hidden'}`}>
                <p>
                  <Link to="/layout/catalogue">catalogue</Link>
                </p>
                <p>
                  <Link to="/layout/product">product</Link>
                </p>
              </li>
              <NavLink to={"/layout/authentication"} className="link flex gap-8 hover:text-green-700">
                <MdOutlineInventory2 size={23} className="mt-2 min-w-max" />
                Inventory
              </NavLink>
            </li>
            <li>
              <NavLink to={""} className="link flex gap-8 hover:text-green-700">
                <BiBorderRight size={23} className="mt-2 min-w-max" />
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink to={""} className="link flex gap-8 hover:text-green-700">
                <TbReport size={23} className="mt-2 min-w-max" />
                Reports
              </NavLink>
            </li>
            <li>
              <NavLink to={""} className="link flex gap-8 hover:text-green-700">
                <IoMdHelpCircleOutline size={23} className="mt-2 min-w-max" />
                Help
              </NavLink>
            </li>
            <li>
              <NavLink to={""} className="link flex gap-8 hover:text-green-700">
                <LiaSignOutAltSolid size={23} className="mt-2 min-w-max" />
                Sign Out
              </NavLink>
            </li>
          </ul>
        </div>

      </motion.div>

    </div>
  );
};

export default Sidebar;
