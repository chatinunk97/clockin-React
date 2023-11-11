import MyRequestCard from "./MyRequestCard";

export default function MyRequestList({ myLeave }) {
    return (

        <div className='flex flex-col gap-4 justify-center items-center w-full'>
            {myLeave.map(el => <MyRequestCard key={el.id} myLeave={el} />)}

        </div>
    )
}