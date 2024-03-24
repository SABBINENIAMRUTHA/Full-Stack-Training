import "./App.css"
import { createBrowserRouter,RouterProvider} from "react-router-dom"
import RootLayout from "./RootLayout"
import Home from "./components/home/Home"
import Signup from "./components/signup/Signup"
import Signin from "./components/signin/Signin"
import About from "./components/about/About"
import UserProfile from"./components/user-profile/UserProfile";
import AuthorProfile from "./components/author-profile/AuthorProfile";
import AddArticle from "./components/add-article/AddArticle";
import ArticlesOfAuthor from "./components/articles-of-author/ArticlesOfAuthor";

function App(){
  //create browser router object
  const browserRouter = createBrowserRouter([
   //routing configuration
    {
        path:"",
        element:<RootLayout />,
        children:[
          {
            path:'',
        element:<Home />
      },
          {
            path:'signup',
        element:<Signup />
          },
          {
            path:'signin',
        element:<Signin />
          },
          {
            path:'about',
        element:<About />
          },
          {
            path:'user-profile',
            element:<UserProfile />
          },
          
          {
            path:'author-profile',
            element:<AuthorProfile />,
            children:[
              {
                path:'add-article',
                element:<AddArticle/>
              },
              {
                path:'article-of-author',
                element:<ArticlesOfAuthor/>
              }
            ]
          }
        ]
    },

  ]);


  return(
    <div>
      {/*providiing browser router to app */}
      <RouterProvider router={browserRouter} />
    </div>
  )
}

export default App;