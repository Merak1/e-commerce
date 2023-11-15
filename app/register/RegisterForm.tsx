"use client";

import { useState } from "react";
import { useForm, FieldValues, SubmitHandler, Field } from "react-hook-form";
import Link from "next/link";
import { AiOutlineAccountBook, AiOutlineGoogle } from "react-icons/ai";
import Heading from "../components/Heading";
import Button from "../components/Button";
import Input from "../components/inputs/input";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
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
      <Heading title="Sing up for E-shop" />
      <Button
        label="Sign up with Google"
        outline
        icon={AiOutlineGoogle}
        onClick={handleSubmit(onSubmit)}
      />
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="name"
        label="name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
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
        Already have an account?
        <Link className=" pl-5 text-sm underline text-slate-500" href="/login">
          Log in
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
