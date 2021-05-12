import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCharactersTC} from "../../Bll/reducers/characterReducer";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {NavLink, useParams} from 'react-router-dom';
import {getCharacters} from "../../Bll/selectors/selectors";
import {PATH} from "../../App";
import PaginationPage from "../../Common/pagination/paginationPage";
import s from './characters.module.scss'

const Characters = () => {
    const {id} = useParams<{ id: string }>()
    const characters = useSelector(getCharacters)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCharactersTC(id))
    }, [dispatch, id])

    return <>
        <div className={s.paginationContainer}><PaginationPage id={id}/></div>
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
                    {characters.map((character, id) => (
                        <TableRow className={s.tableRow} key={character.url}>
                            <TableCell>{`${character.name&&character.name+' :'}
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
                                <NavLink
                                    to={`${PATH.houses}/${character.allegiances[0] && character.allegiances[0].substr(character.allegiances[0].length - 3, 3).replace(/[^\d.-]/g, '')}`}>
                                    {character.allegiances[0] && character.allegiances[0].substr(character.allegiances[0].length - 3, 3).replace(/[^\d.-]/g, '')}
                                </NavLink>
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