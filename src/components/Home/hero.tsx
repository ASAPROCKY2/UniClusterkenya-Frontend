import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Users, Award, ArrowRight, CheckCircle, Clock, Shield, TrendingUp, FileCheck } from "lucide-react";
import heroImage from "../../assets/images/hero.jpg"; // ✅ Import hero image

const Hero = () => {
  const stats = [
    { value: "10K+", label: "Students Placed", icon: <Users className="h-6 w-6" /> },
    { value: "50+", label: "Universities", icon: <GraduationCap className="h-6 w-6" /> },
    { value: "98%", label: "Success Rate", icon: <Award className="h-6 w-6" /> },
    { value: "200+", label: "Courses", icon: <BookOpen className="h-6 w-6" /> },
  ];

  const processSteps = [
    {
      step: "1",
      title: "Register & Verify",
      description: "Create account with your KCSE index number",
      icon: <FileCheck className="h-5 w-5" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      step: "2",
      title: "Choose Courses",
      description: "Select up to 5 preferred university courses",
      icon: <BookOpen className="h-5 w-5" />,
      color: "from-purple-500 to-purple-600"
    },
    {
      step: "3",
      title: "Smart Matching",
      description: "Our AI matches you based on KCSE points & preferences",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "from-green-500 to-green-600"
    },
    {
      step: "4",
      title: "Get Placed",
      description: "Receive admission letter instantly",
      icon: <CheckCircle className="h-5 w-5" />,
      color: "from-orange-500 to-orange-600"
    }
  ];

  const benefits = [
    { icon: <Shield className="h-5 w-5" />, text: "Guanteed fair placement based on merit" },
    { icon: <Clock className="h-5 w-5" />, text: "Real-time application status updates" },
    { icon: <GraduationCap className="h-5 w-5" />, text: "Digital admission letters" },
    { icon: <Users className="h-5 w-5" />, text: "Connect with fellow placed students" }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content - Enhanced with more student-focused info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 lg:pr-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              <CheckCircle className="h-4 w-4" />
              Official KUCCPS Partner Platform
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Your Journey to 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block">
                University Starts Here
              </span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              UniCluster Kenya transforms the university placement process with intelligent 
              matching, real-time tracking, and seamless transitions from high school 
              to higher education. Join thousands of successful students today!
            </p>

            {/* Student Benefits */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-3">Why Choose UniCluster?</h3>
              <div className="space-y-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="text-blue-600 mt-0.5">{benefit.icon}</div>
                    <span className="text-sm text-gray-700">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats - Moved up for better hierarchy */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="flex justify-center mb-1 text-blue-600">
                    {stat.icon}
                  </div>
                  <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  Start Your Journey
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:text-blue-600 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  How It Works
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 10v4a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </Link>
              </motion.div>
            </div>

            {/* Quick Info Banner */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-800">Application Deadline</p>
                  <p className="text-xs text-gray-600">March 31, 2024 • Apply now to secure your spot!</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Enhanced with placement process */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Hero Image Container */}
            <div className="relative w-full h-[350px] lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src={heroImage}
                alt="UniCluster Kenya - Student Placement Platform"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                style={{ objectPosition: "center" }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-lg lg:text-xl font-bold drop-shadow-lg mb-1">
                  Connecting Students to Their Future
                </div>
                <div className="text-sm opacity-90">
                  Powered by intelligent placement algorithms
                </div>
              </div>
            </div>

            {/* Placement Process Steps */}
            <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100">
              <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                4-Step Placement Process
              </h3>
              
              <div className="space-y-4">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-3 group cursor-pointer"
                  >
                    <div className={`h-10 w-10 rounded-lg bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-800">{step.title}</h4>
                        <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          Step {step.step}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Process Completion Badge */}
              <div className="mt-6 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-800">Average Placement Time</p>
                    <p className="text-xs text-green-600">24-48 hours after application</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Preview */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-200">
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  I
                </div>
                <div>
                  <p className="text-sm text-gray-700 italic">
                    "UniCluster made my university placement stress-free! Got my first choice - Computer Science at KU!"
                  </p>
                  <p className="text-xs text-gray-600 mt-2 font-medium">— Ian, KCSE 2023 (85 points)</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 pt-10 border-t border-gray-200"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Trusted by leading universities across Kenya</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our placement system is officially recognized and integrated with major Kenyan universities
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {["University of Nairobi", "Kenyatta University", "Egerton University", "JKUAT", "Moi University", "MMUST"].map((uni, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -2 }}
                className="text-sm font-medium text-gray-700 bg-white px-5 py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                {uni}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Add custom animations to tailwind config */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Hero;