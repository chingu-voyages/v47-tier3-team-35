export interface FormProps<T, B = any> {
  children?: React.ReactNode;
  onClose?: (e?: B) => void;
  actionType: "create" | "edit";
  spaces?: string[];
  userId?: string;
  itemId?: string;
  defaultData?: T;
}