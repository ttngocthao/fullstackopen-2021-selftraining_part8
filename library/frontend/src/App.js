
import React, { useState } from 'react'
import {useApolloClient,useSubscription} from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'
import {BOOK_ADDED} from './queries'

const App = () => {
  const client = useApolloClient()
  const [page, setPage] = useState('authors')
  const [token,setToken] = useState(localStorage.getItem('library-user-token') ? localStorage.getItem('library-user-token') :null)
  useSubscription(BOOK_ADDED,{
    onSubscriptionData: ({subscriptionData})=>{
      alert('new book added')
      console.log(subscriptionData)
    }
  })
  const handleLogout =()=>{
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { token ? 
          <> 
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={()=>setPage('recommend')}>recommend</button>
            <button onClick={handleLogout}>logout</button>
          </> :  
          <button onClick={() => setPage('login')}>login</button>
        }       
      </div>

      <Authors
        show={page === 'authors'}
        token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login show={page === 'login'} setToken={setToken}/>

      <Recommendations show={token ? page==='recommend' : null} />

    </div>
  )
}

export default App