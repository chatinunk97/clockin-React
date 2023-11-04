import Select from 'react-select';


export default function DropdownSearch({data,onChange,name}) {


  return (
    <div>
      <Select
        options={data}
        onChange={(selected)=>{onChange(selected,name)}}
      />
    </div>
  );
}