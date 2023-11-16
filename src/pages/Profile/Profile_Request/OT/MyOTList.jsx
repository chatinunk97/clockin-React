import OTCard from "./OTCard";

export default function MyOTList({ OT }) {
    return (
        <div className='flex flex-col gap-4 justify-center items-center w-full'>
            {OT.map(el => (
                <OTCard key={el.id} OT={el} />
            ))}
        </div>
    );
}
