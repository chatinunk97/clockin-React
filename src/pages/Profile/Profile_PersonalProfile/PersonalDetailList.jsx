export default function PersonalDetailList({ listName, listInfo }) {
  return (
    <div>
      <h2 className="font-bold text-[18px]">{listName}</h2>
      <h3>{listInfo}</h3>
      <hr />
    </div>
  );
}
