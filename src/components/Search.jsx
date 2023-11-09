import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import useUser from '../hooks/use-user';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { useState } from 'react';


export default function SearchInput() {
    const { allUser } = useUser();
    const navigate = useNavigate()







    const options = allUser.map((option) => {
        const firstLetter = option.firstName[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    });

    const sortedOptions = options.sort((a, b) => {
        const nameA = `${a.firstName} ${a.lastName}`.toUpperCase();
        const nameB = `${b.firstName} ${b.lastName}`.toUpperCase();
        return nameA.localeCompare(nameB);
    });

    return (
        <div className='w-[400px] flex justify-center items-center gap-4 p-1 flex-1'>
            <div>
                <Autocomplete
                    id="search-input-autocomplete"
                    disableClearable
                    options={sortedOptions}
                    groupBy={(option) => option.firstLetter}
                    getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="With categories" />}
                    onChange={(event, value) => {
                        const selectedUserId = value?.id;

                        console.log('Selected User ID:', selectedUserId);
                        navigate(`/manage/employee/${selectedUserId}`)

                    }}
                />

            </div>
            {/* <Link to={`/manage/employee/${selectedUser}`}>
                <div className='hover:text-blue-700 cursor-pointer'>
                    <SearchIcon fontSize="large" />
                </div>
            </Link> */}

        </div>


    );
}
