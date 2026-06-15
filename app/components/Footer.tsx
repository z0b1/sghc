import Link from "next/link";
import Image from "next/image";
import { HackClubBrand } from "../config/branding"; // corrected path

export default function Footer() {
  return (
    <footer
      className="flex flex-col items-center justify-center py-6 border-t"
      style={{
        backgroundColor: HackClubBrand.colors.darkBackground,
        borderTopColor: HackClubBrand.colors.darkBorder,
        color: HackClubBrand.colors.darkText,
      }}
    >
      {/* Logo and brand name */}
      <Link href="/" className="flex items-center space-x-2 mb-2">
        <Image
          src={HackClubBrand.logos.iconRounded}
          alt="Hack Club"
          width={24}
          height={24}
        />
        <span
          className="font-bold text-sm"
          style={{
            color: HackClubBrand.colors.red,
            fontFamily: HackClubBrand.fonts.heading,
          }}
        >
          Hack Club
        </span>
      </Link>
      {/* Flag image */}
      <Image
        src="https://assets.hackclub.com/flag-standalone.svg"
        alt="Hack Club Flag"
        width={200}
        height={50}
        className="my-2"
      />
      <span className="text-xs opacity-70">
        © {new Date().getFullYear()} Hack Club. All rights reserved.
      </span>
    </footer>
  );
}
