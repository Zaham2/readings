import React, { useEffect } from 'react'


const Search = () => {

    const [searchText, setSearchText] = React.useState('')
    const [motoon, setMotoon] = React.useState({})
    const [found, setFound] = React.useState([])

    useEffect(() => {

        setSearchText('')
        setMotoon(getAllMotoon())

    }, [])

    // useEffect(() => {
    //     setFound(searchForBayt())
    // }, [searchText])

    useEffect(() => {
        searchForBayt()
    }, [searchText])

    const getAllMotoon = async () => {

        const motoonTemp = await fetch(process.env.REACT_APP_BACKEND_API + '/api/matn')
            .then(response => response.json())
        setMotoon(motoonTemp)

    }

    const onChanged = async (event) => {
        setSearchText(event.target.value)
        // await searchForBayt()
    }


    const formSubmitAction = async (event) => {

        event.preventDefault()
        // if (!motoon) {
        //     getAllMotoon()
        // }
    }

    const searchForBayt = async () => {

        // console.log('found')
        // console.log('motoon')
        // console.log(Object.values(motoon))
        console.log(typeof motoon)
        console.log(JSON.stringify(motoon))
        return fetch(process.env.REACT_APP_BACKEND_API + '/api/bayt/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ searchText: searchText })
        })
            .then(response => response.json())
            .then(data => setFound(data))

        // return found;
    }

    return (

        <div>
            <h1>Search</h1>
            <form onSubmit={formSubmitAction}>
                <input type='text' onChange={onChanged} placeholder='search for a word' />
                <input type='submit' value='search' />
                {Object.values(found).map((bayt, index) => {
                    return (
                        <div key={index}>
                            <h2>{bayt.normalizedBayt}</h2>
                        </div>
                    )
                })}
            </form>
        </div>

    )
}

export default Search

