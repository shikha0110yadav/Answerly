import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Question from './pages/Question';
import AskQuestion from './pages/AskQuestion';
import  ViewBlog  from './pages/ViewBlog';
import AddBlog from './pages/AddBlog';
import User from './pages/User';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {QuestionItem, fetchquestion} from './components/QuestionItem';
import {BlogItem, fetchblog} from './components/BlogItem';
import {Profile, fetchpersonalinfo } from './pages/Profile';
import {MyQuestions, fetchmyquestions} from './pages/MyQuestions';
import { fetchmyblogs, MyBlogs } from './pages/MyBlogs';
import { fetchmyanswers, MyAnswers } from './pages/MyAnswers';
import AuthContainer from './components/AuthContainer';

function App() {

  // const user = localStorage.getItem('user');
  // console.log(user);
  // var isset = user != null;

  const router = createBrowserRouter([
    {
      path:"/",
      element: <Home />
    },
    // {
    //   path:"/signup",
    //   element: <Signup />
    // },
    // {
    //   path:"/login",
    //   element:<Login />
    // },
    {
      path:"/auth",
      element:<AuthContainer />
    },
    {
      path:"/question",
      element:<Question />,
    },
    {
      path:"/question/:question_id",
      element:<QuestionItem />,
      loader:fetchquestion
    },
    {
      path:"/ask-a-question",
      element:  <AskQuestion />
    },
    {
      path:"/viva",
      element:<ViewBlog />
    },
    {
      path:"/share-viva-experience",
      element:<AddBlog />
    },
    {
      path:"/viva/:blog_id",
      element:<BlogItem />,
      loader:fetchblog
    },
    {
      path:"/users",
      element:<User />
    },
    {
      path:"/profile",
      element:<Profile />,
      loader:fetchpersonalinfo
    },
    {
      path:"/profile/myquestions",
      element:<MyQuestions />,
      loader:fetchmyquestions
    },
    {
      path:"/profile/myblogs",
      element:<MyBlogs />,
      loader:fetchmyblogs
    },
    {
      path:"/profile/myanswers",
      element:<MyAnswers />,
      loader:fetchmyanswers
    }
  ])
  return (
    <div className="App">
    <RouterProvider router={router} />
    </div>
  );
}

export default App;

