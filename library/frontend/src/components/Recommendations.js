import { useQuery } from '@apollo/client'
import React,{useState} from 'react'
import BookTable from './BookTable'
import {ME,ALL_BOOKS} from '../queries'

const Recommendations = ({show}) => {
   const {data: { me } = {}}=useQuery(ME)||{}
   const {data: {allBooks}= []} = useQuery(ALL_BOOKS) || {}
  
    if(!show){
        return null
    }
   
    return (
        <div>
            <h2>Recommendations</h2>
            {me && me.username}
            <p>Books in your favourite genre patterns</p>
            <BookTable booksDisplay={allBooks.filter(b=>b.genres.indexOf(me.favoriteGenre)>-1)}/>
        </div>
    )
}

export default Recommendations
