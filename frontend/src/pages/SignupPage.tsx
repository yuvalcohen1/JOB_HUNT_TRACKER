import { useNavigate } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import { useAuth } from "../context/AuthContext";

const FIELDS = [
  { name: "name", label: "Name", type: "text", placeholder: "Jane Smith" },
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
    placeholder: "At least 8 characters",
  },
];

export default function SignupPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (values: Record<string, string>) => {
    await register(values.email, values.password, values.name);
    navigate("/login");
  };

  return (
    <AuthForm
      title="Create your account"
      subtitle="Start tracking your job search"
      fields={FIELDS}
      submitLabel="Create account"
      onSubmit={handleSubmit}
      footerText="Already have an account?"
      footerLinkLabel="Sign in"
      footerLinkHref="/login"
    />
  );
}
