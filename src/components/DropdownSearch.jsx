import Select from "react-select";

export default function DropdownSearch({
  data,
  onChange,
  name,
  value,
  placeholder,
}) {
  /* 
  data pattern is  an array with object structure like this
  {label : <choiceLabel> , value : <theActualValue>}
  */

  return (
    <Select
      value={data.find((option) => option.value === value)}
      options={data}
      onChange={(selected) => {
        onChange(selected, name);
      }}
      placeholder={placeholder}
      className="w-full z-20"
    />
  );
}
