import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRegisterUserMutation } from "../../Features/users/UsersApi";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaSpinner,
  FaUser,
  FaPhone,
  FaSchool,
  FaIdCard,
  FaGraduationCap,
  FaFlag,
  FaVenusMars,
  FaArrowRight,
  FaMapMarkerAlt,
  FaAward,
  FaGlobeAfrica,
  FaUniversity,
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

/* =============================
   FORM TYPES
============================= */
type RegisterInputs = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  gender: string;
  citizenship: string;
  highSchool: string;
  kcseIndex: string;
};

/* =============================
   DUMMY DATA WITH FLAG EMOJIS
============================= */
const citizenshipOptions = [
  { value: "", label: "🌍 Select Citizenship", flag: "🌍" },
  { value: "Kenyan", label: "🇰🇪 Kenyan", flag: "🇰🇪" },
  { value: "Tanzanian", label: "🇹🇿 Tanzanian", flag: "🇹🇿" },
  { value: "Ugandan", label: "🇺🇬 Ugandan", flag: "🇺🇬" },
  { value: "Rwandan", label: "🇷🇼 Rwandan", flag: "🇷🇼" },
  { value: "Burundian", label: "🇧🇮 Burundian", flag: "🇧🇮" },
  { value: "Ethiopian", label: "🇪🇹 Ethiopian", flag: "🇪🇹" },
  { value: "Somali", label: "🇸🇴 Somali", flag: "🇸🇴" },
  { value: "South Sudanese", label: "🇸🇸 South Sudanese", flag: "🇸🇸" },
  { value: "Other East African", label: "🌍 Other East African", flag: "🌍" },
  { value: "Other African", label: "🌍 Other African", flag: "🌍" },
  { value: "Non-African", label: "🌎 Non-African", flag: "🌎" },
];

const genderOptions = [
  { value: "", label: "👤 Select Gender" },
  { value: "Male", label: "👨 Male" },
  { value: "Female", label: "👩 Female" },
  { value: "Other", label: "🙂 Prefer not to say" },
];

/* =============================
   VALIDATION SCHEMA
============================= */
const schema: yup.ObjectSchema<RegisterInputs> = yup.object({
  email: yup.string().email("Please enter a valid email address").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phoneNumber: yup.string().optional(),
  gender: yup.string().required("Please select your gender"),
  citizenship: yup.string().required("Please select your citizenship"),
  highSchool: yup.string().required("High school name is required"),
  kcseIndex: yup
    .string()
    .matches(/^\d{10}\/\d{4}$/, "Format: School Index / Year (e.g., 1234567890/2023)")
    .required("KCSE Index Number is required"),
});

