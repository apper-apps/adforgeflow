import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const TagInput = ({ label, value = [], onChange, placeholder, maxTags = 10 }) => {
  const [inputValue, setInputValue] = useState('')

  const addTag = () => {
    if (inputValue.trim() && !value.includes(inputValue.trim()) && value.length < maxTags) {
      onChange([...value, inputValue.trim()])
      setInputValue('')
    }
  }

  const removeTag = (tagToRemove) => {
    onChange(value.filter(tag => tag !== tagToRemove))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="border border-gray-300 rounded-xl p-3 focus-within:ring-4 focus-within:ring-primary-100 focus-within:border-primary-500 transition-all duration-300">
        <div className="flex flex-wrap gap-2 mb-2">
          <AnimatePresence>
            {value.map((tag, index) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="inline-flex items-center gap-1 bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-primary-600 hover:text-primary-800 transition-colors"
                >
                  <ApperIcon name="X" size={14} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="flex-1 outline-none placeholder-gray-400"
            disabled={value.length >= maxTags}
          />
          {inputValue.trim() && (
            <motion.button
              type="button"
              onClick={addTag}
              className="text-primary-600 hover:text-primary-800 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ApperIcon name="Plus" size={16} />
            </motion.button>
          )}
        </div>
      </div>
      
      <p className="text-sm text-gray-500">
        {value.length}/{maxTags} tags
      </p>
    </div>
  )
}

export default TagInput