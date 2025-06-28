import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const StepIndicator = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between w-full max-w-md mx-auto mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <motion.div
            className={`
              flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
              ${index <= currentStep 
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 border-primary-500 text-white' 
                : 'bg-white border-gray-300 text-gray-400'
              }
            `}
            initial={{ scale: 0.8 }}
            animate={{ scale: index === currentStep ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {index < currentStep ? (
              <ApperIcon name="Check" size={16} />
            ) : (
              <span className="text-sm font-semibold">{index + 1}</span>
            )}
          </motion.div>
          
          {index < steps.length - 1 && (
            <div 
              className={`
                w-16 h-0.5 mx-2 transition-all duration-300
                ${index < currentStep ? 'bg-primary-500' : 'bg-gray-300'}
              `}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default StepIndicator