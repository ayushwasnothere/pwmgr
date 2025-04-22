import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Password } from "./password";
import { useState } from "react";
import Slider from "../pages/slider";
import { Credential } from "./credential";
import { CredentialEdit } from "./credentialEdit";

export default function Vault() {
  const [slider, setSlider] = useState(false);
  const [sliderTitle, setSliderTitle] = useState("");
  const [sliderContent, setSliderContent] = useState<React.ReactNode>();
  const passwords = [
    {
      tag: "Facebook",
      username: "john.doe",
      password: "Fb@2024safe!",
      url: "https://facebook.com",
      note: "Personal account",
    },
    {
      tag: "Twitter",
      username: "johndoe123",
      password: "Tw!tterSecure#1",
      url: "https://twitter.com",
      note: "Used for tech updates",
    },
    {
      tag: "Gmail",
      username: "john@gmail.com",
      password: "Gm@ilPass!23",
      url: "https://mail.google.com",
      note: "Primary email",
    },
    {
      tag: "Instagram",
      username: "johnny_insta",
      password: "Inst4Safe!99",
      url: "https://instagram.com",
      note: "Photography profile",
    },
    {
      tag: "GitHub",
      username: "johndev",
      password: "Gh!hubSecure2024",
      url: "https://github.com",
      note: "Dev account",
    },
    {
      tag: "LinkedIn",
      username: "john.doe",
      password: "Linked!nPro2024",
      url: "https://linkedin.com",
      note: "Job hunting",
    },
    {
      tag: "Netflix",
      username: "johnflix",
      password: "Net#flixPass88",
      url: "https://netflix.com",
      note: "Shared with family",
    },
    {
      tag: "Reddit",
      username: "redditjohnny",
      password: "Red@Safe1234",
      url: "https://reddit.com",
      note: "Casual browsing",
    },
    {
      tag: "Amazon",
      username: "john.shop",
      password: "Amz!onBuy2024",
      url: "https://amazon.com",
      note: "Shopping account",
    },
    {
      tag: "Spotify",
      username: "john.music",
      password: "Sp0t!fySound88",
      url: "https://spotify.com",
      note: "Premium plan",
    },
    {
      tag: "Notion",
      username: "john.notion",
      password: "Noti0nSafe#99",
      url: "https://notion.so",
      note: "Project planning",
    },
  ];

  return (
    <div className="h-[473px] w-full flex flex-col bg-black">
      <Slider
        show={slider}
        setShow={setSlider}
        title={sliderTitle}
        children={sliderContent}
      />
      <div className="w-full p-4 flex border-b border-white/10 gap-5">
        <div className="w-full flex bg-white/30 py-2 rounded-full px-4 hover:text-purple-500/60 cursor-pointer">
          <MagnifyingGlassIcon className="h-5 w-5 text-white cursor-pointer" />
          <input
            type="text"
            className="w-full h-full focus:outline-none px-4 text-white flex justify-center items-center"
            placeholder="Search"
          />
        </div>
        <button
          className="bg-purple-500 hover:bg-purple-500/70 font-bold text-white rounded-full px-4 py-2"
          onClick={() => {
            setSliderTitle("New Credential");
            setSliderContent(<CredentialEdit />);
            setSlider(true);
          }}
        >
          New
        </button>
      </div>
      <div className="overflow-y-auto flex flex-col gap-4 p-4">
        {passwords.map((password, index) => (
          <Password
            key={index}
            password={password}
            onClick={() => {
              setSlider(true);
              setSliderTitle("Credential");
              setSliderContent(
                <Credential
                  {...password}
                  onEdit={() => {
                    setSliderTitle("Edit Credential");
                    setSliderContent(
                      <CredentialEdit oldCredential={password} />,
                    );
                  }}
                />,
              );
            }}
          />
        ))}
      </div>
    </div>
  );
}
