import { useForm, type SubmitHandler } from "react-hook-form";
import { useLoginUserMutation } from "../../Features/Login/LoginAPI";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../Features/Login/UserSlice";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaSpinner, FaGraduationCap } from "react-icons/fa";

/* =============================
   TYPES
============================= */
type LoginInputs = {
  email: string;
  password: string;
};

/* =============================
   COMPONENT
============================= */
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  /* =============================
     SUBMIT HANDLER
  ============================= */
  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      const response = await loginUser(data).unwrap();

      // Store user + token in Redux
      dispatch(
  loginSuccess({
    token: response.token,
    user: {
      userID: response.user.userID, // ✅ matches your User type
      firstname: response.user.firstname,
      lastname: response.user.lastname,
      email: response.user.email,
      role: response.user.role,
      kcseIndex: response.user.kcseIndex,
      image_url: response.user.image_url,
    },
  })
);


      toast.success("Login successful 🎉");

      // ✅ Role-based redirect
      if (response.user.role === "student") {
        navigate("/student/dashboard");
      } else if (response.user.role === "university_admin") {
        navigate("/university/dashboard");
      } else {
        navigate("/admin/dashboard");
      }
    } catch (error: any) {
      const message =
        error?.data?.message ||
        error?.error ||
        "Invalid email or password";
      toast.error(message);
    }
  };

  /* =============================
     UI
  ============================= */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 justify-center">
          <FaGraduationCap className="text-3xl text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">UniCluster Login</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="relative mt-1">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative mt-1">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="••••••••"
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2 hover:from-blue-700 hover:to-purple-700 transition"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin" /> Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
