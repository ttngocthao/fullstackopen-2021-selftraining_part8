import React from 'react'
import {gql,useQuery} from '@apollo/client'
const Authors = (props) => {
  
  const ALL_AUTHORS = gql`
      query {       
        allAuthors {
             name
             born
             bookCount
        }       
      }
  `
  const {data} = useQuery(ALL_AUTHORS)
  const authors = data ? data.allAuthors : []

  if (!props.show) {
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

    </div>
  )
}

export default Authors
