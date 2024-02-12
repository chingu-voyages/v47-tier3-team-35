import { debounce } from "lodash";
import { useState, useEffect, useCallback, useMemo } from "react";

function useDebouncedInput(delay: number) {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const onDebounceChange = useMemo(
    () => debounce((val: string) => setDebouncedValue(val), delay),
    [delay]
  );
  const handleChange = useCallback(
    (value: string) => {
      setInputValue(value);
      onDebounceChange(value);
    },
    [delay, onDebounceChange]
  );

  useEffect(() => {
    return () => {
      onDebounceChange.cancel();
    };
  }, []);

  return [inputValue, debouncedValue, handleChange] as const;
}

export default useDebouncedInput;
