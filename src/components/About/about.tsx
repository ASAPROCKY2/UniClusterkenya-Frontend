import { motion } from "framer-motion";
import { 
  BookOpen, Users, Award, 
  Shield, Cpu, Bell, FileText, Download,
  CheckCircle, Clock, BarChart3, Target,
  Zap, Globe, Heart, Rocket, ChevronRight,
  Database, UserPlus, ListChecks, Eye,
  Brain, Megaphone, PartyPopper,
  Sparkles, Target as TargetIcon, Lock, Users as UsersIcon,
  GraduationCap, Star, TrendingUp
} from "lucide-react";
import { useState } from "react";
import kamauImage from "../../assets/images/kamau.jpg";

const About = () => {
  const [activeAct, setActiveAct] = useState(0);

  const acts = [
    {
      act: "ACT 1",
      title: "System Preparation",
      description: "Admin prepares the system by adding universities, courses, and uploading KCSE results",
      icon: <Database className="h-5 w-5" />,
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      details: ["Add universities & courses", "Set cut-off points & slots", "Upload KCSE results"]
    },
    {
      act: "ACT 2",
      title: "Student Registration",
      description: "Students create accounts and access their personalized dashboards",
      icon: <UserPlus className="h-5 w-5" />,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      details: ["Register with KCSE index", "View personal dashboard", "See KCSE points & status"]
    },
    {
      act: "ACT 3",
      title: "Course Selection",
      description: "Students choose their dream courses in order of preference",
      icon: <ListChecks className="h-5 w-5" />,
      color: "bg-gradient-to-r from-green-500 to-emerald-500",
      details: ["Browse available courses", "Select 5 preferences", "Submit choices securely"]
    },
    {
      act: "ACT 4",
      title: "University Review",
      description: "Universities monitor applications and prepare for incoming students",
      icon: <Eye className="h-5 w-5" />,
      color: "bg-gradient-to-r from-orange-500 to-red-500",
      details: ["View applicant lists", "Monitor student KCSE points", "Track available slots"]
    },
    {
      act: "ACT 5",
      title: "AI Placement",
      description: "Intelligent algorithm matches students to courses based on merit",
      icon: <Brain className="h-5 w-5" />,
      color: "bg-gradient-to-r from-yellow-500 to-amber-500",
      details: ["Sort by KCSE points", "Match with preferences", "Automatic slot allocation"]
    },
    {
      act: "ACT 6",
      title: "Results Release",
      description: "Results are published and notifications sent to all stakeholders",
      icon: <Megaphone className="h-5 w-5" />,
      color: "bg-gradient-to-r from-indigo-500 to-violet-500",
      details: ["Instant notifications", "University admission lists", "Real-time updates"]
    },
    {
      act: "ACT 7",
      title: "Success Celebration",
      description: "Students access admission letters and prepare for university life",
      icon: <PartyPopper className="h-5 w-5" />,
      color: "bg-gradient-to-r from-rose-500 to-pink-500",
      details: ["Download admission letters", "View placement details", "Start university journey"]
    }
  ];

  const features = [
    { icon: <Shield className="h-5 w-5" />, title: "100% Fair", desc: "Merit-based placement system" },
    { icon: <Clock className="h-5 w-5" />, title: "24-48 Hours", desc: "Fast placement results" },
    { icon: <BarChart3 className="h-5 w-5" />, title: "Transparent", desc: "Real-time application tracking" },
    { icon: <FileText className="h-5 w-5" />, title: "Paperless", desc: "Digital process from start to finish" },
    { icon: <Lock className="h-5 w-5" />, title: "Secure", desc: "End-to-end encrypted data" },
    { icon: <TargetIcon className="h-5 w-5" />, title: "Accurate", desc: "AI-powered matching algorithm" },
  ];

  // Create a custom Building icon component since it's not in lucide-react
  const Building = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );

  const benefits = [
    {
      title: "For Students",
      items: ["Choose dream courses", "Track application status", "Get instant notifications", "Download admission letters"],
      icon: <GraduationCap className="h-6 w-6 text-blue-600" />,
      color: "bg-gradient-to-br from-blue-50 via-white to-blue-50",
      border: "border border-blue-100"
    },
    {
      title: "For Universities",
      items: ["Monitor applicants", "Set cut-off points", "Manage available slots", "Generate reports"],
      icon: <Building className="h-6 w-6 text-purple-600" />,
      color: "bg-gradient-to-br from-purple-50 via-white to-purple-50",
      border: "border border-purple-100"
    },
    {
      title: "For Admin",
      items: ["System configuration", "Result verification", "User management", "Analytics dashboard"],
      icon: <Users className="h-6 w-6 text-green-600" />,
      color: "bg-gradient-to-br from-green-50 via-white to-green-50",
      border: "border border-green-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-indigo-50/20">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Top Right Gradient Orb */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-purple-200/10 rounded-full blur-3xl"></div>
        
        {/* Center Left Orb */}
        <div className="absolute top-1/3 left-0 w-80 h-80 bg-gradient-to-tr from-cyan-100/20 to-blue-100/10 rounded-full blur-3xl"></div>
        
        {/* Bottom Right Orb */}
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-gradient-to-tl from-purple-100/20 to-pink-100/10 rounded-full blur-3xl"></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* Hero Section - Full Gradient */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-purple-500/20 animate-gradient-shift"></div>
        
        {/* Sparkle Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
        
        <div className="relative container mx-auto px-4 py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-sm font-semibold mb-8 hover:bg-white/20 transition-all duration-300 group cursor-default"
            >
              <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform" />
              The Future of University Placement is Here
              <Star className="h-3 w-3 ml-1 text-yellow-300" />
            </motion.div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Welcome to
              <span className="block bg-gradient-to-r from-cyan-300 via-white to-purple-300 bg-clip-text text-transparent mt-2">
                UniCluster Kenya
              </span>
            </h1>
            
            <p className="text-lg text-blue-100/90 leading-relaxed max-w-3xl mx-auto mb-10">
              A revolutionary platform transforming the university placement process through 
              intelligent AI matching, real-time tracking, and seamless transitions from high 
              school to higher education in Kenya.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl"
              >
                <BookOpen className="h-5 w-5" />
                Start Your Application
                <TrendingUp className="h-4 w-4 ml-1" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-transparent border-2 border-white/60 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm"
              >
                <Globe className="h-5 w-5" />
                Explore Universities
                <ChevronRight className="h-4 w-4 ml-1" />
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 text-white">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" opacity="1"></path>
          </svg>
        </div>
      </div>

      {/* Main Content with Gradient Backgrounds */}
      <div className="relative">
        {/* Features Grid */}
        <div className="container mx-auto px-4 -mt-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/60 hover:shadow-2xl hover:border-blue-200/50 transition-all duration-300 text-center group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-2">{feature.title}</h3>
                <p className="text-xs text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Journey Section */}
        <div className="bg-gradient-to-b from-white to-blue-50/50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                <TargetIcon className="h-4 w-4" />
                Step-by-Step Process
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Your 7-Step Journey to University
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Follow these simple steps from application to admission
              </p>
            </div>

            {/* Compact Timeline Selector */}
            <div className="flex overflow-x-auto gap-3 mb-8 pb-4 scrollbar-hide px-2">
              {acts.map((item, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveAct(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-shrink-0 px-5 py-3.5 rounded-xl transition-all duration-300 flex items-center gap-3 shadow-lg ${
                    activeAct === index 
                      ? `${item.color} text-white shadow-xl` 
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <span className="text-base font-medium">{item.icon}</span>
                  <div className="text-left">
                    <div className="text-xs font-semibold opacity-80">{item.act}</div>
                    <div className="font-semibold text-sm">{item.title.split(' ')[0]}</div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Active Step Content */}
            <motion.div
              key={activeAct}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-white to-blue-50/30 rounded-3xl shadow-2xl border border-white/60 p-8 backdrop-blur-sm"
            >
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className={`p-5 rounded-2xl ${acts[activeAct].color} flex-shrink-0 shadow-lg`}>
                  <div className="text-white text-3xl">{acts[activeAct].icon}</div>
                </div>
                <div className="flex-1">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-semibold text-gray-500 px-3 py-1 bg-gray-100 rounded-full">
                        {acts[activeAct].act}
                      </span>
                      <span className="text-sm font-medium text-blue-600 px-3 py-1 bg-blue-50 rounded-full">
                        Step {activeAct + 1} of 7
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {acts[activeAct].title}
                    </h3>
                    <p className="text-gray-600 mb-6 text-lg">
                      {acts[activeAct].description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {acts[activeAct].details.map((detail, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all"
                        >
                          <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{detail}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Progress & Navigation */}
                  <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Journey Progress</div>
                        <div className="text-2xl font-bold text-gray-900">{Math.round(((activeAct + 1) / acts.length) * 100)}%</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Current Step</div>
                        <div className="text-xl font-bold text-blue-600">{activeAct + 1} / {acts.length}</div>
                      </div>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-6">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${((activeAct + 1) / acts.length) * 100}%` }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className={`h-full ${acts[activeAct].color} rounded-full`}
                      />
                    </div>
                    <div className="flex justify-between">
                      <motion.button
                        onClick={() => setActiveAct(prev => Math.max(0, prev - 1))}
                        disabled={activeAct === 0}
                        whileHover={{ x: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 font-medium rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 transition-all"
                      >
                        ← Previous Step
                      </motion.button>
                      <motion.button
                        onClick={() => setActiveAct(prev => Math.min(acts.length - 1, prev + 1))}
                        disabled={activeAct === acts.length - 1}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        Next Step →
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-b from-blue-50/30 to-purple-50/30 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Benefits for Everyone
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                UniCluster creates value for all stakeholders in the placement ecosystem
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  className={`${benefit.color} ${benefit.border} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm`}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-white shadow-md">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{benefit.title}</h3>
                  </div>
                  <ul className="space-y-4">
                    {benefit.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Success Story */}
        <div className="bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-indigo-600/5 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
                <Heart className="h-4 w-4" />
                Real Success Story
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Meet Ian: From Application to Admission
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                See how a real student successfully navigated the UniCluster placement process
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-3xl shadow-2xl border border-white/60 overflow-hidden backdrop-blur-sm">
              <div className="p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Student Profile */}
                  <div className="lg:w-2/5">
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="relative">
                          <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-white shadow-xl">
                            <img 
                              src={kamauImage} 
                              alt="Ian Kamau" 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="absolute -bottom-1 -right-1 h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <Award className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Student Success</div>
                          <h3 className="text-xl font-bold text-gray-900">Ian Kamau</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                              KCSE 2023
                            </div>
                            <div className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                              85 Points
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Dream Course Choices</h4>
                          <div className="space-y-3">
                            {[
                              { rank: "1st", course: "Computer Science", uni: "University of Nairobi", color: "from-blue-500 to-cyan-500" },
                              { rank: "2nd", course: "Computer Science", uni: "Kenyatta University", color: "from-purple-500 to-pink-500" },
                              { rank: "3rd", course: "IT", uni: "Egerton University", color: "from-green-500 to-emerald-500" },
                            ].map((choice, i) => (
                              <div key={i} className="flex items-center gap-3 p-3 bg-white/80 rounded-xl border border-gray-100">
                                <div className={`h-8 w-8 rounded-lg bg-gradient-to-r ${choice.color} flex items-center justify-center text-white text-xs font-bold`}>
                                  {choice.rank}
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">{choice.course}</div>
                                  <div className="text-xs text-gray-600">{choice.uni}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Results Section */}
                  <div className="lg:w-3/5">
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-6 border border-emerald-100 shadow-lg">
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Placement Result</h3>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 rounded-full text-sm font-semibold">
                              <CheckCircle className="h-4 w-4" />
                              SUCCESSFULLY ADMITTED 🎉
                            </div>
                          </div>
                          <div className="text-3xl">🎓</div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border border-blue-100">
                            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">University</div>
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                                <Building className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <div className="font-bold text-blue-700 text-lg">Kenyatta University</div>
                                <div className="text-xs text-blue-600">Public • Nairobi</div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border border-purple-100">
                            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Course</div>
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                                <Cpu className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <div className="font-bold text-purple-700 text-lg">Computer Science</div>
                                <div className="text-xs text-purple-600">BSc • 4 Years</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                          <div>
                            <div className="text-sm text-gray-600 mb-1">Admission Details</div>
                            <div className="text-sm font-semibold text-gray-900">
                              KCSE: 85 Points • Cut-off: 65 Points • 20 Points Above
                            </div>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                          >
                            <Download className="h-4 w-4" />
                            Download Admission Letter
                          </motion.button>
                        </div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
                        <h4 className="font-bold text-gray-900 mb-5 text-lg">Application Journey Timeline</h4>
                        <div className="grid grid-cols-4 gap-4">
                          {[
                            { step: "Registered", date: "Jan 15", status: "Completed", icon: "📝" },
                            { step: "Applied", date: "Jan 20", status: "Submitted", icon: "🚀" },
                            { step: "Processing", date: "Jan 25", status: "In Review", icon: "⚙️" },
                            { step: "Admitted", date: "Jan 27", status: "Success", icon: "🎓" },
                          ].map((item, index) => (
                            <div key={index} className="text-center">
                              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center text-lg mx-auto mb-3">
                                {item.icon}
                              </div>
                              <div className="text-sm font-medium text-gray-900 mb-1">{item.step}</div>
                              <div className="text-xs text-gray-500 mb-1">{item.date}</div>
                              <div className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                item.status === 'Success' 
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : 'bg-blue-100 text-blue-700'
                              }`}>
                                {item.status}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5"></div>
          <div className="relative container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-6"
              >
                <Zap className="h-4 w-4" />
                Begin Your Journey Today
              </motion.div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Ready to Transform Your Future?
              </h2>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
                Join thousands of successful students who found their perfect university match 
                through UniCluster Kenya's intelligent placement system.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-semibold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300"
                >
                  <UsersIcon className="h-5 w-5" />
                  Start Free Registration
                  <ChevronRight className="h-4 w-4" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-300 hover:border-blue-400 hover:text-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <BookOpen className="h-5 w-5" />
                  View Live Demo
                  <Globe className="h-4 w-4" />
                </motion.button>
              </div>
              
              <p className="text-sm text-gray-500 mt-8">
                No credit card required • 100% free for students • Trusted by 50+ universities
              </p>
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

export default About;