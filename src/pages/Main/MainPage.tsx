import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <div>
      <h1>Main Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MainPage;