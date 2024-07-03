"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import React from "react";

const InputTableSearch = () => {
  const router = useRouter();
  const [, setFocused] = useState(false);
  const { replace } = router;
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="join mr-4">
      <div className="relative">
        <input
          className="input input-bordered join-item input-sm pr-10"
          placeholder="Search..."
          onChange={handleSearch}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          spellCheck={false}
          defaultValue={searchParams.get("search") || ""}
        />
        {isPending && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <span className="loading loading-spinner loading-xs" />
          </div>
        )}
      </div>
    </div>
  );
};

export default InputTableSearch;
