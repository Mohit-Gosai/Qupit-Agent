import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routes/Home.jsx'
import About from './routes/About.jsx'
import Service from './routes/Service.jsx'
import HowItWork from './routes/HowItWork.jsx'
import Template from './routes/Template.jsx'
import AuthenticationPage from './routes/AuthenticationPage.jsx'
import Community from './routes/Community.jsx'
import UserDashboard from './routes/UserDashboard.jsx'

const route = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path:"",
        element:<Home/>
      },
      {
        path:"About",
        element:<About/>
      },
      {
        path:"Service",
        element:<Service/>
      },
      {
        path:"how-it-works",
        element:<HowItWork/>
      },
      {
        path:"templates",
        element:<Template/>
      },
      {
        path:"community",
        element:<Community/>
      },
      {
        path:"login",
        element:<AuthenticationPage/>
      },
      {
        path: "dashboard",
        element:<UserDashboard/>
      }
    ]

  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={route}/>
  </StrictMode>,
)
