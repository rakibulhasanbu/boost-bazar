"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import AppFormInput from "../ui/AppFormInput";
import { FiMail } from "react-icons/fi";
import AppButton from "../ui/AppButton";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";

interface FormData {
  email: string;
}

const ForgotPassword = () => {
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

      <AppButton type="submit" className="w-full py-3" label="Send code" />

      <Link
        href={"/auth/sign-in"}
        className="text-dark-grey text-center flex items-center justify-center gap-1 font-medium"
      >
        <IoArrowBackOutline className="text-lg" /> Back to log in
      </Link>
    </form>
  );
};

export default ForgotPassword;
