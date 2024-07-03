import { useEffect, useState } from "react";

const useMounted = () => {
  const [mounted, setMounted] = useState(false);
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
};

export default useMounted;
