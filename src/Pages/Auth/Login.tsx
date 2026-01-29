// src/Pages/Auth/Login.tsx
import { useForm, type SubmitHandler, type FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { loginAPI } from '../../Features/Login/LoginAPI';
import { loginSuccess } from '../../Features/Login/UserSlice';

type LoginInputs = {
  email: string;
  password: string;
  kcseIndex?: string;
};

// ==== Yup Schema ====
const schema: yup.ObjectSchema<LoginInputs> = yup.object({
  email: yup
    .string()
    .email('Invalid email')
    .max(100, 'Max 100 characters')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Min 6 characters')
    .max(255, 'Max 255 characters')
    .required('Password is required'),
  kcseIndex: yup.string().optional(),
});

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const emailFromState = (location.state as { email?: string })?.email ?? '';

  const [loginUser, { isLoading }] = loginAPI.useLoginUserMutation();

  // ==== UseForm ====
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: yupResolver(schema) as any, // <-- Type fix for optional field
    defaultValues: {
      email: emailFromState,
      password: '',
      kcseIndex: '',
    },
    mode: 'onChange',
  });

  // ==== Submit Handler ====
  const onSubmit = async (data: LoginInputs) => {
    try {
      const response = await loginUser(data).unwrap();

      if (!response?.token || !response?.user) throw new Error('Invalid server response.');

      const { userID, firstname, lastname, email, role, kcseIndex, image_url } = response.user;

      // Save user + token to Redux
      dispatch(
        loginSuccess({
          token: response.token,
          user: {
            userID,
            firstname,
            lastname,
            email,
            role,
            kcseIndex,
            image_url: image_url ?? '',
          },
        })
      );

      toast.success('Login successful!');

      // Redirect based on role
      if (role === 'student') navigate('/dashboard');
      else if (role === 'university_admin') navigate('/university/dashboard');
      else navigate('/admin/dashboard');
    } catch (err: any) {
      const message =
        err?.data?.message || err?.error || err?.message || 'Login failed. Please check your credentials.';
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 text-white p-12">
        <div>
          <h1 className="text-3xl font-bold mb-2">UniCluster Kenya</h1>
          <p className="text-blue-100 mb-6">Smart University Placement System</p>

          <div className="mb-8 bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20">
            <p className="text-lg opacity-90 mb-4">Turning KCSE Results into University Opportunities</p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">🎯</div>
                <span>One application for multiple universities</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">📊</div>
                <span>Algorithm-based fair placement</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">⚡</div>
                <span>Instant admission notifications</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white/10 rounded-xl">
            <p className="text-sm opacity-90">
              <span className="font-semibold">Note:</span> Students must enter KCSE Index Number. Admin/University login uses email only.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-white/20">
          <p className="text-sm opacity-80">Trusted by 30+ universities across Kenya</p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 px-6">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/30">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-600">Sign in to access your UniCluster dashboard</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="user@example.com"
                {...register('email')}
                aria-invalid={!!errors.email}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200`}
              />
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                {...register('password')}
                aria-invalid={!!errors.password}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200`}
              />
              {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">KCSE Index Number</label>
              <input
                type="text"
                placeholder="1234567890/2023"
                {...register('kcseIndex')}
                aria-invalid={!!errors.kcseIndex}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.kcseIndex ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200`}
              />
              {errors.kcseIndex && <p className="text-sm text-red-600 mt-1">{errors.kcseIndex.message}</p>}
            </div>

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-teal-600 hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
            >
              {isLoading ? 'Authenticating...' : 'Login'}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="text-center space-y-3">
            <p className="text-gray-600">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="text-teal-600 font-medium hover:underline">
                Register here
              </Link>
            </p>
            <p className="text-gray-600">
              <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm hover:underline">
                Back to Home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
