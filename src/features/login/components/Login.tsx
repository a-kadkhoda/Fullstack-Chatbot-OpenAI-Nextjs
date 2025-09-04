import { AuthSteps } from "@/app/(auth)/auth/page";
import { userLoginSchema } from "@/helper/validations/userValidation";
import { useLogin } from "@/queries/auth";
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

interface LoginProps {
  onSelected: (value: AuthSteps) => void;
}

const Login: React.FC<LoginProps> = ({ onSelected }) => {
  const { push } = useRouter();

  const { mutate: onLogin, isPending } = useLogin({
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

  type FormData = z.infer<typeof userLoginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userLoginSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    onLogin(data);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
        Need to create an account?{" "}
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => onSelected(AuthSteps.Signup)}
        >
          Sign up
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button type="submit" fullWidth color="primary" isDisabled={isPending}>
          {isPending ? (
            <>
              <span>Logging in</span>{" "}
              <Spinner size="md" variant="dots" color="default" />
            </>
          ) : (
            "Login"
          )}
        </Button>
      </div>
    </form>
  );
};

export default Login;