/* =============================
   COMPONENT
============================= */
function Register() {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  
  // State for show/hide password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    try {
      // Call the registration API
      const result = await registerUser({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        // student fields included in user registration
        kcseIndex: data.kcseIndex,
        meanGrade: "C+",
        agp: 46,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        citizenship: data.citizenship,
        highSchool: data.highSchool,
      } as any).unwrap();

      toast.success("🎉 Registration successful! Please verify your email.");

      // ✅ REDIRECT TO VERIFY PAGE WITH EMAIL STATE
      navigate("/verify", { 
        state: { 
          email: data.email,
          firstName: data.firstName 
        } 
      });

    } catch (error: any) {
      const message =
        error?.data?.message ||
        error?.error ||
        "Registration failed. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2000')] bg-cover bg-center opacity-5" />
      
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/30">
        {/* Left Panel - Story & Benefits */}
        <div className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white p-8 lg:p-12 flex flex-col overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          
          <div className="relative z-10 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <FaGraduationCap className="text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">UniCluster Kenya</h1>
                <p className="text-blue-100 text-sm mt-1">
                  Transforming KCSE Results into University Dreams
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex-1 space-y-8">
            <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
                <FaAward className="text-yellow-300" />
                Your Academic Gateway
              </h2>
              <p className="text-blue-100">
                We bridge the gap between your KCSE performance and university admission. 
                Our intelligent system matches you with the best-fit universities across Kenya.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-lg flex items-center gap-2">
                <FaCheckCircle className="text-green-300" />
                Why Choose UniCluster?
              </h3>
              <div className="space-y-3">
                {[
                  { icon: "🎯", text: "One application for all public & private universities" },
                  { icon: "📊", text: "Algorithm-based matching for fair placement" },
                  { icon: "⚡", text: "Instant admission notifications" },
                  { icon: "📱", text: "Mobile-friendly portal access" },
                  { icon: "🏛️", text: "Direct connection to university portals" },
                  { icon: "🎓", text: "Track progress through each placement stage" }
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3 group">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-all">
                      <span className="text-sm">{benefit.icon}</span>
                    </div>
                    <span className="text-blue-100 group-hover:text-white transition-colors">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/20">
              <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                <div className="p-3 bg-white/20 rounded-lg">
                  <FaUniversity className="text-xl" />
                </div>
                <div>
                  <p className="font-medium">Partner Universities</p>
                  <p className="text-sm text-blue-100">
                    30+ universities participating in our system
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-8 pt-6 border-t border-white/20">
            <p className="text-sm text-blue-100">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="text-white font-medium hover:underline inline-flex items-center gap-2 group"
              >
                Sign in to your dashboard
                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
              </Link>
            </p>
          </div>
        </div>

        {/* Right Panel - Registration Form */}
        <div className="p-8 lg:p-12">
          <div className="mb-10">
            <div className="inline-flex items-center gap-3 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-4">
              <FaGlobeAfrica />
              <span className="text-sm font-medium">Open to East African Students</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              Create Your Student Profile
            </h1>
            <p className="text-gray-600">
              Complete this form to begin your university placement journey. 
              All fields marked with * are required.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            {/* Section 1: Personal Information */}
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
                </div>
                <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Section 1 of 3
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="First Name *" 
                  icon={<FaUser className="text-gray-400" />} 
                  placeholder="Enter your first name"
                  {...register("firstName")} 
                  error={errors.firstName?.message}
                />
                <Input 
                  label="Last Name *" 
                  icon={<FaUser className="text-gray-400" />} 
                  placeholder="Enter your last name"
                  {...register("lastName")} 
                  error={errors.lastName?.message}
                />
                
                <div className="md:col-span-2">
                  <Input 
                    label="Email Address *" 
                    icon={<FaEnvelope className="text-gray-400" />} 
                    placeholder="student@example.com"
                    {...register("email")} 
                    error={errors.email?.message}
                    helpText="This will be your login username and verification email"
                  />
                </div>
                
                <Input 
                  label="Phone Number" 
                  icon={<FaPhone className="text-gray-400" />} 
                  placeholder="+254 7XX XXX XXX"
                  {...register("phoneNumber")} 
                  helpText="For university communication (optional)"
                />
                
                <Select 
                  label="Gender *" 
                  icon={<FaVenusMars className="text-gray-400" />}
                  {...register("gender")} 
                  error={errors.gender?.message}
                  options={genderOptions}
                />
                
                <Select 
                  label="Citizenship *" 
                  icon={<FaFlag className="text-gray-400" />}
                  {...register("citizenship")} 
                  error={errors.citizenship?.message}
                  options={citizenshipOptions}
                />
              </div>
            </div>

            {/* Section 2: Academic Information */}
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-8 bg-gradient-to-b from-green-500 to-green-600 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-800">Academic Information</h3>
                </div>
                <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Section 2 of 3
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Input 
                    label="High School Name *" 
                    icon={<FaSchool className="text-gray-400" />} 
                    placeholder="e.g., Alliance High School, Nairobi School"
                    {...register("highSchool")} 
                    error={errors.highSchool?.message}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Input 
                    label="KCSE Index Number *" 
                    icon={<FaIdCard className="text-gray-400" />} 
                    placeholder="School Index / Year"
                    {...register("kcseIndex")} 
                    error={errors.kcseIndex?.message}
                    helpText="Format: School Index / Year (e.g., 1234567890/2023)"
                  />
                  <div className="mt-2 text-xs text-gray-500 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>Enter your KCSE index exactly as it appears on your certificate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>Format: <strong>10-digit school index</strong> / <strong>4-digit year</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Account Security */}
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-8 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-800">Account Security</h3>
                </div>
                <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Section 3 of 3
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PasswordInput 
                  label="Password *" 
                  showPassword={showPassword}
                  onToggle={() => setShowPassword(!showPassword)}
                  {...register("password")} 
                  error={errors.password?.message}
                  helpText="Minimum 6 characters with letters and numbers"
                />
                <PasswordInput 
                  label="Confirm Password *" 
                  showPassword={showConfirmPassword}
                  onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                  {...register("confirmPassword")} 
                  error={errors.confirmPassword?.message}
                  helpText="Must match the password above"
                />
              </div>
            </div>

            {/* Submit Section */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <div className="text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    Your data is secure and encrypted
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  Already registered?{" "}
                  <Link to="/login" className="text-blue-600 font-medium hover:underline">
                    Sign In
                  </Link>
                </p>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex justify-center items-center gap-3 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>Processing Registration...</span>
                  </>
                ) : (
                  <>
                    <span>Complete Registration</span>
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm text-blue-700 flex items-start gap-2">
                  <FaCheckCircle className="text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>After registration, you'll be redirected to verify your email address. Check your inbox for the verification link.</span>
                </p>
              </div>
              
              <p className="text-center text-xs text-gray-500 mt-4">
                By clicking "Complete Registration", you agree to our{" "}
                <Link to="/terms" className="text-blue-600 hover:underline font-medium">
                  Terms of Service
                </Link>
                {" "}and acknowledge our{" "}
                <Link to="/privacy" className="text-blue-600 hover:underline font-medium">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* =============================
   INPUT COMPONENT
============================= */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  helpText?: string;
}

function Input({ label, icon, error, helpText, className, ...rest }: InputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative group">
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-gray-600 transition-colors">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full ${icon ? 'pl-12' : 'pl-4'} pr-4 py-3.5 border rounded-xl
            transition-all duration-200 bg-white
            focus:outline-none focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500
            hover:border-gray-400
            ${error ? 'border-red-500' : 'border-gray-300'}
            placeholder:text-gray-400
            ${className}
          `}
          {...rest}
        />
      </div>
      {error ? (
        <p className="text-sm text-red-600 flex items-center gap-2 animate-fadeIn">
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          {error}
        </p>
      ) : helpText ? (
        <p className="text-xs text-gray-500 mt-1">{helpText}</p>
      ) : null}
    </div>
  );
}

/* =============================
   PASSWORD INPUT COMPONENT WITH SHOW/HIDE TOGGLE
============================= */
interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  showPassword: boolean;
  onToggle: () => void;
  error?: string;
  helpText?: string;
}

function PasswordInput({ label, showPassword, onToggle, error, helpText, className, ...rest }: PasswordInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-gray-600 transition-colors">
          <FaLock />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          className={`
            w-full pl-12 pr-12 py-3.5 border rounded-xl
            transition-all duration-200 bg-white
            focus:outline-none focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500
            hover:border-gray-400
            ${error ? 'border-red-500' : 'border-gray-300'}
            placeholder:text-gray-400
            ${className}
          `}
          {...rest}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {error ? (
        <p className="text-sm text-red-600 flex items-center gap-2 animate-fadeIn">
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          {error}
        </p>
      ) : helpText ? (
        <p className="text-xs text-gray-500 mt-1">{helpText}</p>
      ) : null}
    </div>
  );
}

/* =============================
   SELECT COMPONENT (UPDATED WITH FLAGS SUPPORT)
============================= */
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  options: { value: string; label: string; flag?: string }[];
}

function Select({ label, icon, error, options, className, ...rest }: SelectProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative group">
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-gray-600 transition-colors">
            {icon}
          </div>
        )}
        <select
          className={`
            w-full ${icon ? 'pl-12' : 'pl-4'} pr-10 py-3.5 border rounded-xl appearance-none
            transition-all duration-200 bg-white cursor-pointer
            focus:outline-none focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500
            hover:border-gray-400
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${className}
          `}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-2 animate-fadeIn">
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          {error}
        </p>
      )}
    </div>
  );
}

export default Register;