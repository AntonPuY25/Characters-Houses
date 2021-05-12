import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCharactersTC} from "../../Bll/reducers/characterReducer";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import { NavLink } from 'react-router-dom';
import {getCharacters} from "../../Bll/selectors/selectors";

const Characters = ()=>{
    const characters = useSelector(getCharacters)
    console.log(characters)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getCharactersTC())
    },[dispatch])

    return<>

            <TableContainer component={Paper}>
                <Table size="medium">
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
                    <TableBody>
                        {characters.map((character, id) => (
                            <TableRow key={character.url}>
                                <TableCell style={{width:'350px'}}>{`${character.name}
                                :${character.aliases.map(item=>item)}`}</TableCell>
                                {character.died?<TableCell>{`Dead in ${character.died}`}</TableCell>:
                                <TableCell>{`Yes${character.died}`}</TableCell>
                                }
                                {character.gender?<TableCell>{character.gender}</TableCell>:
                                    <TableCell>Unknown</TableCell>
                                }
                                {character.culture?<TableCell>{character.culture}</TableCell>:
                                    <TableCell>Unknown</TableCell>
                                }
                                <TableCell>{character.allegiances[0].substr(character.allegiances[0].length-3, 3).replace(/[^\d.-]/g, '')}</TableCell>
                                <TableCell>{character.books.length}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


    </>
}

export default Characters;