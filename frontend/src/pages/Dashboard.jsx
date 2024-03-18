import React from "react";
import Revenue from "../components/Revenue";
import Newcustomer from "../Customers/Newcustomer.jsx";
import Retargetcustomer from "../Customers/Retargetcustomer.jsx";
import Targetcustomer from "../Customers/Targetcustomer.jsx";
import Overview from "../components/Overview.jsx";
import Topproduct from "../Customers/Topproduct.jsx";
import Currentcustomer from "../Customers/Currentcustomer.jsx";
import MarketVendors from "../Marketplaces/MarketVendors.jsx";

const Dashboard = () => {
  return (
    <>
      <section className="bg-green-50 h-100vh">
        <div className="grid lg:grid-cols-2 lg:ms-[19%] ms-0 md:grid-cols-2 ">
          <div className=" grid-cols-1 lg:px-10 px-5 lg:w-[115%] w-[100%] ">
            <Revenue />
          </div>
          <div className="grid rounded-lg  bg-white px-5 pb-5 shadow-lg sm:px-7.5 lg:grid-cols-2 md:grid-cols-2 grid-cols-2 gap-4 lg:w-[80%] w-[90%] lg:h-[100%] lg:ms-[12%] ms-5">
            <div>
              <h1 className="font-bold px-2 mt-10">Customers</h1>
              <p className="lg:w-[500px] w-[300px] px-2">Information about your Customers</p>

              <Currentcustomer />
              <h3 className="text-center text-sm font-bold">
                Current Customers
              </h3>
            </div>
            <div className="mt-[49%]">
              <Newcustomer />
              <h3 className="text-center text-sm font-bold">New Customers</h3>
            </div>
            <div>
              <Targetcustomer />
              <h3 className="text-center text-sm font-bold">
                Target Customers
              </h3>
            </div>
            <div>
              <Retargetcustomer />
              <h3 className="text-center text-sm font-bold">
                Retarget Customers
              </h3>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 lg:ms-[19%] md:grid-cols-2 lg:px-10 px-5 lg:w-[88%] w-[100%] grid-cols-1 p-5 gap-4">
          <div>
            <Topproduct />
          </div>
          <div className="lg:w-[80%] lg:ms-[2%] md:ms-[0%] ms-0">
            <Overview />
          </div>
        </div>
        <div className="lg:ms-[20%] md:ms-[0%] ms-0 px-5">
         
          <MarketVendors />
        </div>
      </section>
    </>
  );
};

export default Dashboard;
