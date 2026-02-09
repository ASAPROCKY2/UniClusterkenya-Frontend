import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { loginAPI } from '../../Features/Login/LoginAPI';
import { loginSuccess } from '../../Features/Login/UserSlice';

/* =========================
   TYPES
========================= */
type LoginInputs = {
  email: string;
  password: string;
  kcseIndex?: string;
};

/* =========================
   VALIDATION SCHEMA
========================= */
const schema: yup.ObjectSchema<LoginInputs> = yup.object({
  email: yup
    .string()
    .email('Invalid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Minimum 6 characters')
    .required('Password is required'),
  kcseIndex: yup.string().optional(),
});

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const emailFromState = (location.state as { email?: string })?.email ?? '';

  const [loginUser, { isLoading }] = loginAPI.useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      email: emailFromState,
      password: '',
      kcseIndex: '',
    },
  });

  /* =========================
     SUBMIT HANDLER
  ========================= */
  const onSubmit = async (data: LoginInputs) => {
    try {
      const response = await loginUser(data).unwrap();

      if (!response?.token || !response?.user) {
        throw new Error('Invalid server response');
      }

      const {
        userID,
        firstname,
        lastname,
        email,
        role,
        kcseIndex,
        image_url,
      } = response.user;

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

      toast.success('Login successful');

      /* =========================
         FIXED ROLE REDIRECT
      ========================= */
      if (role === 'student') {
        navigate('/dashboard');
      } else if (role === 'university_admin' || role === 'system_admin') {
        navigate('/admin/dashboard');
      } else {
        toast.error('Unauthorized role');
        navigate('/');
      }
    } catch (err: any) {
      toast.error(
        err?.data?.message ||
          err?.message ||
          'Login failed. Please check your credentials.'
      );
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* =========================
          LEFT PANEL (INFO)
      ========================= */}
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 text-white p-12">
        <div>
          <h1 className="text-3xl font-bold">UniCluster Kenya</h1>
          <p className="text-blue-100 mt-1">
            Smart University Placement System
          </p>

          <div className="mt-10 bg-white/10 p-6 rounded-2xl border border-white/20">
            <p className="text-lg mb-4 opacity-90">
              Turning KCSE Results into University Opportunities
            </p>

            <ul className="space-y-3 text-sm">
              <li className="flex gap-3"><span>🎯</span>One application for multiple universities</li>
              <li className="flex gap-3"><span>📊</span>Fair, algorithm-based placement</li>
              <li className="flex gap-3"><span>⚡</span>Instant admission notifications</li>
            </ul>
          </div>

          <div className="mt-10">
            <p className="font-semibold mb-3">How UniCluster Works</p>
            <div className="space-y-2 text-sm opacity-90">
              <p>1. Submit KCSE results</p>
              <p>2. Smart programme matching</p>
              <p>3. University placement</p>
              <p>4. Admission notification</p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-white/10 rounded-xl text-sm">
            <strong>Note:</strong> Students must enter KCSE Index Number.  
            Admin & University users log in with email only.
          </div>
        </div>

        <div className="pt-6 border-t border-white/20 text-sm opacity-80">
          Trusted by 30+ universities across Kenya
        </div>
      </div>

      {/* =========================
          RIGHT PANEL (LOGIN)
      ========================= */}
      <div className="flex items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-600">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                {...register('email')}
                className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500"
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                {...register('password')}
                className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500"
              />
              {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                KCSE Index Number (Students)
              </label>
              <input
                type="text"
                {...register('kcseIndex')}
                className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-teal-600">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg"
            >
              {isLoading ? 'Authenticating...' : 'Login'}
            </button>
          </form>

          <div className="my-6 text-center text-gray-500">or</div>

          <div className="text-center space-y-3 text-sm">
            <p>
              Don&apos;t have an account?{' '}
              <Link to="/register" className="text-teal-600 font-medium">
                Register here
              </Link>
            </p>
            <Link to="/" className="text-gray-500 hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
