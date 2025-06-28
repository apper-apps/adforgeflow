import { motion } from 'framer-motion'
import FormField from '@/components/molecules/FormField'
import TagInput from '@/components/molecules/TagInput'
import Card from '@/components/atoms/Card'

const TargetAudienceForm = ({ data, onChange, errors = {} }) => {
  const ageRanges = [
    { value: '18-24', label: '18-24 years' },
    { value: '25-34', label: '25-34 years' },
    { value: '35-44', label: '35-44 years' },
    { value: '45-54', label: '45-54 years' },
    { value: '55-64', label: '55-64 years' },
    { value: '65+', label: '65+ years' }
  ]

  const tones = [
    { value: 'professional', label: 'Professional & Trustworthy' },
    { value: 'casual', label: 'Casual & Friendly' },
    { value: 'playful', label: 'Playful & Fun' },
    { value: 'urgent', label: 'Urgent & Action-Oriented' },
    { value: 'luxury', label: 'Luxury & Premium' },
    { value: 'empathetic', label: 'Empathetic & Understanding' }
  ]

  const callToActions = [
    { value: 'shop-now', label: 'Shop Now' },
    { value: 'learn-more', label: 'Learn More' },
    { value: 'get-started', label: 'Get Started' },
    { value: 'sign-up', label: 'Sign Up' },
    { value: 'contact-us', label: 'Contact Us' },
    { value: 'download', label: 'Download' },
    { value: 'book-now', label: 'Book Now' },
    { value: 'try-free', label: 'Try Free' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
            Define your target audience
          </h2>
          <p className="text-gray-600">
            Help us understand who you want to reach with your advertisement.
          </p>
        </div>

        <div className="space-y-6">
          <FormField
            type="select"
            label="Target Age Range"
            value={data.ageRange}
            onChange={(e) => onChange({ ...data, ageRange: e.target.value })}
            options={ageRanges}
            required
            error={errors.ageRange}
          />

          <TagInput
            label="Target Interests & Demographics"
            value={data.interests}
            onChange={(newInterests) => onChange({ ...data, interests: newInterests })}
            placeholder="e.g., fitness enthusiasts, working parents, small business owners"
            maxTags={8}
          />

          <FormField
            type="select"
            label="Ad Tone & Style"
            value={data.tone}
            onChange={(e) => onChange({ ...data, tone: e.target.value })}
            options={tones}
            required
            error={errors.tone}
          />

          <FormField
            type="select"
            label="Call to Action"
            value={data.callToAction}
            onChange={(e) => onChange({ ...data, callToAction: e.target.value })}
            options={callToActions}
            required
            error={errors.callToAction}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-purple-900 mb-2">✨ Smart Targeting</h4>
              <p className="text-sm text-purple-700">
                Our AI analyzes your audience preferences to optimize ad messaging and visuals.
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-amber-900 mb-2">🎯 Performance Focus</h4>
              <p className="text-sm text-amber-700">
                We create multiple variations to help you find the highest-converting ad design.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default TargetAudienceForm