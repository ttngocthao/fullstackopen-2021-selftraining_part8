import React from 'react'
import {useQuery,gql} from '@apollo/client'


const Books = (props) => {

  const ALL_BOOKS = gql `
    query {
       allBooks{
        title
        author
        published
      }
    }
  `

  const {data} = useQuery(ALL_BOOKS)
  const books = data ? data.allBooks :[]

  if (!props.show) {
    return null
  }
  
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books