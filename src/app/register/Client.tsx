"use client";

import { FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";
import Swal from "sweetalert2";

import { useRegisterUser } from "@/hooks/queries/useUsers";
import { clientRegisterSchema, ClientRegisterFormErrors } from "@/lib/schema/clientRegisterSchema";
import { UserData } from "@/types/user";

const inputClassName =
  "mt-2 h-12 w-full rounded-xl border border-neutral-200 bg-surface-snow px-4 text-sm text-neutral-800 outline-none transition placeholder:text-neutral-400 hover:border-surface-aqua-muted focus:border-accent-500 focus:ring-4 focus:ring-accent-100";

export default function ClientForm() {
  const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL;
  const registerUserMutation = useRegisterUser();
  const [errors, setErrors] = useState<ClientRegisterFormErrors>({});

  async function handleFormData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formValues = {
      firstName: data.get("firstName") as string,
      lastName: data.get("lastName") as string,
      username: data.get("username") as string,
      email: data.get("email") as string,
      password: data.get("password") as string,
      confirmPass: data.get("confirmPass") as string,
    };

    const result = clientRegisterSchema.safeParse(formValues);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({});

    const userData: UserData = {
      firstName: result.data.firstName,
      lastName: result.data.lastName,
      username: result.data.username,
      email: result.data.email,
      password: result.data.password,
    };

    Swal.fire({
      title: "Creating your account",
      text: "This will only take a moment.",
      allowOutsideClick: false,
      color: "#1E293B",
      didOpen: () => Swal.showLoading(),
    });

    try {
      await registerUserMutation.mutateAsync(userData);
      Swal.close();

      await Swal.fire({
        icon: "success",
        title: "Account created",
        text: "Your Nestify account is ready. Sign in to get started.",
        color: "#1E293B",
        confirmButtonColor: "#1D4ED8",
        confirmButtonText: "Continue to sign in",
      });

      window.location.assign(loginUrl ?? "/login");
    } catch (error: unknown) {
      Swal.fire({
        icon: "error",
        title: "Account not created",
        text: error instanceof Error ? error.message : "Check your details and try again.",
        color: "#1E293B",
        confirmButtonColor: "#1D4ED8",
      });
    }
  }

  return (
    <form onSubmit={handleFormData} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First name" name="firstName" autoComplete="given-name" error={errors.firstName?.[0]} />
        <Field label="Last name" name="lastName" autoComplete="family-name" error={errors.lastName?.[0]} />
      </div>

      <div className="mt-5">
        <Field
          label="Username"
          name="username"
          autoComplete="username"
          hint="Use one word without spaces."
          error={errors.username?.[0]}
        />
      </div>

      <div className="mt-5">
        <Field label="Email address" name="email" type="email" autoComplete="email" error={errors.email?.[0]} />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          hint="At least 8 characters."
          error={errors.password?.[0]}
        />
        <Field
          label="Confirm password"
          name="confirmPass"
          type="password"
          autoComplete="new-password"
          error={errors.confirmPass?.[0]}
        />
      </div>

      <button
        type="submit"
        disabled={registerUserMutation.isPending}
        className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent-600 px-5 text-sm font-semibold text-white transition-all hover:bg-accent-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-600 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-neutral-400"
      >
        {registerUserMutation.isPending ? "Creating account…" : "Create household account"}
        {!registerUserMutation.isPending && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
      </button>

      <p className="mt-5 text-center text-sm text-neutral-600">
        Already have an account?{" "}
        <a href={loginUrl ?? "/login"} className="font-semibold text-accent-600 underline-offset-4 hover:underline">
          Sign in
        </a>
      </p>
    </form>
  );
}

interface FieldProps {
  readonly label: string;
  readonly name: string;
  readonly type?: "text" | "email" | "password" | "tel";
  readonly autoComplete?: string;
  readonly hint?: string;
  readonly error?: string;
}

function Field({ label, name, type = "text", autoComplete, hint, error }: FieldProps) {
  const errorId = `${name}-error`;
  const hintId = `${name}-hint`;

  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold text-neutral-800">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        className={inputClassName}
        placeholder={label}
      />
      {error ? (
        <p id={errorId} className="mt-1.5 text-xs font-medium text-error">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="mt-1.5 text-xs text-neutral-600">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
