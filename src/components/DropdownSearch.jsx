import Select from 'react-select';


export default function DropdownSearch({ data, onChange, name, value }) {
  /* 
  data pattern is  an array with object structure like this
  {label : <choiceLabel> , value : <theActualValue>}
  */

  return (
    <div>
      <Select
        value={value}
        options={data}
        onChange={(selected) => { onChange(selected, name) }}
      />
    </div>
  );
}