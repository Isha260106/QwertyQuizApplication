import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider} from "react-router"
import PrivateRoute from './components/Admin/PrivateRoute.jsx'
import ViewResult from './components/Admin/ViewResult.jsx'
import AdminQuizBuilder from './components/Admin/AdminQuizBuilder.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Login from './components/Admin/Login.jsx'
import UserLogin from './components/User/UserLogin.jsx'
import ShowAvailableQuizzes from './components/Admin/ShowAvailableQuizzes.jsx'
import GetQuiz from './components/User/GetQuiz.jsx'
import Feedback from './components/User/Feedback.jsx'
import AdminDashboard from './components/Admin/AdminDashboard.jsx'
import QuizContextProvider from './context/QuizContextProvider.jsx'
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
    },
    {
      path : '/userQuiz',
      element : <GetQuiz/>
    },
    {
      path : '/feedback',
      element : <Feedback/>
    },
    {
      path:'/adminDashboard',
      element: <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
    }
  
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QuizContextProvider>
    <RouterProvider router={router}/>
    </QuizContextProvider>
  </StrictMode>
)
