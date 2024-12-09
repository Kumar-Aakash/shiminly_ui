import React from "react";
import Select, { components } from "react-select";

// Example custom styles for react-select
const customStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: '40px',
    borderRadius: '0.475rem', // Matches Metronic theme rounded style
    borderColor: state.isFocused ? '#C9CCD0' : '#E4E6EF',
    boxShadow: state.isFocused ? '0 0 0 2px #E1E3E8' : null,
    ':hover': {
      borderColor: '#C9CCD0',
    },
    fontSize: '0.9rem',
  }),
  menu: (base) => ({
    ...base,
    zIndex: 9999,
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
    border: '1px solid #E4E6EF'
  }),
  option: (base, state) => ({
    ...base,
    color: state.isSelected ? '#3699FF' : '#3F4254',
    backgroundColor: state.isSelected ? '#E1F0FF' : state.isFocused ? '#F3F6F9' : '#FFFFFF',
    fontSize: '0.9rem',
    ':active': {
      backgroundColor: '#E1F0FF'
    }
  }),
  multiValue: (base) => ({
    ...base,
    borderRadius: '8px',
    backgroundColor: '#E1F0FF', // Light blue for demonstration
    padding: '2px 5px'
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: '#3699FF',
    fontSize: '0.8rem',
    fontWeight: 500,
    padding: '0'
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: '#3699FF',
    ':hover': {
      backgroundColor: '#3699FF',
      color: 'white',
      borderRadius: '12px'
    }
  }),
};

// Example custom MultiValue component to resemble a "badge"
const MultiValue = (props) => {
  return (
    <components.MultiValue {...props}>
      <span className="badge badge-light-primary" style={{ lineHeight: '1.2' }}>
        {props.data.label}
      </span>
    </components.MultiValue>
  );
};

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
      styles={customStyles}
      components={{ MultiValue }}
      placeholder="Assign to classes"
      className="form-select" // Metronic-like class for consistency
      classNamePrefix="select"
    />
  );
};

export default MultiSelect;
