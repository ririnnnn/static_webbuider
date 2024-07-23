export function Input({ type, ...props }) {
  const classes = {};
  return (
    <input
      className={
        classes[type]
          ? classes[type]
          : "w-full placeholder:text-13 text-13 py-1 px-2 rounded border-gray-200 border shadow"
      }
      type={type}
      {...props}
    />
  );
}
