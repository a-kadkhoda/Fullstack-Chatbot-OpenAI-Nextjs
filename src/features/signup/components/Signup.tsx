import { AuthSteps } from "@/app/(auth)/auth/page";
import { userRegisterSchema } from "@/helper/validations/userValidation";
import { useRegister } from "@/queries/auth";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { Spinner } from "@heroui/spinner";
import { addToast } from "@heroui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

interface SignupProps {
  onSelected: (value: AuthSteps) => void;
}

const Signup: React.FC<SignupProps> = ({ onSelected }) => {
  const { push } = useRouter();

  const { mutate: onRegister, isPending } = useRegister({
    onSuccess(data) {
      addToast({
        title: data.message,
      });
    },
    onError(error) {
      addToast({
        title: error?.error,
      });
    },
    onSettled(data) {
      if (data?.isSuccess) push("/chat");
    },
  });

  type FormData = z.infer<typeof userRegisterSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userRegisterSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    onRegister(data);
  };
  return (
    <form
      className="flex flex-col gap-4 h-[300px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        isRequired
        label="Name"
        placeholder="Enter your name"
        type="password"
        {...register("name")}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
      />
      <Input
        isRequired
        label="Email"
        placeholder="Enter your email"
        type="email"
        {...register("email")}
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message}
      />
      <Input
        isRequired
        label="Password"
        placeholder="Enter your password"
        type="password"
        {...register("password")}
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message}
      />
      <p className="text-center text-small">
        Already have an account?{" "}
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => onSelected(AuthSteps.Login)}
        >
          Login
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button type="submit" fullWidth color="primary" isDisabled={isPending}>
          {isPending ? (
            <>
              <span>Sign up</span>{" "}
              <Spinner size="md" variant="dots" color="default" />
            </>
          ) : (
            "Sign up"
          )}
        </Button>
      </div>
    </form>
  );
};

export default Signup;
