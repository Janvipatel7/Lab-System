import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState({ email: "", password: "" });
  const { user, handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="w-16 h-16 border-4 border-white border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input.email.trim() === "" || input.password.trim() === "") {
      toast.error("Enter all details correctly!");
      setInput({ email: "", password: "" });
      return;
    }

    try {
      const res = await handleLogin(input.email, input.password);
      if (res) {
        toast.success("Login successful!");
        setInput({ email: "", password: "" });
        navigate("/");
      }
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
      setInput({ email: "", password: "" });
    }
  };

  return (
    <div className="bg-black h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-[90%] max-w-[480px]">
        <h1 className="text-4xl text-center mb-10 text-black font-bold">
          Lab Login
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-black"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              value={input.email}
              onChange={(e) =>
                setInput({ ...input, [e.target.id]: e.target.value })
              }
              placeholder="admin@gmail.com"
              className="bg-transparent border border-black text-black text-base rounded-lg focus:ring-black focus:border-black block w-full p-3 placeholder-gray-500"
            />
          </div>

          <div className="mb-8">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-black"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              value={input.password}
              onChange={(e) =>
                setInput({ ...input, [e.target.id]: e.target.value })
              }
              placeholder="password" 
              className="bg-transparent border border-black text-black text-base rounded-lg focus:ring-black focus:border-black block w-full p-3 placeholder-gray-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold rounded-lg text-base px-5 py-3 hover:bg-gray-900 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
