const LoaderOnly = () => {
  return (
    <div
      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-main-color"
      role="status"
    ></div>
  );
};

export default LoaderOnly;
