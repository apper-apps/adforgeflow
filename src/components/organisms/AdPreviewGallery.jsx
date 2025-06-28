import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'

const AdPreviewGallery = ({ ads, onDownload, onRegenerateVariation }) => {
  const [selectedAd, setSelectedAd] = useState(null)

  const downloadFormats = [
    { format: 'PNG', quality: 'High Quality', size: 'Large file size' },
    { format: 'JPG', quality: 'Good Quality', size: 'Medium file size' },
    { format: 'PDF', quality: 'Print Ready', size: 'Vector format' }
  ]

  const handleDownload = (ad, format) => {
    onDownload(ad, format)
    setSelectedAd(null)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
              Your Generated Ads
            </h2>
            <p className="text-gray-600">
              Choose your favorite design and download in your preferred format.
            </p>
          </div>
          <Badge variant="success" size="lg">
            {ads.length} ads generated
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads.map((ad, index) => (
            <motion.div
              key={ad.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group">
                <div className="relative">
                  <img
                    src={ad.imageUrl}
                    alt={ad.headline}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedAd(ad)}
                        className="bg-white/20 backdrop-blur-sm text-white border-white/30"
                      >
                        <ApperIcon name="Download" size={16} />
                        Download
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRegenerateVariation(ad)}
                        className="bg-white/20 backdrop-blur-sm text-white border-white/30"
                      >
                        <ApperIcon name="RefreshCw" size={16} />
                        Variation
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {ad.headline}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {ad.bodyText}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="primary" size="sm">
                      {ad.format}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {new Date(ad.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="secondary"
            onClick={() => window.location.reload()}
            className="inline-flex items-center"
          >
            <ApperIcon name="Plus" size={16} />
            Generate More Ads
          </Button>
        </div>
      </motion.div>

      {/* Download Modal */}
      <AnimatePresence>
        {selectedAd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedAd(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-display font-bold text-gray-900">
                    Download Ad
                  </h3>
                  <button
                    onClick={() => setSelectedAd(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <ApperIcon name="X" size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-1/2">
                    <img
                      src={selectedAd.imageUrl}
                      alt={selectedAd.headline}
                      className="w-full rounded-lg shadow-lg"
                    />
                  </div>
                  
                  <div className="lg:w-1/2 space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {selectedAd.headline}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {selectedAd.bodyText}
                      </p>
                    </div>

                    <div>
                      <h5 className="font-medium text-gray-900 mb-3">
                        Choose Download Format
                      </h5>
                      <div className="space-y-3">
                        {downloadFormats.map((format) => (
                          <motion.button
                            key={format.format}
                            onClick={() => handleDownload(selectedAd, format.format)}
                            className="w-full p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-300 text-left"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-900">
                                  {format.format}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {format.quality} • {format.size}
                                </div>
                              </div>
                              <ApperIcon name="Download" className="text-primary-600" size={20} />
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AdPreviewGallery