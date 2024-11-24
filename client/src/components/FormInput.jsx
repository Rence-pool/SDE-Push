import PropTypes from "prop-types";
export default function FormInput({
  type,
  id,
  labelStyle = "text-black",
  register,
  placeholder,
  className,
  isError,
  ...props
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className={`label label-text ${labelStyle}`} htmlFor={id}>
        {placeholder}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register}
        {...props}
        className={`input input-bordered ${className} ${
          isError && "input-error"
        }`}
      />
      {isError && (
        <label className="label-text text-error" htmlFor={id}>
          Error
        </label>
      )}
    </div>
  );
}
FormInput.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  handleOnBlur: PropTypes.func,
  handleOnChange: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  isError: PropTypes.bool,
  value: PropTypes.any,
  labelStyle: PropTypes.string,
};
