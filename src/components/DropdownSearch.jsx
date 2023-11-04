import SelectSearch from "react-select-search";
import "react-select-search/style.css";

/**
 * The options array should contain objects.
 * Required keys are "name" and "value" but you can have and use any number of key/value pairs.
 */
const options = [
  { name: "Swedish", value: "sv" },
  { name: "English", value: "en" },
  {
    type: "group",
    name: "Group name",
    items: [{ name: "Spanish", value: "es" }],
  },
];

/* Simple example */
export default function DropdownSearch() {
  return (
    <div>
      <SelectSearch
        options={options}
        value="sv"
        name="language"
        placeholder="Choose your language"
      />
    </div>
  );
}
