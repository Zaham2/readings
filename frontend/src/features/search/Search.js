import React, { useEffect } from 'react'


const Search = () => {

    const [searchText, setSearchText] = React.useState('ابحث عن بيت')
    const [motoon, setMotoon] = React.useState([])

    useEffect(() => {

        setMotoon('')

    }, [])

    const getAllMotoon = async () => { 
        
        setMotoon(await fetch(process.env.REACT_APP_BACKEND_API+'/api/matn')
            .then(response => response.json()))

        }

    const onChanged = (event) => {
        setSearchText(event.target.value)
    }


    const formSubmitAction = async (event) => {

        event.preventDefault()
        if(!motoon) {
            getAllMotoon()
        }
    }

    const searchForBayt = async () => {

        const baseUrl = process.env.REACT_APP_BACKEND_API || 'http://localhost:3010'
        const response = await fetch(baseUrl+'/api/matn/search', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({searchText})
        })
        const body = await response.json()
        console.log(body)
        setMotoon(body)
    }

  return (

    <div>
        <h1>Search</h1>
        <form onSubmit={formSubmitAction}>
            <input type='text' onChange={onChanged} placeholder='search for a word' />
            <input type='submit' value='search' />
            <p>{motoon}</p>
        </form>
    </div>

  )
}

export default Search

