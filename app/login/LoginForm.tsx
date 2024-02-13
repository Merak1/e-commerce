"use client";

import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { useForm, FieldValues, SubmitHandler, Field } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SafeUser } from "@/types";
interface LoginFormProps {
  currentUser: SafeUser | null | any;
}

const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/");
      router.refresh();
    }
  }, []);

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

    signIn("credentials", {
      ...data,
      // redirect: true,
      callbackUrl: "/",
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        router.push("/cart");
        router.refresh();
        toast.success("Logged in");
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  if (currentUser) {
    return (
      <>
        <div className="text-center">
          <p>Logged in.. </p>

          <hr />
          <p>Redirecting...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Heading title="Log in" />
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
