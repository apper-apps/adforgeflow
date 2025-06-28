const mockImages = [
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1553484771-cc0d9b8c2b33?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?w=800&h=600&fit=crop'
]

const generateHeadlines = (businessInfo) => {
  const { name, industry } = businessInfo
  const headlines = [
    `Transform Your ${industry} Experience with ${name}`,
    `${name}: Where Innovation Meets Excellence`,
    `Discover Why Thousands Choose ${name}`,
    `The Future of ${industry} is Here with ${name}`,
    `${name} - Your Partner in Success`,
    `Elevate Your Business with ${name}'s Solutions`
  ]
  
  return headlines[Math.floor(Math.random() * headlines.length)]
}

const generateBodyText = (businessInfo, targetAudience) => {
  const { description, uniqueSellingPoints } = businessInfo
  const { tone, callToAction } = targetAudience
  
  const toneAdjectives = {
    professional: ['proven', 'reliable', 'trusted', 'expert'],
    casual: ['awesome', 'amazing', 'great', 'fantastic'],
    playful: ['fun', 'exciting', 'delightful', 'enjoyable'],
    urgent: ['limited time', 'exclusive', 'act now', 'don\'t miss'],
    luxury: ['premium', 'exclusive', 'sophisticated', 'elite'],
    empathetic: ['understanding', 'caring', 'supportive', 'thoughtful']
  }
  
  const adjective = toneAdjectives[tone]?.[Math.floor(Math.random() * toneAdjectives[tone].length)] || 'exceptional'
  const usp = uniqueSellingPoints.length > 0 ? uniqueSellingPoints[0] : 'quality service'
  
  return `Experience ${adjective} ${description.split('.')[0].toLowerCase()}. With our ${usp}, you'll see the difference. ${callToAction.replace('-', ' ').toUpperCase()} today!`
}

export const generateMockAds = (generationData) => {
  const { businessInfo = {}, adSpecification = {}, targetAudience = {} } = generationData
  
  // Generate 3-6 ad variations
  const numAds = 3 + Math.floor(Math.random() * 4)
  const ads = []
  
  for (let i = 0; i < numAds; i++) {
    const ad = {
      Id: Date.now() + i,
      imageUrl: mockImages[i % mockImages.length],
      headline: generateHeadlines(businessInfo),
      bodyText: generateBodyText(businessInfo, targetAudience),
      format: adSpecification.format || 'Instagram Square',
      timestamp: Date.now() - (i * 60000) // Stagger timestamps
    }
    
    ads.push(ad)
  }
  
  return ads
}