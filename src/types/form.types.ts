// formTypes.ts

export type FormData = Record<string, string | number | boolean | undefined>;
export type FormSetData = (data: FormData) => void;

export type FormErrors = Record<string, string[] | undefined>;
export type FormSetErrors = (errors: FormErrors) => void;

export type UseFormReturn = {
  form: {
    data: FormData;
    errors: FormErrors;
    setErrors: FormSetErrors;
    setData: FormSetData;
  };
};

export type FormProps = {
  children: React.ReactNode;
  form: UseFormReturn["form"];
  onSubmit?: (data: FormData) => void;
};
