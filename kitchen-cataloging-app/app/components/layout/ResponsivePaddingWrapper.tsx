const ResponsivePaddingWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col px-[1rem] md:px-[2rem] lg:px-[3rem]">
      {children}
    </div>
  );
};
export default ResponsivePaddingWrapper;
