import Select from "react-select";

const MultiSelect = ({
  name,
  placeholder,
  value,
  isMulti,
  isClearable,
  onChange,
  backspaceRemovesValue,
  setActiveFilters,
  filters,
}) => {
  const handleChange = value => {
    const currentFilters = value.map(f => f.label);
    setActiveFilters(currentFilters);
    onChange(name, value);
  };

  const mapper = item => {
    return { label: item, value: item };
  };

  const options = filters.map(mapper);

  return (
    <Select
      placeholder={placeholder}
      options={options}
      value={value}
      onChange={handleChange}
      isMulti={isMulti}
      isClearable={isClearable}
      backspaceRemovesValue={backspaceRemovesValue}
      components={{ ClearIndicator: null }}
    />
  );
};

export default MultiSelect;
