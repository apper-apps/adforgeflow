import { motion } from 'framer-motion'
import AdFormatCard from '@/components/molecules/AdFormatCard'
import Card from '@/components/atoms/Card'

const AdSpecificationForm = ({ data, onChange, errors = {} }) => {
  const adFormats = [
    {
      id: 'instagram-square',
      name: 'Instagram Square',
      platform: 'Instagram',
      dimensions: { width: 1080, height: 1080 },
      description: 'Perfect for Instagram feed posts'
    },
    {
      id: 'instagram-story',
      name: 'Instagram Story',
      platform: 'Instagram',
      dimensions: { width: 1080, height: 1920 },
      description: 'Vertical format for Stories'
    },
    {
      id: 'facebook-post',
      name: 'Facebook Post',
      platform: 'Facebook',
      dimensions: { width: 1200, height: 630 },
      description: 'Horizontal for Facebook feed'
    },
    {
      id: 'display-banner',
      name: 'Display Banner',
      platform: 'Web',
      dimensions: { width: 728, height: 90 },
      description: 'Standard web banner ad'
    },
    {
      id: 'linkedin-post',
      name: 'LinkedIn Post',
      platform: 'LinkedIn',
      dimensions: { width: 1200, height: 627 },
      description: 'Professional network format'
    },
    {
      id: 'twitter-header',
      name: 'Twitter Header',
      platform: 'Twitter',
      dimensions: { width: 1500, height: 500 },
      description: 'Twitter profile header'
    }
  ]

  const handleFormatSelect = (format) => {
    onChange({
      ...data,
      type: format.id,
      format: format.name,
      dimensions: format.dimensions,
      platform: format.platform
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
            Choose your ad format
          </h2>
          <p className="text-gray-600">
            Select the platform and format that best fits your advertising goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {adFormats.map((format) => (
            <AdFormatCard
              key={format.id}
              format={format}
              isSelected={data.type === format.id}
              onSelect={() => handleFormatSelect(format)}
            />
          ))}
        </div>

        {errors.type && (
          <motion.p 
            className="text-sm text-red-600 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {errors.type}
          </motion.p>
        )}

        {data.type && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-xl p-4"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-green-900">Format Selected</h4>
                <p className="text-sm text-green-700">
                  {data.format} ({data.dimensions.width}×{data.dimensions.height}px) for {data.platform}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  )
}

export default AdSpecificationForm