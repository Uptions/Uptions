import React from "react";

const abtDescription = () => {
  return (
    <div className="bg-[#D9EBFF] flex  justify-center 2xl:px-[10em] py-[5em]">
      <div className="flex items-start xl:w-[65em] 2xl:w-[69em] gap-[5em] justify-between">
        <div className="">
          <h1 className="text-[#007BFF] font-[700] xl:text-[35px] 2xl:text-[40px] font-space text-nowrap">Our Mission</h1>
        </div>
        <div>
          <p className=" text-[#000000] font-[300] xl:text-[28px] 2xl:text-[30px] ">
            Uptions' mission is to make delivery easy, affordable, and flexible
            for everyone. <span className="text-[#007BFF]">We're not a delivery service, we are google for
            delivery</span>{" "}—we are a platform that brings together various logistics
            providers, empowering users to find, compare, and book the best
            delivery options. From local couriers to large-scale delivery
            companies, we provide the infrastructure that helps everyone from
            small businesses to individuals find the most convenient and
            budget-friendly delivery solutions, all in one place.
          </p>
        </div>
      </div>
    </div>
  );
};

export default abtDescription;
