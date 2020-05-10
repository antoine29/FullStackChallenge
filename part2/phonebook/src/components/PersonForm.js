import React from 'react'

const PersonForm = ({
  handleNewName,
  newName, handleNameChange,
  newNumber, handleNumberChange}) => {
  return(
    <form onSubmit={handleNewName}>
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <td>name</td>
            <td><input value={newName} onChange={handleNameChange}/></td>
          </tr>
          <tr>
            <td>number</td>
            <td><input value={newNumber} onChange={handleNumberChange}/></td>
          </tr>
          <tr>
            <td>
              <button type="submit">add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  )
}

export default PersonForm