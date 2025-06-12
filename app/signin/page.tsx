"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Client-side validation
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    formData.set("flow", flow);

    try {
      await signIn("password", formData);
      router.push("/");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Authentication failed";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-96 mx-auto h-screen justify-center items-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">
          {flow === "signIn" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {flow === "signIn"
            ? "Sign in to access your account"
            : "Sign up to get started"}
        </p>
      </div>

      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            className="bg-background text-foreground rounded-md p-3 border-2 border-slate-200 dark:border-slate-800 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-colors"
            type="email"
            name="email"
            placeholder="your@email.com"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            className="bg-background text-foreground rounded-md p-3 border-2 border-slate-200 dark:border-slate-800 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-colors"
            type="password"
            name="password"
            placeholder="Password"
            required
            minLength={8}
          />
          {flow === "signUp" && (
            <p className="text-xs text-gray-500">
              Password must be at least 8 characters long
            </p>
          )}
        </div>

        <button
          className="bg-foreground text-background rounded-md p-3 font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={isLoading}
        >
          {isLoading
            ? "Please wait..."
            : flow === "signIn"
              ? "Sign in"
              : "Create account"}
        </button>

        <div className="flex flex-row gap-2 text-sm justify-center">
          <span className="text-gray-600 dark:text-gray-400">
            {flow === "signIn"
              ? "Don't have an account?"
              : "Already have an account?"}
          </span>
          <button
            type="button"
            className="text-foreground underline hover:no-underline"
            onClick={() => {
              setFlow(flow === "signIn" ? "signUp" : "signIn");
              setError(null);
            }}
          >
            {flow === "signIn" ? "Sign up" : "Sign in"}
          </button>
        </div>

        {error && (
          <div className="bg-red-500/20 border-2 border-red-500/50 rounded-md p-3">
            <p className="text-foreground text-sm">
              <strong>Error:</strong> {error}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
