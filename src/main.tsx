import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/tapnseek/:cond",
    element: (
      <App />
    ),
  }]
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  //  <App />
  <RouterProvider router={router} />
  // </React.StrictMode>,
)
