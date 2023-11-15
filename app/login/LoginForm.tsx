"use client";

import { useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/input";
import { useForm, FieldValues, SubmitHandler, Field } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineAccountBook, AiOutlineGoogle } from "react-icons/ai";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    setIsLoading(true);
    console.log(data);
    setIsLoading(false);
  };

  return (
    <>
      <Heading title="Log in" />
      <Button
        label="Continue with Google"
        outline
        icon={AiOutlineGoogle}
        onClick={handleSubmit(onSubmit)}
      />
      <hr className="bg-slate-300 w-full h-px" />

      <Input
        id="email"
        label="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button
        label={isLoading ? "Loading" : "Sign Up"}
        onClick={handleSubmit(onSubmit)}
      />
      <p>
        Do not have an account?
        <Link
          className=" pl-5 text-sm underline
         text-slate-500"
          href="/register"
        >
          Sign up
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
