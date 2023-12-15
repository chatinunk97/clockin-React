import PeopleItem from "./PeopleItem";

export default function PeopleList({ allPeople }) {
  return (
    <div>
      {allPeople.map((el) => (
        <PeopleItem key={el.id} peopleObj={el} />
      ))}
    </div>
  );
}
