import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  GraduationCap, BookOpen, Users, Award, ArrowRight, 
  CheckCircle, Clock, Shield, TrendingUp, FileCheck,
  Sparkles, Target, Globe, Zap, Star, ChevronRight,
  ShieldCheck, TrendingUp as TrendingUpIcon, Users as UsersIcon
} from "lucide-react";
import heroImage from "../../assets/images/hero.jpg";

const Hero = () => {
  const stats = [
    { value: "10K+", label: "Students Placed", icon: <Users className="h-5 w-5" />, color: "from-blue-500 to-cyan-500" },
    { value: "50+", label: "Universities", icon: <GraduationCap className="h-5 w-5" />, color: "from-purple-500 to-pink-500" },
    { value: "98%", label: "Success Rate", icon: <Award className="h-5 w-5" />, color: "from-green-500 to-emerald-500" },
    { value: "200+", label: "Courses", icon: <BookOpen className="h-5 w-5" />, color: "from-orange-500 to-red-500" },
  ];

  const processSteps = [
    {
      step: "1",
      title: "Register & Verify",
      description: "Create account with your KCSE index number",
      icon: <FileCheck className="h-5 w-5" />,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100"
    },
    {
      step: "2",
      title: "Choose Courses",
      description: "Select up to 5 preferred university courses",
      icon: <BookOpen className="h-5 w-5" />,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100"
    },
    {
      step: "3",
      title: "Smart Matching",
      description: "AI matches you based on KCSE points & preferences",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "from-green-500 to-green-600",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100"
    },
    {
      step: "4",
      title: "Get Placed",
      description: "Receive admission letter instantly",
      icon: <CheckCircle className="h-5 w-5" />,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-gradient-to-br from-orange-50 to-orange-100"
    }
  ];

  const benefits = [
    { 
      icon: <ShieldCheck className="h-5 w-5" />, 
      text: "Guaranteed fair placement based on merit",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    { 
      icon: <Clock className="h-5 w-5" />, 
      text: "Real-time application status updates",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    { 
      icon: <GraduationCap className="h-5 w-5" />, 
      text: "Digital admission letters",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    { 
      icon: <UsersIcon className="h-5 w-5" />, 
      text: "Connect with fellow placed students",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const universities = [
    "University of Nairobi", "Kenyatta University", "Egerton University", 
    "JKUAT", "Moi University", "MMUST", "Maseno University", "Technical University of Kenya"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-indigo-50/20">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-purple-200/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-0 w-80 h-80 bg-gradient-to-tr from-cyan-100/20 to-blue-100/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-gradient-to-tl from-purple-100/20 to-pink-100/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 py-16 lg:py-20">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold"
            >
              <Sparkles className="h-4 w-4" />
              Official KUCCPS Partner Platform
              <Star className="h-3 w-3 text-yellow-500" />
            </motion.div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
              Your Journey to 
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mt-2">
                University Starts Here
              </span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              UniCluster Kenya transforms the university placement process with intelligent 
              AI-powered matching, real-time tracking, and seamless transitions from high school 
              to higher education. Join thousands of successful students today!
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`bg-gradient-to-br ${stat.color} p-4 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-white/80">{stat.icon}</div>
                  </div>
                  <div className="text-xs font-medium text-white/90">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  Start Your Journey
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:text-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Globe className="h-4 w-4" />
                  How It Works
                </Link>
              </motion.div>
            </div>

            {/* Quick Info Banner */}
            <div className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Application Deadline</p>
                  <p className="text-xs text-gray-600">March 31, 2024 • Apply now to secure your spot!</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Hero Image & Features */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Hero Image */}
            <div className="relative w-full h-[350px] lg:h-[400px] rounded-3xl overflow-hidden shadow-2xl group">
              <img
                src={heroImage}
                alt="UniCluster Kenya - Student Placement Platform"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                style={{ objectPosition: "center" }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent"></div>
              
              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                <div className="text-white">
                  <div className="text-xl lg:text-2xl font-bold mb-2 drop-shadow-lg">
                    Connecting Students to Their Future
                  </div>
                  <div className="text-sm opacity-90">
                    Powered by intelligent AI placement algorithms
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits Cards */}
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`${benefit.bgColor} rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300`}
                >
                  <div className={`${benefit.color} mb-2`}>{benefit.icon}</div>
                  <p className="text-sm text-gray-700 font-medium">{benefit.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Process Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
              <Target className="h-4 w-4" />
              Simple 4-Step Process
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Your Path to University Placement
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Follow these simple steps from registration to receiving your admission letter
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className={`${step.bgColor} rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
              >
                {/* Step Badge */}
                <div className="absolute top-4 right-4">
                  <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-xs font-bold text-gray-700">
                    {step.step}
                  </div>
                </div>

                <div className={`h-12 w-12 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white mb-4`}>
                  {step.icon}
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{step.description}</p>

                <div className="text-xs font-medium text-gray-500 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {index === 0 ? "5 mins" : index === 1 ? "15 mins" : index === 2 ? "24-48 hrs" : "Instant"}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Process Completion Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-10 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100 shadow-lg"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Average Placement Time</h4>
                  <p className="text-sm text-gray-600">Complete your application in under 30 minutes</p>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">24-48 hours</div>
                <div className="text-sm text-gray-600">From application to admission</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Universities Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Leading Universities
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Our placement system is officially recognized and integrated with major Kenyan universities
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {universities.map((uni, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 text-center group"
              >
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-sm font-medium text-gray-800">{uni}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 lg:p-12">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-purple-500/20 animate-gradient-shift"></div>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-semibold mb-6"
            >
              <Zap className="h-4 w-4" />
              Limited Time Offer
            </motion.div>

            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Begin Your University Journey?
            </h2>
            
            <p className="text-blue-100/90 max-w-2xl mx-auto text-lg mb-8">
              Join thousands of successful students who found their perfect university match 
              through UniCluster Kenya's intelligent placement system.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300"
                >
                  <TrendingUpIcon className="h-5 w-5" />
                  Start Free Registration
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                >
                  Already have an account? Login
                </Link>
              </motion.div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Secure & Encrypted</span>
              </div>
              <div className="h-4 w-px bg-white/30"></div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>24/7 Support</span>
              </div>
              <div className="h-4 w-px bg-white/30"></div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>100% Free for Students</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animation */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 15s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;