import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/stores/AutProvider";
export default function LoginPage() {
  const { setUser } = useContext(AuthContext);

  const handleOnEmployeeeLogin = (role, id) => {
    setUser(id, role);
  };
  return (
    <main className="bg-primary text-accent flex h-screen flex-1 flex-col gap-3 overflow-hidden p-5 lg:flex-col">
      <span> LoginPage</span>
      <Link
        className="btn"
        to="/admin"
        onClick={() => handleOnEmployeeeLogin("ADMN", 5)}
        replace
      >
        Admin
      </Link>
      <Link
        className="btn"
        to="/employee"
        onClick={() => handleOnEmployeeeLogin("PROWARE", 57732)}
        replace
      >
        Employee Proware
      </Link>
      <Link
        className="btn"
        to="/employee"
        onClick={() => handleOnEmployeeeLogin("PAMO", 66677)}
        replace
      >
        Employee Pamo
      </Link>
      <Link
        className="btn"
        to="/employee"
        onClick={() => handleOnEmployeeeLogin("PR&PAMO", 5)}
        replace
      >
        Employee Both
      </Link>
      <Link className="btn" to="/" replace>
        User
      </Link>
    </main>
  );
}
