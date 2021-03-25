import React,{useState} from 'react'

import {useMutation,useQuery} from '@apollo/client'
import {ALL_AUTHORS, EDIT_AUTHOR} from '../queries'

const Authors = ({show,token}) => {
  
  const [name,setName]=useState('')
  const [born,setBorn]= useState('')
 

  const {data} = useQuery(ALL_AUTHORS)

  const authors = data ? data.allAuthors : []
  const [editAuthor] = useMutation(EDIT_AUTHOR,
  {
    refetchQueries: [{query: ALL_AUTHORS}]
  })

  const updateAuthorHandle =async(e)=>{
    e.preventDefault()
   
   await editAuthor({variables:{name:name,born: parseInt(born)}})
   
    setName('')
    setBorn('')
  }

  if (!show) {
      return null
    }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors && authors.length!==0 && authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {token && <div>
        <h2>Set birth year</h2>
        <form onSubmit={updateAuthorHandle} >
           <label>name</label>
         
          <select onChange={(e)=>setName(e.target.value)} value={name}>
            <option value={0}>Select author</option>
            {authors.map(a=> <option key={a.name} value={a.name}>{a.name}</option>)}
          </select>
          <br/>
         
         
          <label>born</label>
          <input type='number' name='born' value={born} onChange={(e)=>setBorn(e.target.value)}/>
          <button type='submit'>Update author</button>
        </form>
      </div>}
      
    </div>
  )
}

export default Authors
