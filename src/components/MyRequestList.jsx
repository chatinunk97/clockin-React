import MyRequestCard from "./MyRequestCard";

export default function MyRequestList({ myrequestLeave }) {
    return (
        <div className='flex flex-col gap-4 justify-center items-center w-full'>
            {myrequestLeave.map(el => (
                <MyRequestCard key={el.id} myrequestLeave={el} />
            ))}
        </div>
    );
}
