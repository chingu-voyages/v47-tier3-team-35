const ResponsivePaddingWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col px-[0.5rem] sm:px-[1rem] md:px-[1.5rem] lg:px-[3rem]">
      {children}
    </div>
  );
};
export default ResponsivePaddingWrapper;
