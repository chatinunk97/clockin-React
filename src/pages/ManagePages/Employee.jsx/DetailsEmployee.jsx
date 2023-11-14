import React from 'react'

export default function DetailsEmployee() {
    return (

        <form className="grid grid-cols-2 gap-x-3 gap-y-4 items-center p-6 md:pt-4 md:pl-20 md:pr-20 md:pb-12 cursor-default ">
            <div className="p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2 boder border-stone-400 text-xl text-center">
                <h1 className='text-azure-500 font-bold'>ClockIn Time</h1>
                <h1 className=' border border-stone-200 p-2 rounded-md'>9:00:43</h1>
            </div>
            <div className="p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2 boder border-stone-400 text-xl text-center">
                <h1 className='text-azure-500 font-bold'>ClockOut Time</h1>
                <h1 className=' border border-stone-200 p-2 rounded-md'>19:00:00</h1>
            </div>
            <div className="p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2 boder border-stone-400 text-xl text-center">
                <h1 className='text-azure-500 font-bold'>Late Information</h1>
                <h1 className=' border border-stone-200 p-2 rounded-md'>xxxxx</h1>
            </div>
            <div className="p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2 boder border-stone-400 text-xl text-center">
                <h1 className='text-azure-500 font-bold'>Location Information</h1>
                <h1 className=' border border-stone-200 p-2 rounded-md'>xxxx</h1>
            </div>

            <div className='h-72 w-[95%] border border-stone-300 text-center flex justify-center flex-col rounded-md'>
                !!!!!! MAP !!!!
            </div>


            <div className='h-72 w-[95%] border border-stone-300 text-center flex justify-center flex-col rounded-md'>
                !!!!!! MAP !!!!
            </div>

        </form>


    )
}
