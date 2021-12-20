import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
  const [debouncedVal, setDebouncedVal] = useState(value);
  useEffect(() => {
    const timeOutHandler = setTimeout(
      () => setDebouncedVal(value),
      delay * 1000
    );

    return () => clearTimeout(timeOutHandler);
  }, [delay, value]);
  return typeof debouncedVal == "string"
    ? debouncedVal?.toLowerCase()
    : debouncedVal;
};

export default useDebounce;
