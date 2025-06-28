import { motion } from 'framer-motion'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'

const AdFormatCard = ({ format, isSelected, onSelect }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onSelect}
    >
      <Card 
        className={`
          p-6 cursor-pointer transition-all duration-300
          ${isSelected 
            ? 'border-2 border-primary-500 bg-gradient-to-br from-primary-50 to-white shadow-xl' 
            : 'border border-gray-200 hover:border-primary-300 hover:shadow-lg'
          }
        `}
      >
        <div className="text-center space-y-4">
          <div 
            className={`
              mx-auto rounded-lg border-2 border-dashed flex items-center justify-center text-gray-400
              ${format.dimensions.width > format.dimensions.height ? 'w-20 h-12' : 'w-12 h-20'}
            `}
            style={{
              aspectRatio: `${format.dimensions.width}/${format.dimensions.height}`
            }}
          >
            {format.dimensions.width}×{format.dimensions.height}
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">{format.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{format.description}</p>
            <Badge variant="primary" size="sm">
              {format.platform}
            </Badge>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default AdFormatCard