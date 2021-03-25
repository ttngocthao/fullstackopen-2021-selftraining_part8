import { useQuery } from '@apollo/client'
import React,{useState} from 'react'
import BookTable from './BookTable'
import {ME,ALL_BOOKS} from '../queries'

const Recommendations = ({show}) => {
   const {data: { me } = {}}=useQuery(ME)||{}
   //!filter using a graphql query to the server
   const {data: {allBooks}= []} = useQuery(ALL_BOOKS,{variables:{genre: me ? me.favoriteGenre : null}}) || {}
  
    if(!show){
        return null
    }
   
    return (
        <div>
            <h2>Recommendations</h2>
            {me && me.username}
            <p>Books in your favourite genre patterns</p>
            <BookTable booksDisplay={allBooks}/>
        </div>
    )
}

export default Recommendations
