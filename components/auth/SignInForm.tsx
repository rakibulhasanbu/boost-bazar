"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import AppFormInput from "../ui/AppFormInput";
import { FaRegUser } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";
import { MdOutlineLock } from "react-icons/md";
import AppButton from "../ui/AppButton";
import Link from "next/link";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:max-w-[80%] space-y-5"
    >
      <AppFormInput
        name="email"
        type="email"
        label="Your e-mail"
        register={register}
        required
        icon={<FiMail />}
        placeholder="Enter Your e-mail"
        error={errors.email}
      />
      <AppFormInput
        name="password"
        type="password"
        label="Password"
        register={register}
        required
        icon={<MdOutlineLock />}
        placeholder="at least 8 characters"
        error={errors.password}
      />
      <div className="flex gap-2 pb-8 pt-4">
        <input
          type="checkbox"
          name="checkbox"
          id=""
          className="border-dark-grey h-fit mt-1 outline-none"
        />
        <p className="text-dark-grey font-light">Keep me logged in</p>
      </div>
      <AppButton type="submit" className="w-full py-3" label="Log in" />
      <p className="text-center">
        Don&apos;t have an account?{" "}
        <Link href={"/auth/sign-up"} className="text-primary font-medium">
          Sign up
        </Link>
      </p>
      <Link
        href={"/auth/forgot-password"}
        className="text-primary text-center block w-fit mx-auto"
      >
        Forgot password?
      </Link>
    </form>
  );
};

export default SignInForm;
