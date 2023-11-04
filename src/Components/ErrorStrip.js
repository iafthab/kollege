const ErrorStrip = ({ error }) => {
  return (
    <p className="text-balance m-2 overflow-hidden text-ellipsis whitespace-break-spaces rounded bg-red-300/50 p-1 text-center font-medium text-red-700 dark:bg-transparent">
      {error?.response?.data?.message ||
        error?.data?.message ||
        error?.response?.data}
    </p>
  );
};

export default ErrorStrip;
