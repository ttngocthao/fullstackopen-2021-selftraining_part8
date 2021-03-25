import React,{useState,useEffect} from 'react'
import {useQuery} from '@apollo/client'
import {ALL_BOOKS} from '../queries'
import BookTable from './BookTable'

const Books = (props) => {
  const [showAll,setShowAll]= useState(true)
  const [filter,setFilter]= useState(null)
  const {data} = useQuery(ALL_BOOKS)
  const books = data ? data.allBooks :[]

  const getAllGenres = (books)=>{   
    //?extract genres from each book
    // const genres = books.map(b=>[...b.genres])
    const genres = books.reduce((newArr,currentVal)=>{
      newArr.push(...currentVal.genres)
      return newArr
    },[])
    
    //?get rid the duplication
    const uniqueGenres = new Set(genres)
    //?return the list without duplication
    return Array.from(uniqueGenres)
  }

  const genreFilter =(genre)=>{
    if(genre){
      setFilter(genre)
      setShowAll(false)
    }else{     
      setFilter(null)
      setShowAll(true)
    }
  
  }

  if(!props.show){
    return null
  }

  const booksDisplay = showAll ? books : books.filter(i=>i.genres.indexOf(filter)>-1)
  
  return (
    <div>
      <h2>books</h2>

      <BookTable booksDisplay={booksDisplay}/>

      <div>
        {books && getAllGenres(books).map((g,i)=><button key={i} onClick={()=>genreFilter(g)}>{g}</button>)}
        <button onClick={()=>genreFilter()}>all generes</button>
      </div>
    </div>
  )
}

export default Books