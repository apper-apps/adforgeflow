import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "Nothing here yet",
  message = "Get started by creating your first item.",
  actionLabel = "Get Started",
  onAction,
  icon = "Plus"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-12 text-center space-y-6"
    >
      <motion.div
        className="w-20 h-20 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        <ApperIcon name={icon} className="text-primary-600" size={36} />
      </motion.div>

      <div className="max-w-md">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-600">
          {message}
        </p>
      </div>

      {onAction && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={onAction}
            variant="primary"
            size="lg"
            className="inline-flex items-center"
          >
            <ApperIcon name={icon} size={20} />
            {actionLabel}
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Empty