import PropTypes from "prop-types";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function CustomSelect({ label, options, onItemSelected }) {
  return (
    <Select onValueChange={(value) => onItemSelected(value)}>
      <SelectTrigger>
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((item) => (
            <SelectItem
              key={item.value}
              className="cursor-pointer"
              value={item.value}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

CustomSelect.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  onItemSelected: PropTypes.func,
};
