import React from "react";
import Image from "next/image";
import { BsTwitter, BsBell, BsEnvelope, BsBookmark } from "react-icons/bs";
import { BiHomeCircle, BiHash, BiUser, BiMoney } from "react-icons/bi";
import { SlOptions } from "react-icons/sl";

import FeedCard from "@/components/FeedCard";

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}

const sidebarMenuItems: TwitterSidebarButton[] = [
  {
    title: "Home",
    icon: <BiHomeCircle />,
  },
  {
    title: "Explore",
    icon: <BiHash />,
  },
  {
    title: "Notifications",
    icon: <BsBell />,
  },
  {
    title: "Messages",
    icon: <BsEnvelope />,
  },
  {
    title: "Bookmark",
    icon: <BsBookmark />,
  },
  {
    title: "Twitter Blue",
    icon: <BiMoney />,
  },
  {
    title: "Profile",
    icon: <BiUser />,
  },
  {
    title: "More",
    icon: <SlOptions />,
  },
];

export default function Home() {
  return (
    <div className="">
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-3 justify-start pt-2 ml-12">
          <div className="text-2xl h-fit w-fit hover:bg-gray-800 rounded-full p-3 cursor-pointer transition-all">
            <BsTwitter />
          </div>
          <div className="mt-4 text-xl font-semibold pr-4">
            <ul>
              {sidebarMenuItems.map((item) => (
                <li
                  className="flex justify-start items-center gap-4 mt-2 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer"
                  key={item.title}
                >
                  <span className="text-3xl">{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <button className="text-xl bg-[#1d9bf0] p-2 rounded-full w-full ml-2">
                Tweet
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-6 border-r-[1px] border-l-[1px] h-screen overflow-scroll border border-gray-600">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3"></div>
      </div>
    </div>
  );
}
