import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider} from "react-router"
// import CreateQuiz from './components/CreateQuiz.jsx'
import ViewResult from './components/Admin/ViewResult.jsx'
import AdminQuizBuilder from './components/Admin/AdminQuizBuilder.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Login from './components/Admin/Login.jsx'
import UserLogin from './components/User/UserLogin.jsx'
import ShowAvailableQuizzes from './components/Admin/ShowAvailableQuizzes.jsx'

const router=createBrowserRouter([
    {path : '/',
    element : <UserLogin/>,
    },
    {path : '/adminLogin',
    element : <Login/>},
    {
      path : '/createQuiz',
      element : <AdminQuizBuilder/>,
    },
    {
      path : '/viewResults',
      element : <ViewResult/>,
    },{
      path : '/availableQuiz',
      element : <ShowAvailableQuizzes/>
    }
  
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
