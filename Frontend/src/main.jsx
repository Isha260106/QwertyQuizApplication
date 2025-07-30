import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider} from "react-router"
import App from './App.jsx'
// import CreateQuiz from './components/CreateQuiz.jsx'
import ViewResult from './components/ViewResult.jsx'
import Question from './components/Question.jsx'
import AdminQuizBuilder from './components/AdminQuizBuilder.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Login from './components/login.jsx'

const router=createBrowserRouter([
    {path : '/',
    element : <Login/>},
    {
      path : '/createQuiz',
      element : <AdminQuizBuilder/>,
    },
    {
      path : '/question',
      element : <Question/>,
    },
    {
      path : '/viewResults',
      element : <ViewResult/>,
    }
  
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
