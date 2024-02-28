import React from "react";
export default function FormSubmitWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // submit form
  // const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
  //   e.preventDefault();
  //   console.log("submitting");
  //   if (
  //     titleRef.current &&
  //     priceRef.current &&
  //     descriptionRef.current &&
  //     expirationDateRef.current
  //   ) {
  //     console.log("all refs exist");
  //     const errorObject = {
  //       space: space === "" ? true : false,
  //       title: titleRef.current.value === "",
  //       price:
  //         priceRef.current.value === "" ||
  //         Math.abs(
  //           Math.round(parseFloat(priceRef.current.value) * 100) -
  //             parseFloat(priceRef.current.value) * 100
  //         ) > computersAreDumb
  //           ? true
  //           : false,
  //       description: descriptionRef.current.value === "" ? true : false,
  //     };
  //     setErrors(errorObject);
  //     if (Object.values(errorObject).every((err) => err === false)) {
  //       console.log("no errors");
  //       await addEditItem(
  //         space,
  //         titleRef.current.value,
  //         image,
  //         priceRef.current.value,
  //         descriptionRef.current.value,
  //         threshold,
  //         labels,
  //         expirationDateRef.current.value,
  //         userId,
  //         itemData
  //       );
  //       window.location.reload();
  //     }
  //   }
  // };
  return (
    <form className="relative flex flex-col bg-default-sys-light-surface-container-low w-full h-full">
      {children}
    </form>
  );
}
