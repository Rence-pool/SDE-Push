import PropTypes from "prop-types";
export default function Input({
  // value,
  type,
  id,
  labelStyle = "text-black",
  register,
  // handleOnBlur,
  // handleOnChange,
  placeholder,
  className,
  isError,
  ...props
}) {
  return (
    <div className="flex flex-1 flex-col gap-2 p-2">
      <label className={`label label-text ${labelStyle}`} htmlFor={id}>
        {placeholder}
      </label>
      <input
        name={id}
        // value={value}
        id={id}
        {...register}
        type={type}
        placeholder={placeholder}
        {...props}
        className={`input input-bordered ${className} ${isError && "input-error"}`}
      />
      {isError && (
        <label className="label-text text-error" htmlFor={id}>
          {isError.message ? isError.message : "Error"}
        </label>
      )}
    </div>
  );
}
Input.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  handleOnBlur: PropTypes.func,
  handleOnChange: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  isError: PropTypes.any || PropTypes.object,
  value: PropTypes.any,
  labelStyle: PropTypes.string,
  register: PropTypes.object,
};
