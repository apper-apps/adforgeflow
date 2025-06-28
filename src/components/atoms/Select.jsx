import { motion } from 'framer-motion'

const Select = ({ 
  label, 
  options = [], 
  error, 
  className = '', 
  required = false,
  ...props 
}) => {
  return (
    <motion.div 
      className={`space-y-2 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        className={`
          w-full px-4 py-3 border border-gray-300 rounded-xl
          focus:ring-4 focus:ring-primary-100 focus:border-primary-500
          transition-all duration-300 form-input
          text-gray-900 bg-white
          ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : ''}
        `}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <motion.p 
          className="text-sm text-red-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  )
}

export default Select