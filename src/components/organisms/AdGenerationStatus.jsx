import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProgressBar from '@/components/molecules/ProgressBar'
import Card from '@/components/atoms/Card'
import ApperIcon from '@/components/ApperIcon'

const AdGenerationStatus = ({ isGenerating, onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [currentStage, setCurrentStage] = useState(0)

  const stages = [
    { name: 'Analyzing your business', icon: 'Brain' },
    { name: 'Creating visual concepts', icon: 'Palette' },
    { name: 'Writing compelling copy', icon: 'PenTool' },
    { name: 'Finalizing designs', icon: 'Sparkles' }
  ]

  useEffect(() => {
    if (!isGenerating) {
      setProgress(0)
      setCurrentStage(0)
      return
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 8 + 2
        
        // Update stage based on progress
        if (newProgress >= 75 && currentStage < 3) setCurrentStage(3)
        else if (newProgress >= 50 && currentStage < 2) setCurrentStage(2)
        else if (newProgress >= 25 && currentStage < 1) setCurrentStage(1)
        
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => onComplete(), 1000)
          return 100
        }
        
        return newProgress
      })
    }, 300)

    return () => clearInterval(interval)
  }, [isGenerating, currentStage, onComplete])

  if (!isGenerating) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <Card className="w-full max-w-md p-8 text-center">
        <motion.div
          className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <ApperIcon name="Zap" className="text-white" size={32} />
        </motion.div>

        <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
          Creating your perfect ad
        </h3>
        <p className="text-gray-600 mb-8">
          Our AI is working its magic to generate compelling designs just for you.
        </p>

        <ProgressBar progress={Math.round(progress)} className="mb-8" />

        <div className="space-y-4">
          {stages.map((stage, index) => (
            <motion.div
              key={index}
              className={`
                flex items-center space-x-3 p-3 rounded-lg transition-all duration-300
                ${index <= currentStage 
                  ? 'bg-gradient-to-r from-primary-50 to-accent-50 text-primary-700' 
                  : 'text-gray-400'
                }
              `}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${index <= currentStage 
                  ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white' 
                  : 'bg-gray-200 text-gray-400'
                }
              `}>
                {index < currentStage ? (
                  <ApperIcon name="Check" size={16} />
                ) : (
                  <ApperIcon name={stage.icon} size={16} />
                )}
              </div>
              <span className="text-sm font-medium">{stage.name}</span>
              {index === currentStage && (
                <motion.div
                  className="ml-auto"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="w-2 h-2 bg-primary-500 rounded-full" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}

export default AdGenerationStatus