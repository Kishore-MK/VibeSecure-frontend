export const LoginButton = () => {
    return (
      <a
        href="http://localhost:5000/auth/github"
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Login with GitHub
      </a>
    );
  };