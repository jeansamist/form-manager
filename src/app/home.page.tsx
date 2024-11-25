import { Form, useForm } from "@/components/form";
import { Input } from "@/components/input";
import { PageComponent } from "rasengan";
import { useEffect } from "react";
import { z } from "zod";

const Home: PageComponent = () => {
  const { form } = useForm();
  useEffect(() => {
    console.log(form.data);
  }, [form.data]);
  return (
    <div>
      <Form form={form} onSubmit={(data) => console.log(data)}>
        <Input name="number" schema={z.number()} />
        <Input name="password" />
        <button>Submit</button>
      </Form>
    </div>
  );
};

Home.path = "/";
Home.metadata = {
  title: "Home",
  description: "Home page",
};

export default Home;
