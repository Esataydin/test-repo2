import { Card } from 'react-bootstrap';
import LoginForm from './components/LoginForm';
import LoginForm3 from './components/LoginForm3';
import { Link } from 'react-router-dom';
import PageMetaData from '@/components/PageMetaData';
import AuthLayout from '../components/AuthLayout';
import { useEffect } from 'react';
const SignIn = () => {

//   useEffect(() => {
//     getNotes();
// }, []);

// const getNotes = () => {
//     api
//         .get("/api/notes/")
//         .then((res) => res.data)
//         .then((data) => {
//             console.log('api succes',data);
//         })
//         .catch((err) => console.log('api',err));
// };
  return <>
      <PageMetaData title='Sign In' />
      <AuthLayout>
        <Card className="card-body text-center p-4 p-sm-5">
          <h1 className="mb-2">Sign in</h1>
          <p className="mb-0">
            Don&apos;t have an account?<Link to="/auth/sign-up"> Click here to sign up</Link>
          </p>
          <LoginForm />
          {/* <LoginForm3 /> */}
        </Card>
      </AuthLayout>
    </>;
};
export default SignIn;