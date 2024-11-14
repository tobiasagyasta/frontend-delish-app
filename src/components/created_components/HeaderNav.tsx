"use client";
import React from "react";
// import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const HeaderNav = ({ name, link }: { name: string; link: string }) => {
  // const router = useRouter();
  return (
    <>
      <header className="relative w-full flex items-center bg-white text-black p-6 border border-x-0 border-t-0 border-b-[#EAECF0]">
        <div className="absolute left-4 down-2">
          {name === "Tulis Ulasan" ? (
            <>
              <ArrowLeft
                className="md:mb-0 md:hover:text-primary-light "
                strokeWidth={2}
                size={28}
              />
            </>
          ) : (
            <Link href={`/${link}`}>
              <ArrowLeft
                className="md:mb-0 md:hover:text-primary-light "
                strokeWidth={2}
                size={28}
              />
            </Link>
          )}
        </div>
        <div className="w-full text-center font-bold text-base">{name}</div>
      </header>
    </>
  );
};

export default HeaderNav;
