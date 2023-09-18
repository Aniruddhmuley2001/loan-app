import React from 'react'
import UserForm from './UserForm'

export default function AddUserData() {
  return (
    <div><UserForm url="http://localhost:7000/saveUser" /></div>
  )
}
