import { motion } from 'framer-motion'
import FormField from '@/components/molecules/FormField'
import TagInput from '@/components/molecules/TagInput'
import Card from '@/components/atoms/Card'

const BusinessInfoForm = ({ data, onChange, errors = {} }) => {
  const industries = [
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance' },
    { value: 'retail', label: 'Retail' },
    { value: 'food-beverage', label: 'Food & Beverage' },
    { value: 'fitness', label: 'Fitness & Wellness' },
    { value: 'education', label: 'Education' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'other', label: 'Other' }
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
            Tell us about your business
          </h2>
          <p className="text-gray-600">
            Help us understand your brand so we can create the perfect ad for you.
          </p>
        </div>

        <div className="space-y-6">
          <FormField
            type="text"
            label="Business Name"
            value={data.name}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
            placeholder="e.g., Acme Coffee Shop"
            required
            error={errors.name}
          />

          <FormField
            type="select"
            label="Industry"
            value={data.industry}
            onChange={(e) => onChange({ ...data, industry: e.target.value })}
            options={industries}
            required
            error={errors.industry}
          />

          <FormField
            type="textarea"
            label="Business Description"
            value={data.description}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            placeholder="Describe what your business does, your products/services, and what makes you unique..."
            rows={4}
            required
            error={errors.description}
          />

          <TagInput
            label="Unique Selling Points"
            value={data.uniqueSellingPoints}
            onChange={(newPoints) => onChange({ ...data, uniqueSellingPoints: newPoints })}
            placeholder="Add a selling point and press Enter"
            maxTags={5}
          />

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm font-bold">💡</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-blue-900 mb-1">Pro Tip</h4>
                <p className="text-sm text-blue-700">
                  The more specific you are about your business and unique value propositions, 
                  the better we can tailor your ads to attract your ideal customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default BusinessInfoForm