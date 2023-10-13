import React, { useCallback } from "react";
import Image from "next/image";
import { BsTwitter, BsBell, BsEnvelope, BsBookmark } from "react-icons/bs";
import { BiHomeCircle, BiHash, BiUser, BiMoney } from "react-icons/bi";
import { SlOptions } from "react-icons/sl";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { graphqlClient } from "../clients/api";
import FeedCard from "@/components/FeedCard";
import { toast } from "react-hot-toast/headless";
import { verifyGoogleUserTokenQuery } from "../graphql/queries/user";
import { verify } from "crypto";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";

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
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();
  console.log(user);

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) {
        return toast.error(`Google Token Not Found!`);
      } else {
        const { verifyGoogleToken } = await graphqlClient.request(
          verifyGoogleUserTokenQuery,
          {
            token: googleToken,
          }
        );

        toast.success("Verified Success");
        console.log(verifyGoogleToken);

        if (verifyGoogleToken) {
          window.localStorage.setItem("__twitter_token", verifyGoogleToken);

          await queryClient.invalidateQueries(["current-user"]);
        }
      }
    },
    [queryClient]
  );

  return (
    <div className="">
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-3 justify-start pt-2 ml-12 relative">
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
          {user && (
            <div className="mt-5 absolute flex gap-2 items-center bg-slate-800 px-3 py-2 rounded-full  bottom-5">
              {user && user.profileImageURL && (
                <Image
                  src={user?.profileImageURL}
                  alt="user-image"
                  height={50}
                  width={50}
                />
              )}
              <div>
                <h3 className="text-xl">
                  {user.firstName} {user.lastName}
                </h3>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-6 border-r-[1px] border-l-[1px] h-screen overflow-scroll border border-gray-600">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3 p-5">
          {!user && (
            <div className="p-5 bg-slate-700 rounded-lg w-fit">
              <h1 className="my-2 text-2xl">New to Twitter ?</h1>
              <div>
                <GoogleLogin onSuccess={handleLoginWithGoogle} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
