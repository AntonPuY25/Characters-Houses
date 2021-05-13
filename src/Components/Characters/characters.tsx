import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCharactersTC} from "../../Bll/reducers/characterReducer";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from "@material-ui/core";
import {NavLink, useParams} from 'react-router-dom';
import {getCharacters} from "../../Bll/selectors/selectors";
import {PATH} from "../../App";
import PaginationPage from "../../Common/pagination/paginationPage";
import s from './characters.module.scss'
import SelectPage from "../../Common/select/select";

const Characters = () => {
    const {id} = useParams<{ id: string }>()
    const characters = useSelector(getCharacters)
    const dispatch = useDispatch()
    const [gender, setGender] = useState<string>('Unknown')
    const [searchCulture, setSearchCulture] = useState<string>('')
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setGender(event.target.value as string);
    };
    useEffect(() => {
        dispatch(getCharactersTC(id))
    }, [dispatch, id])
    const filterCharacter = characters?.filter(item => gender !== "Unknown" ?
        item.gender === gender && item.culture.toLocaleLowerCase().match(searchCulture)
        : item.culture.toLocaleLowerCase().match(searchCulture))
    return <>
        <div className={s.paginationContainer}><PaginationPage id={id}/></div>
        <TextField label="Culture" value={searchCulture} onChange={(e) => setSearchCulture(e.currentTarget.value)}/>
        <div className={s.selectContainer}><SelectPage gender={gender} handleChange={handleChange}/></div>
        <TableContainer component={Paper}>
            <Table size="medium" stickyHeader={true}>
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
                    {filterCharacter.map((character, id) => (
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
                                    to={`${PATH.houses}/${character.allegiances[0] && character.allegiances[0].substr(character.allegiances[0].length - 3, 3).replace(/[^\d.-]/g, '')}`}>
                                    {character.allegiances[0] && character.allegiances[0].substr(character.allegiances[0].length - 3, 3).replace(/[^\d.-]/g, '')}
                                </NavLink> : "Unknown"}
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