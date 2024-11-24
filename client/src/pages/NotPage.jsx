import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function NotPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);
  return <main>Page Not Found</main>;
}
