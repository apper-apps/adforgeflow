import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <motion.header 
        className="glass-effect border-b border-white/20 sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center">
                <ApperIcon name="Zap" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold gradient-text">
                  AdForge
                </h1>
                <p className="text-xs text-gray-600 -mt-1">AI-Powered Ad Generator</p>
              </div>
            </motion.div>

            <div className="flex items-center space-x-4">
              <motion.div 
                className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <a href="#features" className="hover:text-primary-600 transition-colors">Features</a>
                <a href="#templates" className="hover:text-primary-600 transition-colors">Templates</a>
                <a href="#pricing" className="hover:text-primary-600 transition-colors">Pricing</a>
              </motion.div>
              
              <motion.button 
                className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <motion.footer 
        className="glass-effect border-t border-white/20 mt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              © 2024 AdForge. Powered by AI to create stunning advertisements.
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

export default Layout