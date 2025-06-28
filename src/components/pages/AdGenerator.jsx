import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import StepIndicator from '@/components/molecules/StepIndicator'
import BusinessInfoForm from '@/components/organisms/BusinessInfoForm'
import AdSpecificationForm from '@/components/organisms/AdSpecificationForm'
import TargetAudienceForm from '@/components/organisms/TargetAudienceForm'
import AdGenerationStatus from '@/components/organisms/AdGenerationStatus'
import AdPreviewGallery from '@/components/organisms/AdPreviewGallery'
import Button from '@/components/atoms/Button'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import { adService } from '@/services/api/adService'

const AdGenerator = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedAds, setGeneratedAds] = useState([])

  const [businessInfo, setBusinessInfo] = useState({
    name: '',
    industry: '',
    description: '',
    uniqueSellingPoints: []
  })

  const [adSpecification, setAdSpecification] = useState({
    type: '',
    format: '',
    dimensions: {},
    platform: ''
  })

  const [targetAudience, setTargetAudience] = useState({
    ageRange: '',
    interests: [],
    tone: '',
    callToAction: ''
  })

  const [errors, setErrors] = useState({})

  const steps = [
    { name: 'Business Info', component: 'business' },
    { name: 'Ad Format', component: 'specification' },
    { name: 'Target Audience', component: 'audience' },
    { name: 'Generate', component: 'generate' }
  ]

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('adforge-data')
    if (savedData) {
      const parsed = JSON.parse(savedData)
      setBusinessInfo(parsed.businessInfo || businessInfo)
      setAdSpecification(parsed.adSpecification || adSpecification)
      setTargetAudience(parsed.targetAudience || targetAudience)
    }
  }, [])

  // Save data to localStorage
  useEffect(() => {
    const dataToSave = {
      businessInfo,
      adSpecification,
      targetAudience
    }
    localStorage.setItem('adforge-data', JSON.stringify(dataToSave))
  }, [businessInfo, adSpecification, targetAudience])

  const validateStep = (step) => {
    const newErrors = {}

    switch (step) {
      case 0: // Business Info
        if (!businessInfo.name.trim()) newErrors.name = 'Business name is required'
        if (!businessInfo.industry) newErrors.industry = 'Industry is required'
        if (!businessInfo.description.trim()) newErrors.description = 'Business description is required'
        break

      case 1: // Ad Specification
        if (!adSpecification.type) newErrors.type = 'Please select an ad format'
        break

      case 2: // Target Audience
        if (!targetAudience.ageRange) newErrors.ageRange = 'Age range is required'
        if (!targetAudience.tone) newErrors.tone = 'Ad tone is required'
        if (!targetAudience.callToAction) newErrors.callToAction = 'Call to action is required'
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
      setErrors({})
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0))
    setErrors({})
  }

  const handleGenerate = async () => {
    if (!validateStep(2)) return

    setIsGenerating(true)
    
    try {
      const generationData = {
        businessInfo,
        adSpecification,
        targetAudience
      }

      const ads = await adService.generateAds(generationData)
      setGeneratedAds(ads)
      setCurrentStep(3)
      toast.success('🎉 Your ads have been generated successfully!')
    } catch (error) {
      toast.error('Failed to generate ads. Please try again.')
    }
  }

  const handleDownload = async (ad, format) => {
    try {
      await adService.downloadAd(ad.id, format)
      toast.success(`Ad downloaded in ${format} format!`)
    } catch (error) {
      toast.error('Download failed. Please try again.')
    }
  }

  const handleRegenerateVariation = async (ad) => {
    try {
      setIsGenerating(true)
      const variation = await adService.generateVariation(ad.id)
      setGeneratedAds(prev => [...prev, variation])
      toast.success('New variation generated!')
    } catch (error) {
      toast.error('Failed to generate variation. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleStartOver = () => {
    setCurrentStep(0)
    setGeneratedAds([])
    setBusinessInfo({ name: '', industry: '', description: '', uniqueSellingPoints: [] })
    setAdSpecification({ type: '', format: '', dimensions: {}, platform: '' })
    setTargetAudience({ ageRange: '', interests: [], tone: '', callToAction: '' })
    setErrors({})
    localStorage.removeItem('adforge-data')
    toast.info('Starting fresh! Create your next amazing ad.')
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <BusinessInfoForm
            data={businessInfo}
            onChange={setBusinessInfo}
            errors={errors}
          />
        )
      case 1:
        return (
          <AdSpecificationForm
            data={adSpecification}
            onChange={setAdSpecification}
            errors={errors}
          />
        )
      case 2:
        return (
          <TargetAudienceForm
            data={targetAudience}
            onChange={setTargetAudience}
            errors={errors}
          />
        )
      case 3:
        return generatedAds.length > 0 ? (
          <AdPreviewGallery
            ads={generatedAds}
            onDownload={handleDownload}
            onRegenerateVariation={handleRegenerateVariation}
          />
        ) : (
          <Empty
            title="Ready to create amazing ads?"
            message="Click the button below to start generating professional advertisements tailored to your business."
            actionLabel="Generate My Ads"
            onAction={handleGenerate}
            icon="Zap"
          />
        )
      default:
        return null
    }
  }

  if (generatedAds.length === 0) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
              Create Stunning Ads in Minutes
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your business description into professional advertisements with the power of AI. 
              No design skills required.
            </p>
          </motion.div>

          <StepIndicator steps={steps} currentStep={currentStep} />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderCurrentStep()}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="lg:col-span-2">
              <motion.div
                className="sticky top-24"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 border border-primary-100">
                  <h3 className="text-lg font-display font-bold text-gray-900 mb-4">
                    Your Ad Preview
                  </h3>
                  
                  {currentStep >= 1 && adSpecification.type ? (
                    <div className="space-y-4">
                      <div 
                        className="mx-auto bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm"
                        style={{
                          width: '200px',
                          height: `${(200 * adSpecification.dimensions.height) / adSpecification.dimensions.width}px`,
                          maxHeight: '300px'
                        }}
                      >
                        {adSpecification.format}<br />
                        {adSpecification.dimensions.width}×{adSpecification.dimensions.height}
                      </div>
                      
                      <div className="text-center space-y-2">
                        <p className="font-medium text-gray-900">{adSpecification.format}</p>
                        <p className="text-sm text-gray-600">{adSpecification.platform}</p>
                        {businessInfo.name && (
                          <p className="text-sm font-medium text-primary-700">{businessInfo.name}</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ApperIcon name="Image" className="text-gray-300 mx-auto mb-2" size={48} />
                      <p className="text-gray-500 text-sm">
                        Complete the form to see your ad preview
                      </p>
                    </div>
                  )}
                </div>

                {/* Navigation Buttons */}
                {currentStep < 3 && (
                  <div className="mt-6 flex justify-between">
                    <Button
                      variant="secondary"
                      onClick={handleBack}
                      disabled={currentStep === 0}
                      className="flex items-center"
                    >
                      <ApperIcon name="ChevronLeft" size={16} />
                      Back
                    </Button>

                    {currentStep === 2 ? (
                      <Button
                        variant="accent"
                        onClick={handleGenerate}
                        className="flex items-center"
                      >
                        <ApperIcon name="Zap" size={16} />
                        Generate Ads
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={handleNext}
                        className="flex items-center"
                      >
                        Next
                        <ApperIcon name="ChevronRight" size={16} />
                      </Button>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </div>

          <AdGenerationStatus
            isGenerating={isGenerating}
            onComplete={() => setIsGenerating(false)}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              Your Generated Ads
            </h1>
            <p className="text-gray-600">
              Download your ads or create new variations
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={handleStartOver}
            className="flex items-center"
          >
            <ApperIcon name="Plus" size={16} />
            Create New Ad
          </Button>
        </div>

        {renderCurrentStep()}

        <AdGenerationStatus
          isGenerating={isGenerating}
          onComplete={() => setIsGenerating(false)}
        />
      </div>
    </div>
  )
}

export default AdGenerator