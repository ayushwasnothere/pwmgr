import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Password } from "./password";
import { useEffect, useState } from "react";
import Slider from "../pages/slider";
import { Credential } from "./credential";
import { CredentialEdit } from "./credentialEdit";
import { base64ToCryptoKey, decryptData } from "../utils/encryption";
import { getKeyAndTokenFromStorage } from "../utils/authStore";

interface PasswordType {
  tag: string;
  username: string;
  password: string;
  url: string;
  id: number;
}

export default function Vault({
  showToast,
}: {
  showToast: (message: string, type?: "success" | "error") => void;
}) {
  const [slider, setSlider] = useState(false);
  const [sliderTitle, setSliderTitle] = useState("");
  const [sliderContent, setSliderContent] = useState<React.ReactNode>();
  const [search, setSearch] = useState("");
  const [passwords, setPasswords] = useState([] as PasswordType[]);
  const [filtered, setFiltered] = useState([] as PasswordType[]);

  useEffect(() => {
    const filteredResults = passwords.filter((pass) => {
      const trimmed = search.trim().toLowerCase();
      if (
        pass.url?.toLowerCase().includes(trimmed) ||
        pass.username?.toLowerCase().includes(trimmed) ||
        pass.tag?.toLowerCase().includes(trimmed)
      ) {
        return pass;
      }
    });
    setFiltered(filteredResults as PasswordType[]);
  }, [search, passwords]);

  useEffect(() => {
    if (!slider) {
      setSliderTitle("");
      setSliderContent(null);
    }
    const fetchPasswords = async () => {
      const obj = await getKeyAndTokenFromStorage();
      if (!obj) {
        console.error("Failed to get key and token from storage");
        return;
      }
      const { token } = obj;
      const response = await fetch(`${import.meta.env.VITE_API_URL}/creds`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      const passArray: PasswordType[] = await Promise.all(
        data.credentials.map(
          async (item: {
            id: number;
            name: string;
            iv: string;
            username: string;
            password: string;
            url: string;
          }) => {
            try {
              const data = await getKeyAndTokenFromStorage();
              if (!data) {
                console.error("Failed to get key and token from storage");
                return null;
              }
              const { key: stringKey } = data;
              const key = await base64ToCryptoKey(stringKey);

              if (!key) {
                console.error("Encryption key is null");
                return null;
              }

              const { username, password } = await decryptData(
                item.iv,
                item.username,
                item.password,
                key,
              );

              return {
                username,
                password,
                id: item.id,
                url: item.url,
                tag: item.name,
              };
            } catch (error) {
              console.error("Error processing credential:", error);
              return null;
            }
          },
        ),
      );

      const validPassArray = passArray.filter((item) => item !== null);

      setPasswords(validPassArray);
    };

    fetchPasswords();
  }, [slider]);

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
          {search.trim() ? (
            <XMarkIcon
              className="h-5 w-5 text-white cursor-pointer hover:text-purple-500"
              onClick={() => {
                setSearch("");
                setFiltered([] as PasswordType[]);
              }}
            />
          ) : (
            <MagnifyingGlassIcon className="h-5 w-5 text-white cursor-pointer" />
          )}
          <input
            type="text"
            className="w-full h-full focus:outline-none px-4 text-white flex justify-center items-center"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <button
          className="bg-purple-500 hover:bg-purple-500/70 font-bold text-white rounded-full px-4 py-2"
          onClick={() => {
            setSliderTitle("New Credential");
            setSliderContent(
              <CredentialEdit showToast={showToast} setShow={setSlider} />,
            );
            setSlider(true);
          }}
        >
          New
        </button>
      </div>
      <div className="overflow-y-auto flex flex-col gap-4 p-4">
        {passwords.length === 0 ? (
          <div className="flex h-[473px] justify-center items-center text-white font-bold text-sm">
            No Passwords saved
          </div>
        ) : (
          <div className="flex flex-col h-[473px] gap-4">
            {search.trim() ? (
              filtered.length === 0 ? (
                <div className="flex justify-center items-center text-white font-bold text-sm h-full">
                  No Search Results
                </div>
              ) : (
                filtered.map(
                  (
                    password: {
                      username: string;
                      password: string;
                      url: string;
                      tag: string;
                      id: number;
                    },
                    index,
                  ) => {
                    return (
                      <Password
                        showToast={showToast}
                        key={index}
                        password={password}
                        onClick={() => {
                          setSlider(true);
                          setSliderTitle("Credential");
                          setSliderContent(
                            <Credential
                              showToast={showToast}
                              {...password}
                              setShow={setSlider}
                              onEdit={() => {
                                setSliderTitle("Edit Credential");
                                setSliderContent(
                                  <CredentialEdit
                                    showToast={showToast}
                                    oldCredential={password}
                                    setShow={setSlider}
                                  />,
                                );
                              }}
                            />,
                          );
                        }}
                      />
                    );
                  },
                )
              )
            ) : (
              passwords.map(
                (
                  password: {
                    username: string;
                    password: string;
                    url: string;
                    tag: string;
                    id: number;
                  },
                  index,
                ) => (
                  <Password
                    showToast={showToast}
                    key={index}
                    password={password}
                    onClick={() => {
                      setSlider(true);
                      setSliderTitle("Credential");
                      setSliderContent(
                        <Credential
                          showToast={showToast}
                          {...password}
                          setShow={setSlider}
                          onEdit={() => {
                            setSliderTitle("Edit Credential");
                            setSliderContent(
                              <CredentialEdit
                                showToast={showToast}
                                oldCredential={password}
                                setShow={setSlider}
                              />,
                            );
                          }}
                        />,
                      );
                    }}
                  />
                ),
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
