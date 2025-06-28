import { motion } from 'framer-motion'

const Loading = ({ message = "Loading amazing content..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-6">
      <motion.div
        className="relative w-16 h-16"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-primary-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-600"></div>
      </motion.div>
      
      <div className="text-center">
        <motion.h3
          className="text-lg font-semibold text-gray-900 mb-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {message}
        </motion.h3>
        <p className="text-gray-600">
          Please wait while we prepare everything for you
        </p>
      </div>

      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-primary-500 rounded-full"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Loading