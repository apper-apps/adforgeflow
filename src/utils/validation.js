export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0
}

export const validateMinLength = (value, minLength) => {
  return value && value.toString().length >= minLength
}

export const validateMaxLength = (value, maxLength) => {
  return !value || value.toString().length <= maxLength
}

export const validateBusinessInfo = (data) => {
  const errors = {}
  
  if (!validateRequired(data.name)) {
    errors.name = 'Business name is required'
  }
  
  if (!validateRequired(data.industry)) {
    errors.industry = 'Industry is required'
  }
  
  if (!validateRequired(data.description)) {
    errors.description = 'Business description is required'
  } else if (!validateMinLength(data.description, 20)) {
    errors.description = 'Description should be at least 20 characters'
  }
  
  return errors
}

export const validateAdSpecification = (data) => {
  const errors = {}
  
  if (!validateRequired(data.type)) {
    errors.type = 'Ad format is required'
  }
  
  return errors
}

export const validateTargetAudience = (data) => {
  const errors = {}
  
  if (!validateRequired(data.ageRange)) {
    errors.ageRange = 'Age range is required'
  }
  
  if (!validateRequired(data.tone)) {
    errors.tone = 'Ad tone is required'
  }
  
  if (!validateRequired(data.callToAction)) {
    errors.callToAction = 'Call to action is required'
  }
  
  return errors
}