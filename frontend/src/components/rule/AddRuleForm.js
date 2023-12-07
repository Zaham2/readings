import React from 'react'


const AddRuleForm = () => {

  const [formData, setFormData] = React.useState(
    {
      name: '',
      description: ''
    }
  )

  const formSubmitAction = async (event) => {
    console.log('here')
    event.preventDefault()
    const data = new FormData(event.target)
    const value = Object.fromEntries(data.entries())
    const baseUrl = process.env.BACKEND_API || 'http://localhost:3010'
    console.log(value)
    const response = await fetch(baseUrl+'/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(value)
    })
    const body = await response.text()
    console.log(body)
  }

  const handleChange = (event) => {
    setFormData(
      {
        ...formData,
        [event.target.name]: event.target.value
      }
    )
  }
  

  return (
    <form onSubmit={formSubmitAction}>
        <label>
          Rule name
        </label>
        <input type="text" name="name" onChange={handleChange}/>
        <label>
            Rule description
        </label>
        <input type="textarea" name="description" placeholder='Insert Rule Desciption' onChange={handleChange}/>
        <button type="submit">Add rule</button>
    </form>
  )
}

export default AddRuleForm
