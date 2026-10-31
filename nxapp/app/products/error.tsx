"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">

      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-3xl font-bold text-red-600">
        !
      </div>

      <h2 className="mt-5 text-2xl font-bold text-gray-800">
        Oops! Something went wrong.
      </h2>

      <p className="mt-2 max-w-md text-gray-500">
        We couldn't load the products. Please check your internet connection
        and try again.
      </p>

      <button
        onClick={() => reset()}
        className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Try again
      </button>

    </div>
  );
}