import { generateMockAds } from '@/services/mockData/adsData'

const simulateApiDelay = () => new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000))

export const adService = {
  async generateAds(generationData) {
    await simulateApiDelay()
    
    try {
      // Simulate API call to generate ads
      const ads = generateMockAds(generationData)
      return ads
    } catch (error) {
      throw new Error('Failed to generate ads')
    }
  },

  async generateVariation(adId) {
    await simulateApiDelay()
    
    try {
      // Simulate generating a variation of an existing ad
      const baseAd = generateMockAds({}).find(ad => ad.Id === parseInt(adId)) || generateMockAds({})[0]
      const variation = {
        ...baseAd,
        Id: Date.now(),
        headline: baseAd.headline + ' - Variation',
        timestamp: Date.now()
      }
      return variation
    } catch (error) {
      throw new Error('Failed to generate variation')
    }
  },

  async downloadAd(adId, format) {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    try {
      // Simulate download by creating a mock download
      const fileName = `ad_${adId}.${format.toLowerCase()}`
      console.log(`Downloading ${fileName}`)
      
      // In a real implementation, this would trigger an actual download
      return { success: true, fileName }
    } catch (error) {
      throw new Error('Download failed')
    }
  }
}