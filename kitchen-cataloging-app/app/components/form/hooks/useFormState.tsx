"use client";
import { ErrorMessage } from "@/utils/generateErrMessage";
import { useCallback, useState } from "react";
export default function useFormState<T, A>({
  defaultData,
}: {
  defaultData?: Partial<T>;
}) {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorMessage | null>(null);
  const [success, setSuccess] = useState<A | null>(null);
  const [itemData, setItemData] = useState<Partial<T> | null>(
    defaultData || null
  );
  const setErrFunc = (e: ErrorMessage) => {
    setError(e);
    setSuccess(null);
  };
  const setSuccessFunc = (e: A) => {
    setError(null);
    setSuccess(e);
  };
  const savedSuccessFunc = useCallback(setSuccessFunc, []);
  const savedErrFunc = useCallback(setErrFunc, []);
  const handleOpen = () => {
    setSuccess(null);
    setOpen(true);
  };
  const handleClose = (result?: A) => {
    if (result) savedSuccessFunc(result);
    setOpen(false);
  };
  return {
    savedSuccessFunc,
    itemData,
    success,
    error,
    loading,
    open,
    setItemData,
    setLoading,
    handleOpen,
    savedErrFunc,
    handleClose
  };
}
