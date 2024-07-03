"use client";

import Image from "next/image";
import LogoBlack from "@/assets/img/logo_color-black_600dpi.png";
import LogoWhite from "@/assets/img/logo_color-white_600dpi.png";
import React from "react";
import { useTheme } from "next-themes";
import useMounted from "@/hooks/useMounted";

const FlowdaptLogoTheme = () => {
  const { theme } = useTheme();
  const mounted = useMounted();
  const srcImage = theme === "flowdapt_dark" && mounted ? LogoWhite : LogoBlack;
  return (
    <a
      href="https://docs.flowdapt.ai/"
      target="_blank"
      rel="noopener noreferrer"
      title="Flowdapt logo"
    >
      <Image src={srcImage} alt="Flowdapt Logo" width={117} height={36} />
    </a>
  );
};

export default FlowdaptLogoTheme;
