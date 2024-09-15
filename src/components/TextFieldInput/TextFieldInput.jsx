function TextFieldInput({
  name,
  label,
  required,
  register,
  validationSchema = {},
  type = "text",
  placeholder,
  errors,
  autoFocus,
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-gray-700">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <input
        {...register(name, validationSchema)}
        type={type}
        id={name}
        autoComplete="off"
        autoFocus={autoFocus}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-indigo-500 focus:bg-white focus:outline-none transition-all duration-300 ease-out"
      />
      {errors && errors[name] && (
        <span className="block text-rose-500 my-2 ml-1 text-sm">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
}

export default TextFieldInput;
