import React from 'react'
import ChatBot from './components/ChatBot'
import Login from './components/Login'

export default function Userlogin() {
  return (
    <div>
      <Login typeofUser="User"></Login>
      <ChatBot/>
    </div>
  )
}
