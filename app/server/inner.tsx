"use client";

import { Preloaded, usePreloadedQuery, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Link from "next/link";
import { useConvexAuth } from "convex/react";

export default function Inner({
  preloaded,
}: {
  preloaded: Preloaded<typeof api.myFunctions.getHelloMessage>;
}) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  // Always call hooks in the same order
  const preloadedData = usePreloadedQuery(preloaded);
  const liveData = useQuery(api.myFunctions.getHelloMessage, {});

  // Use live data when available, fall back to preloaded data
  const data = liveData ?? preloadedData;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 bg-slate-200 dark:bg-slate-800 p-4 rounded-md">
        <h2 className="text-xl font-bold">Reactive client-side data</h2>
        <div className="bg-white dark:bg-slate-900 p-3 rounded border">
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 bg-slate-200 dark:bg-slate-800 p-4 rounded-md">
      <h2 className="text-xl font-bold">Reactive client-side data</h2>
      <div className="bg-white dark:bg-slate-900 p-3 rounded border">
        <p className="text-lg">{data.message}</p>
        <div className="flex justify-end mt-2">
          <span
            className={`text-xs px-2 py-1 rounded ${
              data.isAuthenticated
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
            }`}
          >
            {data.isAuthenticated ? "Authenticated" : "Not authenticated"}
          </span>
        </div>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        {data.isAuthenticated ? (
          <p>
            ✅ This component updates reactively when you sign in/out. Try
            opening another tab and signing out to see it update!
          </p>
        ) : (
          <p>
            🔄 This component will update automatically when you{" "}
            <Link href="/signin" className="underline hover:no-underline">
              sign in
            </Link>
            . The data will change without a page refresh!
          </p>
        )}
      </div>

      {/* Debug info */}
      <div className="text-xs text-gray-500 bg-gray-50 dark:bg-gray-900 p-2 rounded">
        Auth Status:{" "}
        {isAuthenticated ? "✅ Authenticated" : "❌ Not authenticated"} | Data
        Status:{" "}
        {data.isAuthenticated ? "✅ Authenticated" : "❌ Not authenticated"} |
        Using: {liveData ? "Live Query" : "Preloaded Data"}
      </div>
    </div>
  );
}
