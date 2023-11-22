"use client";

import { useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler, Field } from "react-hook-form";
import Link from "next/link";
import { AiOutlineAccountBook, AiOutlineGoogle } from "react-icons/ai";
import Heading from "../components/Heading";
import Button from "../components/Button";
import Input from "../components/inputs/input";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";
interface RegisterFormProps {
  currentUser: SafeUser | null;
}
const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   if (currentUser) {
  //     router.push("/");
  //     router.refresh();
  //   }
  // }, []);
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
    axios.post("/api/register", data).then(() => {
      toast.success("Account created successfully");

      signIn("credentials", {
        email: data.email,
        password: data.password,
        redirectUrl: false,
      })
        .then((callback) => {
          if (callback?.ok) {
            router.push("/cart");
            router.refresh();
            toast.success("Logged in");
          }
          if (callback?.error) {
            toast.error(callback.error);
          }
        })
        .catch((error) => {
          toast.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    });

    setIsLoading(false);
  };
  if (currentUser) {
    return (
      <>
        <div className="text-center">
          <p className="mb-4 text-lg tracking-wider ">Logged in.. </p>

          <hr />
          <p className="mt-4 text-slate-700">Redirecting...</p>
        </div>
      </>
    );
  }

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
