import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getCharactersTC} from '../../Bll/reducers/characterReducer'
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from '@material-ui/core'
import {NavLink, useParams} from 'react-router-dom'
import {getCharacters} from '../../Bll/selectors/selectors'
import {PATH} from '../../App'
import PaginationPage from '../../Common/pagination/paginationPage'
import s from './characters.module.scss'
import SelectPage from '../../Common/select/select'
import {Autocomplete} from "@material-ui/lab"

const Characters = () => {
    const {id} = useParams<{ id: string }>()
    const characters = useSelector(getCharacters)
    const dispatch = useDispatch()
    const [gender, setGender] = useState<string>('Unknown')
    const [inputValue, setInputValue] = React.useState('');
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setGender(event.target.value as string);
    };
    const cultures = [
        {title: 'Valyrian'},
        {title: 'Northmen'},
        {title: 'Braavosi'},
        {title: 'Westeros'},
        {title: 'Stormlands'},
        {title: 'Ironborn'},
        {title: 'Andal'},
        {title: 'Dornish'},
        {title: 'Ghiscari'},
        {title: 'Ghiscari'},
        {title: 'Free Folk'},
        {title: 'Qartheen'},
    ]
    useEffect(() => {
        dispatch(getCharactersTC(id, gender, inputValue))
    }, [dispatch, id, gender, inputValue])
    return <>
        <div className={s.container}>
            <PaginationPage id={id}/>
            <Autocomplete
                options={cultures}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                getOptionLabel={(option) => option.title}
                style={{width: 250}}

                renderInput={(params) =>
                    <TextField {...params}


                               label='Search by culture' variant='standard'/>}
            />
            <SelectPage gender={gender} handleChange={handleChange}/>
        </div>
        <TableContainer component={Paper}>
            <Table size='medium' stickyHeader={true}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Alive</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Culture</TableCell>
                        <TableCell>Allegiances</TableCell>
                        <TableCell>Books</TableCell>
                    </TableRow>
                </TableHead>
                <div>

                </div>
                <TableBody>
                    {characters.map(character => (
                        <TableRow className={s.tableRow} key={character.url}>
                            <TableCell>{`${character.name && character.name + ' :'}
                            ${character.aliases.map(item => item)}`}</TableCell>

                            {character.died ? <TableCell>{`Dead in ${character.died}`}</TableCell> :
                                <TableCell className={s.tableCell}>{`Yes${character.died}`}</TableCell>
                            }

                            {character.gender ? <TableCell>{character.gender}</TableCell> :
                                <TableCell>Unknown</TableCell>
                            }
                            {character.culture ? <TableCell>{character.culture}</TableCell> :
                                <TableCell>Unknown</TableCell>
                            }
                            <TableCell>
                                {character.allegiances[0] ? <NavLink
                                    to={`${PATH.houses}/${character.allegiances[0] &&
                                    character.allegiances[0].substr(character.allegiances[0].length - 3, 3)
                                        .replace(/[^\d.-]/g, '')}`}>
                                    {character.allegiances[0] && character.allegiances[0]
                                        .substr(character.allegiances[0].length - 3, 3)
                                        .replace(/[^\d.-]/g, '')}
                                </NavLink> : 'Unknown'}
                            </TableCell>
                            <TableCell>{character.books.length}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>


    </>
}

export default Characters;