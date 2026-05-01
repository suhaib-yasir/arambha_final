import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Arambha LMS</h1>
      <p>Authentication Starter</p>
      <div>
        <Link to="/signup">
          <button>Signup</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
}
