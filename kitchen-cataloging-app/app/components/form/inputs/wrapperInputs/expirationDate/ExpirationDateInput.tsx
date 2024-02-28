import React from "react";
import DateInput from "../../innerComponents/date/DateInput";
import { useExpirationDateInput } from "./ExpirationDateProvider";
export default function ExpirationDateInput() {
  const props = useExpirationDateInput();
  if (!props) return <></>;
  const { expirationDate, onChange } = props;
  return (
    <DateInput
      inputName="date"
      label={"Expiration Date"}
      value={expirationDate}
      onChange={onChange}
    />
  );
}
