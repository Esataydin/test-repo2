import { currentYear, developedBy, developedByLink } from '@/context/constants';
import { Link } from 'react-router-dom';
import useSignIn from './useSignIn';
import TextFormInput from '@/components/form/TextFormInput';
import PasswordFormInput from '@/components/form/PasswordFormInput';
import { Button, FormCheck } from 'react-bootstrap';
import api from '../../../../../api/route';
const LoginForm2 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading2, setLoading] = useState(false);
  const {
    loading,
    login,
    control
  } = useSignIn();


  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
        const res = await api.post("/api/token", { email, password })
        if (method === "login") {
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            console.log("navigate to home")
        } else {
            console.log("navigate to login")
        }
    } catch (error) {
        alert(error)
    } finally {
        setLoading(false)
    }
};
  return <form className="mt-sm-4" onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Enter email" 
      value={email} onChange={(e) => setEmail(e.target.value)}
       className="mb-3 input-group-lg" />
      <div className="mb-3 position-relative">
        <input name="password" placeholder="Enter password" 
        value={password} onChange={(e) => setPassword(e.target.value)}
         className="w-100" />
      </div>
      <div className="mb-3 d-sm-flex justify-content-between">
        <div>
          <FormCheck type="checkbox" label="Remember me?" id="rememberCheck" />
        </div>
        <Link to="/auth/forgot-pass">Forgot password?</Link>
      </div>
      <div className="d-grid">
        <Button variant="primary" size="lg" type="submit" disabled={loading2}>
          Login
        </Button>
      </div>
      <p className="mb-0 mt-3">
        ©{currentYear}
        <Link target="_blank" to={developedByLink}>
          {developedBy}.
        </Link>
        All rights reserved
      </p>
    </form>;
};
export default LoginForm2;