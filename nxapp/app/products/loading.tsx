export default function Loading() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center">

      <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>

      <p className="mt-5 font-medium text-gray-600">
        Loading products...
      </p>

      <p className="mt-1 text-sm text-gray-400">
        Please wait while we fetch the catalogue.
      </p>

    </div>
  );
}