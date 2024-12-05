import React from "react";
import Select from "react-select";

const MultiSelect = ({ options, value, onChange }) => {
  const formattedOptions = options.map((option) => ({
    label: option,
    value: option,
  }));

  const handleChange = (selected) => {
    const selectedValues = selected ? selected.map((item) => item.value) : [];
    onChange(selectedValues);
  };

  return (
    <Select
      isMulti
      options={formattedOptions}
      value={formattedOptions.filter((option) => value.includes(option.value))}
      onChange={handleChange}
      className="w-full"
    />
  );
};

export default MultiSelect;
