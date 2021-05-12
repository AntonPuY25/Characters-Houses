import React, {useEffect} from 'react';
import {NavLink, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {getHousesTC} from "../../Bll/reducers/housesReducer";
import {getHouse} from "../../Bll/selectors/selectors";
import {Card, CardContent, Typography} from "@material-ui/core";
import s from './houses.module.scss'
import {PATH} from "../../App";
import HomeIcon from '@material-ui/icons/Home';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const Houses = () => {
    const {id} = useParams<{ id: string }>()
    const dispatch = useDispatch()
    const house = useSelector(getHouse)
    const page = sessionStorage.getItem('page')
    useEffect(() => {
        dispatch(getHousesTC(id))
    }, [dispatch, id])
    return <div className={s.container}>

        {house && <Card className={s.house}>
            <CardContent>
                <Typography variant="h4" component="h1">
                    {house.name}
                </Typography>
                <p>
                    {house.titles}
                </p>
                <p>
                    <b>Region:</b>{house.region}
                </p>
                <p>
                    <b>Coat of Arms:</b>{house.coatOfArms}
                </p>

                <p>
                    <b>Seats:</b> {house.seats}
                </p>
                <p>
                    <b>Has died out :</b> {house.diedOut ? house.diedOut : 'No'}
                </p>
                <p>
                    <b>The Lord's House :</b> {house.overlord ?
                    <NavLink
                        to={`${PATH.houses}/${house.overlord.substr(house.overlord.length - 3, 3).replace(/[^\d.-]/g, '')}`}>
                        <HomeIcon color={"action"}/>

                    </NavLink>
                    : 'No'}
                </p>
                <p>
                    <b>Number of Cadet Branches:</b> {house.swornMembers.length}
                </p>

                <div className={s.back}>

                    <NavLink to={`${PATH.characters + '/'}${page ? page : '1'}`}>
                        <KeyboardBackspaceIcon fontSize={"large"}/>
                    </NavLink>
                </div>
            </CardContent>

        </Card>}
    </div>
}

export default Houses;