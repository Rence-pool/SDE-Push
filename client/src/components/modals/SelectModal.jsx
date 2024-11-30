import PropTypes from "prop-types";
export default function SelectModal({
  id,
  placeholder,
  handleInputChange,
  handleInputBlur,
  options,
  hasError,
  labelStyle = "text-black",
  ...props
}) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <label htmlFor={id} className={`label label-text ${labelStyle}`}>
        {placeholder}
      </label>
      <select
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        name={id}
        {...props}
        id={id}
        className={`select select-bordered w-full ${hasError && "border-red-500"}`}
      >
        <option defaultChecked>-</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span>{hasError && <p className="text-red-500">Please select</p>}</span>
    </div>
  );
}
SelectModal.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.array,
  handleInputBlur: PropTypes.func,
  handleInputChange: PropTypes.func,
  hasError: PropTypes.bool,
  labelStyle: PropTypes.string,
};
