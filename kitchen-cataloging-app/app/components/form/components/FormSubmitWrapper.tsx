import React from "react";

export default function FormSubmitWrapper({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form
      className="relative flex flex-col bg-default-sys-light-surface-container-low w-full h-full"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}
