// @new - Command Center main page with dashboard redirect
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CommandCenterPage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/command-center/dashboard', { replace: true });
  }, [navigate]);
  
  return null;
}