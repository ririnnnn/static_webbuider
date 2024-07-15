export function Input({ type, ...props }) {
  const classes = {};
  return (
    <input
      className={
        classes[type]
          ? classes[type]
          : "w-full placeholder:text-13 text-13 py-1.5 rounded border-gray-100"
      }
      type={type}
      {...props}
    />
  );
}
