// src/Pages/Auth/Login.tsx
import { useForm, type SubmitHandler } from "react-hook-form";
import { useLoginUserMutation } from "../../Features/Login/LoginAPI";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../Features/Login/UserSlice"; 
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner"; 
import {
  FaEnvelope,
  FaLock,
  FaSpinner,
  FaGraduationCap,
  FaIdCard,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useState } from "react";

/* =============================
   TYPES
============================= */
type LoginInputs = {
  email: string;
  password: string;
  kcseIndex?: string; // optional for admins
};

/* =============================
   COMPONENT
============================= */
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'student' | 'admin'>('student');

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
      const payload: LoginInputs = {
        email: data.email.trim(),
        password: data.password,
        ...(userType === 'student' && data.kcseIndex ? { kcseIndex: data.kcseIndex.trim() } : {}),
      };

      const response = await loginUser(payload).unwrap();

      dispatch(
        loginSuccess({
          token: response.token,
          user: {
            userID: response.user.userID,
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

      if (response.user.role === "student") navigate("/student/dashboard");
      else if (response.user.role === "university_admin") navigate("/university/dashboard");
      else navigate("/admin/dashboard");
    } catch (error: any) {
      toast.error(
        error?.data?.message || error?.error || "Invalid login credentials"
      );
    }
  };

  /* =============================
     UI
  ============================= */
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 text-white p-12">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <FaGraduationCap className="text-3xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">UniCluster Kenya</h1>
              <p className="text-blue-100 text-sm mt-1">
                Smart University Placement System
              </p>
            </div>
          </div>

          <div className="mb-8 bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20">
            <p className="text-lg opacity-90 mb-4">
              Turning KCSE Results into University Opportunities
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">🎯</span>
                </div>
                <span>One application for multiple universities</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">📊</span>
                </div>
                <span>Algorithm-based fair placement</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">⚡</span>
                </div>
                <span>Instant admission notifications</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white/10 rounded-xl">
            <p className="text-sm opacity-90">
              <span className="font-semibold">Note:</span> Students need their KCSE Index Number to login. 
              University/Admin users login with email only.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-white/20">
          <p className="text-sm opacity-80">
            Trusted by 30+ universities across Kenya
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 px-6">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/30">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FaGraduationCap className="text-2xl text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Welcome Back
              </h2>
            </div>
            <p className="text-gray-600">
              Sign in to access your UniCluster dashboard
            </p>
          </div>

          {/* User Type Selector */}
          <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-xl">
            <button
              type="button"
              onClick={() => setUserType('student')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                userType === 'student' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Student Login
            </button>
            <button
              type="button"
              onClick={() => setUserType('admin')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                userType === 'admin' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Admin/University Login
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Email Address *
              </label>
              <div className="relative group">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-gray-600 transition-colors" />
                <input
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  className={`w-full pl-12 pr-4 py-3.5 border rounded-xl transition-all duration-200
                    focus:outline-none focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500
                    hover:border-gray-400 placeholder:text-gray-400
                    ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Password *
              </label>
              <div className="relative group">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-gray-600 transition-colors" />
                <input
                  {...register("password", { required: "Password is required" })}
                  type={showPassword ? "text" : "password"}
                  className={`w-full pl-12 pr-12 py-3.5 border rounded-xl transition-all duration-200
                    focus:outline-none focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500
                    hover:border-gray-400 placeholder:text-gray-400
                    ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* KCSE INDEX (Only for Students) */}
            {userType === 'student' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  KCSE Index Number *
                </label>
                <div className="relative group">
                  <FaIdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  <input
                    {...register("kcseIndex", { 
                      required: userType === 'student' ? "KCSE Index Number is required for students" : false
                    })}
                    type="text"
                    className={`w-full pl-12 pr-4 py-3.5 border rounded-xl transition-all duration-200
                      focus:outline-none focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500
                      hover:border-gray-400 placeholder:text-gray-400
                      ${errors.kcseIndex ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter your KCSE Index Number"
                  />
                </div>
                <div className="flex items-start gap-2 mt-2 text-xs text-gray-500">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span>Enter the KCSE Index Number you used during registration</span>
                </div>
                {errors.kcseIndex && (
                  <p className="text-sm text-red-600 flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    {errors.kcseIndex.message}
                  </p>
                )}
              </div>
            )}

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link 
                to="/forgot-password" 
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 
                hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 
                text-white font-semibold py-3.5 px-8 rounded-xl 
                transition-all duration-300 flex justify-center items-center gap-3 
                shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <FaGraduationCap className="text-sm group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              New to UniCluster?{" "}
              <Link 
                to="/register" 
                className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-1 group"
              >
                Create student account
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </p>
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm text-blue-700 flex items-start gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>
                  <strong>Need help?</strong> Contact support if you're having trouble logging in 
                  or if you're a university/admin user.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;