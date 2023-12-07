import React from 'react'
// import 

const GetMatnForm = () => {

const [matn, setMatn] = React.useState('')

const BaytText = ({bayt}) => {
  return (<><br /><span className='bg-slate-50'>{bayt}</span><br /></>)
}

const formSubmitAction = async (event) => {

    event.preventDefault()
    await fetch(process.env.REACT_APP_BACKEND_API+'/api/matn/'+event.target[0].value)
        .then(response => response.json())
        .then(data => {console.log(data); setMatn(data); return matn})

}
  return (
    <form onSubmit={formSubmitAction}>
      <label>
        get matn
      </label>
      <br />
      <select>
        <option value="tayebah">tayebah</option>
        <option value="shatebeya">shatebeya</option>
        <option value="dorra">dorra</option>
      </select>
      <input type="submit" value="Get Matn" /> <br />
       {matn ? matn.map((bayt,index) => {
            return <BaytText key={'bayt'+index} bayt={bayt} />
       }): null}
    </form>
  )
}

export default GetMatnForm
