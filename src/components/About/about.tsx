import { motion } from "framer-motion";
import { 
  BookOpen, Users, GraduationCap, Award, 
  Shield, Cpu, Bell, FileText, Download,
  CheckCircle, Clock, BarChart3, Target,
  Zap, Globe, Heart, Rocket, ChevronRight,
  Database, UserPlus, ListChecks, Eye,
  Brain, Megaphone, PartyPopper, ArrowRight
} from "lucide-react";
import { useState } from "react";

const About = () => {
  const [activeAct, setActiveAct] = useState(0);

  const acts = [
    {
      act: "ACT 1",
      title: "System Preparation",
      description: "Admin prepares the system by adding universities, courses, and uploading KCSE results",
      icon: <Database className="h-6 w-6" />,
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      details: [
        "Add universities & courses",
        "Set cut-off points & slots",
        "Upload student KCSE results"
      ]
    },
    {
      act: "ACT 2",
      title: "Student Registration",
      description: "Students create accounts and access their personalized dashboards",
      icon: <UserPlus className="h-6 w-6" />,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      details: [
        "Register with KCSE index",
        "View personal dashboard",
        "See KCSE points & status"
      ]
    },
    {
      act: "ACT 3",
      title: "Course Selection",
      description: "Students choose their dream courses in order of preference",
      icon: <ListChecks className="h-6 w-6" />,
      color: "bg-gradient-to-r from-green-500 to-emerald-500",
      details: [
        "Browse available courses",
        "Select 5 preferences",
        "Submit choices securely"
      ]
    },
    {
      act: "ACT 4",
      title: "University Review",
      description: "Universities monitor applications and prepare for incoming students",
      icon: <Eye className="h-6 w-6" />,
      color: "bg-gradient-to-r from-orange-500 to-red-500",
      details: [
        "View applicant lists",
        "Monitor student KCSE points",
        "Track available slots"
      ]
    },
    {
      act: "ACT 5",
      title: "AI Placement",
      description: "Intelligent algorithm matches students to courses based on merit",
      icon: <Brain className="h-6 w-6" />,
      color: "bg-gradient-to-r from-yellow-500 to-amber-500",
      details: [
        "Sort by KCSE points",
        "Match with preferences",
        "Automatic slot allocation"
      ]
    },
    {
      act: "ACT 6",
      title: "Results Release",
      description: "Results are published and notifications sent to all stakeholders",
      icon: <Megaphone className="h-6 w-6" />,
      color: "bg-gradient-to-r from-indigo-500 to-violet-500",
      details: [
        "Instant notifications",
        "University admission lists",
        "Real-time updates"
      ]
    },
    {
      act: "ACT 7",
      title: "Success Celebration",
      description: "Students access admission letters and prepare for university life",
      icon: <PartyPopper className="h-6 w-6" />,
      color: "bg-gradient-to-r from-rose-500 to-pink-500",
      details: [
        "Download admission letters",
        "View placement details",
        "Start university journey"
      ]
    }
  ];

  const stats = [
    { value: "Fair", label: "Merit-based Placement", icon: <Shield className="h-6 w-6" /> },
    { value: "Fast", label: "24-48 Hour Results", icon: <Clock className="h-6 w-6" /> },
    { value: "Transparent", label: "Real-time Tracking", icon: <BarChart3 className="h-6 w-6" /> },
    { value: "Digital", label: "Paperless Process", icon: <FileText className="h-6 w-6" /> },
  ];

  const team = [
    { role: "Students", description: "Apply, choose preferences, and receive placement", icon: "👨‍🎓", color: "bg-blue-100" },
    { role: "Universities", description: "Offer courses and monitor applications", icon: "🏛️", color: "bg-purple-100" },
    { role: "Admin", description: "Manage system and ensure fair placement", icon: "👨‍💼", color: "bg-green-100" },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative container mx-auto px-4 py-16 lg:py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-semibold mb-6">
            <Rocket className="h-4 w-4" />
            The Future of University Placement
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Welcome to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block">
              UniCluster Kenya
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            A revolutionary platform transforming the university placement process through 
            intelligent matching, real-time tracking, and seamless transitions from high 
            school to higher education.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-md border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <div className="text-blue-600">{stat.icon}</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-600">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* The Journey - Compact Design */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Your Journey Through UniCluster
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Follow the simple steps from application to admission. Transparent, fair, and efficient.
            </p>
          </div>

          {/* Compact Timeline */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            {/* Act Selector - Compact Horizontal */}
            <div className="flex overflow-x-auto pb-4 mb-6 scrollbar-hide">
              {acts.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActiveAct(index)}
                  className={`flex-shrink-0 mr-4 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeAct === index 
                      ? `${item.color} text-white shadow-md` 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{item.act.split(' ')[1]}</span>
                    <span className="hidden sm:inline">{item.title.split(' ')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Active Act Content */}
            <motion.div
              key={activeAct}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${acts[activeAct].color}`}>
                  <div className="text-white">{acts[activeAct].icon}</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-sm font-semibold text-gray-500">
                        {acts[activeAct].act}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900">
                        {acts[activeAct].title}
                      </h3>
                    </div>
                    <div className="text-sm text-gray-500">
                      Step {activeAct + 1} of 7
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {acts[activeAct].description}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {acts[activeAct].details.map((detail, i) => (
                      <div 
                        key={i} 
                        className="bg-gray-50 rounded-lg p-3 flex items-start gap-2"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="text-sm font-medium text-gray-900">
                  {Math.round(((activeAct + 1) / acts.length) * 100)}% Complete
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((activeAct + 1) / acts.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className={`h-full ${acts[activeAct].color}`}
                />
              </div>
              <div className="flex justify-between mt-1">
                <button
                  onClick={() => setActiveAct(prev => Math.max(0, prev - 1))}
                  disabled={activeAct === 0}
                  className="text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50"
                >
                  ← Previous
                </button>
                <button
                  onClick={() => setActiveAct(prev => Math.min(acts.length - 1, prev + 1))}
                  disabled={activeAct === acts.length - 1}
                  className="text-sm text-blue-600 hover:text-blue-700 disabled:opacity-50"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Team Roles */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              How Everyone Fits In
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              UniCluster brings together students, universities, and administrators seamlessly.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className={`h-12 w-12 rounded-full ${member.color} flex items-center justify-center text-2xl mb-4`}>
                  {member.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{member.role}</h3>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Success Story */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 lg:p-8 mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white text-purple-700 rounded-full text-sm font-semibold mb-4">
                <Heart className="h-4 w-4" />
                Success Story
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                Meet Ian: From Application to Admission
              </h2>
              <p className="text-gray-600">
                See how Ian successfully navigated the UniCluster placement process
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Student</div>
                      <div className="font-bold">Ian Kamau</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600">KCSE 2023 • 85 Points</div>
                </div>
                
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-2 text-sm">Dream Choices</h4>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                      <span>1. Computer Science - UoN</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                      <span>2. Computer Science - KU</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <span>3. IT - Egerton University</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">Placement Result</h3>
                      <div className="inline-flex items-center gap-2 mt-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        <CheckCircle className="h-3 w-3" />
                        ADMITTED 🎉
                      </div>
                    </div>
                    <div className="text-2xl">🎓</div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-600">University</div>
                      <div className="font-bold text-blue-700 text-sm">Kenyatta University</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-600">Course</div>
                      <div className="font-bold text-purple-700 text-sm">Computer Science</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div className="text-xs text-gray-600">KCSE: 85 • Cut-off: 65</div>
                    <button className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold rounded-lg hover:shadow-sm">
                      <Download className="h-3 w-3" />
                      Admission Letter
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-3 text-sm">Journey Timeline</h4>
                  <div className="flex items-center justify-between">
                    {[
                      { step: "Registered", date: "Jan 15" },
                      { step: "Applied", date: "Jan 20" },
                      { step: "Processing", date: "Jan 25" },
                      { step: "Admitted", date: "Jan 27" },
                    ].map((item, index) => (
                      <div key={index} className="text-center">
                        <div className="h-6 w-6 rounded-full bg-green-500 text-white text-xs flex items-center justify-center mx-auto mb-1">
                          ✓
                        </div>
                        <div className="text-xs font-medium">{item.step}</div>
                        <div className="text-xs text-gray-500">{item.date}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your University Journey?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Join thousands of successful students who found their perfect university match through UniCluster Kenya.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <BookOpen className="h-4 w-4" />
              Start Your Application
            </button>
            
            <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:text-blue-600 transition-all duration-300 shadow-sm">
              <Globe className="h-4 w-4" />
              Explore Universities
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;