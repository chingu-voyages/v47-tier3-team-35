import { ClassNamesConfig, GroupBase } from "react-select";
export const determineSelectStyles: ClassNamesConfig<
  any,
  any,
  GroupBase<any>
> = {
  container: () => "flex w-full min-h-12",
  control: (props) =>
    `w-full min-h-0 bg-default-sys-light-surface-bright shadow-none ${
      props.isFocused
        ? "border-[2.4px] border-default-sys-light-primary"
        : "border-[0.5px] border-default-ref-neutral-neutral80"
    }`,
  valueContainer: () => "w-full",
  option: () => "w-full",
  placeholder: (props) =>
    props.isFocused ? "text-default-sys-light-primary" : "",
  indicatorSeparator: (props) =>
    props.isFocused ? "bg-default-sys-light-primary" : "",
  dropdownIndicator: (props) =>
    props.isFocused ? "text-default-sys-light-primary" : "",
};
