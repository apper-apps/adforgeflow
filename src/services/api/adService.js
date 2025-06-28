import { generateMockAds } from '@/services/mockData/adsData'
import { toast } from 'react-toastify'

// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

const simulateApiDelay = () => new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000))

export const adService = {
  async generateAds(generationData) {
    await simulateApiDelay()
    
    try {
      const apperClient = getApperClient();
      
      // Generate mock ads based on the generation data
      const mockAds = generateMockAds(generationData);
      
      // Create ads in database using only Updateable fields
      const adsToCreate = mockAds.map(ad => ({
        Name: ad.headline,
        Tags: '', // Empty tags for now
        Owner: null, // Will be set by system
        headline: ad.headline,
        body_text: ad.bodyText,
        image_url: ad.imageUrl,
        format: ad.format,
        timestamp: new Date().toISOString()
      }));
      
      const params = {
        records: adsToCreate
      };
      
      const response = await apperClient.createRecord('ad', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} ads:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        // Transform database records back to expected format
        return successfulRecords.map(result => ({
          Id: result.data.Id,
          imageUrl: result.data.image_url,
          headline: result.data.headline,
          bodyText: result.data.body_text,
          format: result.data.format,
          timestamp: result.data.timestamp
        }));
      }
      
      return [];
    } catch (error) {
      console.error('Error generating ads:', error);
      throw new Error('Failed to generate ads')
    }
  },

  async generateVariation(adId) {
    await simulateApiDelay()
    
    try {
      const apperClient = getApperClient();
      
      // Get the base ad from database
      const baseAdResponse = await apperClient.getRecordById('ad', parseInt(adId), {
        fields: [
          { field: { Name: 'headline' } },
          { field: { Name: 'body_text' } },
          { field: { Name: 'image_url' } },
          { field: { Name: 'format' } }
        ]
      });
      
      if (!baseAdResponse.success || !baseAdResponse.data) {
        throw new Error('Base ad not found');
      }
      
      const baseAd = baseAdResponse.data;
      
      // Create variation with modified headline
      const variationData = {
        Name: baseAd.headline + ' - Variation',
        headline: baseAd.headline + ' - Variation',
        body_text: baseAd.body_text,
        image_url: baseAd.image_url,
        format: baseAd.format,
        timestamp: new Date().toISOString()
      };
      
      const params = {
        records: [variationData]
      };
      
      const response = await apperClient.createRecord('ad', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error('Failed to generate variation');
      }
      
      if (response.results && response.results[0].success) {
        const result = response.results[0];
        return {
          Id: result.data.Id,
          imageUrl: result.data.image_url,
          headline: result.data.headline,
          bodyText: result.data.body_text,
          format: result.data.format,
          timestamp: result.data.timestamp
        };
      }
      
      throw new Error('Failed to generate variation');
    } catch (error) {
      console.error('Error generating variation:', error);
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
  },

  async fetchAds() {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          { field: { Name: 'Id' } },
          { field: { Name: 'Name' } },
          { field: { Name: 'headline' } },
          { field: { Name: 'body_text' } },
          { field: { Name: 'image_url' } },
          { field: { Name: 'format' } },
          { field: { Name: 'timestamp' } }
        ],
        orderBy: [
          {
            fieldName: 'timestamp',
            sorttype: 'DESC'
          }
        ],
        pagingInfo: {
          limit: 50,
          offset: 0
        }
      };
      
      const response = await apperClient.fetchRecords('ad', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      if (!response.data || response.data.length === 0) {
        return [];
      }
      
      // Transform database records to expected format
      return response.data.map(record => ({
        Id: record.Id,
        imageUrl: record.image_url,
        headline: record.headline,
        bodyText: record.body_text,
        format: record.format,
        timestamp: record.timestamp
      }));
    } catch (error) {
      console.error('Error fetching ads:', error);
      return [];
    }
  }
}