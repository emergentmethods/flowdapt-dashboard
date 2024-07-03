"use client";
import useDictionaries from "@/hooks/useDictionaries";
import Link from "next/link";

const PageNotFound = () => {
  const dict = useDictionaries();

  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center space-y-4">
        <h2 className="text-2xl">{dict.pageNotFound.title}</h2>
        <p className="text-xl">{dict.pageNotFound.message}</p>
        <p className="pt-10">
          <Link
            href="/"
            className="bg-white text-blue-700 px-6 py-2 rounded-lg hover:bg-opacity-80 transition-all duration-200"
          >
            {dict.pageNotFound.btnBackToHome}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
