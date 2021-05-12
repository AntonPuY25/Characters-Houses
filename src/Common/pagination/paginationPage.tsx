import React, {ChangeEvent, useState} from 'react'
import {Redirect} from "react-router-dom"
import {Pagination} from "@material-ui/lab"
import s from './pagination.module.scss'
import {PATH} from "../../App";

type TypePagination = {
    id: string
}
const PaginationPage: React.FC<TypePagination> = ({id}) => {
    const [pages, setPages] = useState<string>(id || '1')
    return (
        <div className={s.pagination}>
            <Redirect to={PATH.characters + '/' + pages}/>
            <Pagination count={214} color="primary" page={+pages}
                        onChange={(event: ChangeEvent<unknown>, page: number) => {
                            sessionStorage.setItem('page', JSON.stringify(page))
                            setPages(page.toString())
                        }}/>
        </div>
    )
}
export default PaginationPage