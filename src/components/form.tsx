import {
  FormData,
  FormErrors,
  FormProps,
  FormSetData,
  FormSetErrors,
  UseFormReturn,
} from "@/types/form.types";
import {
  Children,
  cloneElement,
  FunctionComponent,
  isValidElement,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ZodType } from "zod";
import { Input, InputProps } from "./input";

// Custom hook for form state management
export const useForm = (): UseFormReturn => {
  const [data, setData] = useState<FormData>({});
  const [errors, setErrors] = useState<FormErrors>({});

  return {
    form: {
      data,
      errors,
      setErrors,
      setData,
    },
  };
};

// Main Form component
export const Form: FunctionComponent<FormProps> = ({
  children,
  form,
  onSubmit,
}) => {
  const { data, setData, setErrors, errors } = form;
  // Helper function for handling input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string | undefined,
    schema: ZodType | undefined,
    data: FormData,
    errors: FormErrors,
    setData: FormSetData,
    setErrors: FormSetErrors
  ) => {
    if (name) {
      const value = parseFloat(e.target.value) || (e.target.value as string);
      if (schema) {
        const parsed = schema.safeParse(value);
        if (parsed.success) {
          console.log(value);
          setData({ ...data, [name]: value });
        } else {
          if (value === "") {
            setData({ ...data, [name]: "" });
            setErrors({ ...errors, [name]: undefined });
          } else {
            setErrors({
              ...errors,
              [name]: parsed.error.errors.map((e: any) => e.message),
            });
          }
        }
      } else {
        setData({ ...data, [name]: value });
      }
    }
  };
  const makeData = useCallback((children: ReactNode) => {
    let _data = {};
    Children.forEach(children, (child) => {
      if (isValidElement(child)) {
        const childElement = child as ReactElement;
        if (childElement.type === Input) {
          const inputElement = childElement as ReactElement<InputProps>;
          const { name } = inputElement.props;
          if (name && !(name in _data)) {
            _data = { ..._data, [name]: "" };
          }
        }
      }
    });
    return _data;
  }, []);
  useEffect(() => {
    console.log("hello");

    setData(makeData(children));
  }, []);
  // Helper function to build and return transformed children
  const buildChildren = (
    children: ReactNode,
    data: FormData,
    errors: FormErrors,
    setData: FormSetData,
    setErrors: FormSetErrors
  ) => {
    return Children.map(children, (child) => {
      if (isValidElement(child)) {
        const childElement = child as ReactElement;
        if (childElement.type === Input) {
          const inputElement = childElement as ReactElement<InputProps>;
          const { onChange, name, schema } = inputElement.props;

          return cloneElement<InputProps>(inputElement, {
            className: "custom-input-class",
            style: { backgroundColor: "red" },
            onChange: (e) => {
              handleInputChange(
                e,
                name,
                schema,
                data,
                errors,
                setData,
                setErrors
              );
              onChange?.(e);
            },
          });
        }
        return childElement;
      }
      return child;
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(data);
      }}
    >
      {buildChildren(children, data, errors, setData, setErrors)}
    </form>
  );
};
