"use client";

import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 bg-background p-4 border-b-2 border-slate-200 dark:border-slate-800 flex flex-row justify-between items-center">
        <h1 className="font-semibold">Convex DDD Example</h1>
        <SignOutButton />
      </header>
      <main className="p-8 flex flex-col gap-8">
        <div className="flex flex-col gap-4 max-w-lg mx-auto">
          <h1 className="text-4xl font-bold text-center">
            Welcome to your DDD App
          </h1>
          <Content />
        </div>
      </main>
    </>
  );
}

function SignOutButton() {
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();
  const router = useRouter();

  return (
    <>
      {isAuthenticated && (
        <button
          className="bg-slate-200 dark:bg-slate-800 text-foreground rounded-md px-2 py-1"
          onClick={() =>
            void signOut().then(() => {
              router.push("/signin");
            })
          }
        >
          Sign out
        </button>
      )}
    </>
  );
}

function Content() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!isAuthenticated) {
    return <p className="text-center">Please sign in to continue.</p>;
  }

  return (
    <div className="flex flex-col gap-4 text-center">
      <p className="text-lg">You are successfully authenticated!</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Ready to build your domain-driven application.
      </p>
    </div>
  );
}
