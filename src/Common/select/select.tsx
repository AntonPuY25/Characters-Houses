import React from 'react';
import {FormControl, InputLabel, MenuItem} from "@material-ui/core";
import Select from '@material-ui/core/Select';
type TypePropsGender = {
    gender: string
    handleChange:(event: React.ChangeEvent<{ value: unknown }>)=>void
}
const SelectPage:React.FC<TypePropsGender> = ({gender,handleChange})=>{


    return<>
        <FormControl >
            <InputLabel>Gender</InputLabel>
            <Select
                value={gender}
                onChange={handleChange}
            >
                <MenuItem value={'Unknown'}>Unknown</MenuItem>
                <MenuItem value={'Male'}>Male</MenuItem>
                <MenuItem value={'Female'}>Female</MenuItem>
            </Select>
        </FormControl>
    </>
}

export default SelectPage;