"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import AppFormInput from "../ui/AppFormInput";
import AppButton from "../ui/AppButton";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";
import { TbNumber123 } from "react-icons/tb";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { selectCurrentUser, setOtp } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import {
  useForgotPasswordMutation,
  useVerifyForgotUserMutation,
} from "@/redux/features/auth/authApi";

interface FormData {
  code: string;
}

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [verifyUser, { isLoading }] = useVerifyForgotUserMutation();
  const [resendEmail, { isLoading: resendLoading }] =
    useForgotPasswordMutation();
  const user = useAppSelector(selectCurrentUser);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await verifyUser({ token: data.code, email: user?.email })
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        dispatch(setOtp(data.code));
        router.push("/auth/new-password");
      })
      .catch((res) => {
        toast.error(res?.data?.message);
      });
  };

  const handleResend = async () => {
    await resendEmail(user?.email)
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        // dispatch(setUser({ user: { email: data.email } }));
      })
      .catch((res) => {
        toast.error(res?.data?.message);
      });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:max-w-[80%] space-y-5"
    >
      <AppFormInput
        name="code"
        type="number"
        label="Enter code"
        register={register}
        required
        icon={<TbNumber123 />}
        placeholder="Enter code"
        error={errors.code}
      />

      <AppButton
        disabled={isLoading}
        type="submit"
        className="w-full py-3"
        label="Continue"
      />

      <p className="text-center">
        Don&apos;t receive code?{" "}
        <button
          onClick={handleResend}
          type="button"
          className="text-primary font-medium"
        >
          Click to resend
        </button>
      </p>

      <Link
        href={"/auth/sign-in"}
        className="text-dark-grey text-center flex items-center justify-center gap-1 font-medium"
      >
        <IoArrowBackOutline className="text-lg" /> Back to log in
      </Link>
    </form>
  );
};

export default ResetPassword;
