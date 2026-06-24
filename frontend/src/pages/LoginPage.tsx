import { useNavigate } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import { useAuth } from "../context/AuthContext";

const FIELDS = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "••••••••",
  },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (values: Record<string, string>) => {
    await login(values.email, values.password);
    navigate("/");
  };

  return (
    <AuthForm
      title="Welcome back"
      subtitle="Sign in to your job search board"
      fields={FIELDS}
      submitLabel="Sign in"
      onSubmit={handleSubmit}
      footerText="Don't have an account?"
      footerLinkLabel="Sign up"
      footerLinkHref="/signup"
    />
  );
}
