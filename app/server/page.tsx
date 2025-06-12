import Inner from "./inner";
import { preloadQuery, preloadedQueryResult } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

export default async function ServerPage() {
  const preloaded = await preloadQuery(api.myFunctions.getHelloMessage, {});
  const data = preloadedQueryResult(preloaded);

  return (
    <main className="p-8 flex flex-col gap-4 mx-auto max-w-2xl">
      <h1 className="text-4xl font-bold text-center">
        Server-Side Data Loading
      </h1>

      <div className="flex flex-col gap-4 bg-slate-200 dark:bg-slate-800 p-4 rounded-md">
        <h2 className="text-xl font-bold">Server-preloaded data</h2>
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
        {!data.isAuthenticated && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-3 rounded">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              💡 This data was loaded on the server without authentication.
              <Link
                href="/signin"
                className="underline hover:no-underline ml-1"
              >
                Sign in
              </Link>{" "}
              to see your personalized message.
            </p>
          </div>
        )}
      </div>

      <Inner preloaded={preloaded} />

      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
        <h3 className="font-semibold mb-2">How this works:</h3>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>• Server component preloads data before rendering</li>
          <li>• Works for both authenticated and unauthenticated users</li>
          <li>• Client component below updates reactively when auth changes</li>
          <li>• Demonstrates server/client data flow patterns</li>
        </ul>
      </div>
    </main>
  );
}
