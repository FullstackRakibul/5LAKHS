/**
 * Form State Composable
 * Handles form state management with validation feedback
 */

import { ref, reactive, computed } from 'vue'

/**
 * useFormState - Manage form inputs with validation
 */
export function useFormState(initialValues = {}, validators = {}) {
  const formValues = reactive({ ...initialValues })
  const formErrors = reactive({})
  const touched = reactive({})
  const isSubmitting = ref(false)

  /**
   * Validate a single field
   */
  const validateField = (fieldName, value) => {
    if (validators[fieldName]) {
      const error = validators[fieldName](value)
      if (error) {
        formErrors[fieldName] = error
        return false
      } else {
        delete formErrors[fieldName]
        return true
      }
    }
    return true
  }

  /**
   * Validate all fields
   */
  const validateForm = () => {
    let isValid = true
    Object.keys(initialValues).forEach(fieldName => {
      if (!validateField(fieldName, formValues[fieldName])) {
        isValid = false
      }
    })
    return isValid
  }

  /**
   * Update field value and validate
   */
  const updateField = (fieldName, value, validateOnChange = true) => {
    formValues[fieldName] = value
    touched[fieldName] = true
    
    if (validateOnChange) {
      validateField(fieldName, value)
    }
  }

  /**
   * Mark field as touched
   */
  const touchField = (fieldName) => {
    touched[fieldName] = true
  }

  /**
   * Reset form to initial state
   */
  const resetForm = () => {
    Object.keys(formValues).forEach(key => {
      formValues[key] = initialValues[key]
    })
    Object.keys(formErrors).forEach(key => {
      delete formErrors[key]
    })
    Object.keys(touched).forEach(key => {
      delete touched[key]
    })
    isSubmitting.value = false
  }

  /**
   * Get field input handlers
   */
  const getFieldProps = (fieldName) => {
    return {
      modelValue: formValues[fieldName],
      'onUpdate:modelValue': (value) => updateField(fieldName, value),
      onBlur: () => touchField(fieldName),
      error: formErrors[fieldName],
      touched: touched[fieldName],
    }
  }

  /**
   * Check if field has error
   */
  const getFieldError = (fieldName) => {
    return touched[fieldName] ? formErrors[fieldName] : null
  }

  /**
   * Check if form is valid
   */
  const isValid = computed(() => Object.keys(formErrors).length === 0)

  /**
   * Check if form has changes
   */
  const isDirty = computed(() => {
    return Object.keys(formValues).some(key => formValues[key] !== initialValues[key])
  })

  return {
    formValues,
    formErrors,
    touched,
    isSubmitting,
    isValid,
    isDirty,
    validateField,
    validateForm,
    updateField,
    touchField,
    resetForm,
    getFieldProps,
    getFieldError,
  }
}

/**
 * Common validators
 */
export const validators = {
  required: (value, fieldName = 'This field') => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return `${fieldName} is required`
    }
    return null
  },

  email: (value) => {
    if (!value) return null
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address'
    }
    return null
  },

  minLength: (min) => (value) => {
    if (!value) return null
    if (value.length < min) {
      return `Must be at least ${min} characters`
    }
    return null
  },

  maxLength: (max) => (value) => {
    if (!value) return null
    if (value.length > max) {
      return `Must be no more than ${max} characters`
    }
    return null
  },

  numeric: (value) => {
    if (!value) return null
    if (isNaN(value)) {
      return 'Must be a valid number'
    }
    return null
  },

  phoneNumber: (value) => {
    if (!value) return null
    const phoneRegex = /^\d{10}$/
    if (!phoneRegex.test(value.replace(/\D/g, ''))) {
      return 'Please enter a valid 10-digit phone number'
    }
    return null
  },

  ifscCode: (value) => {
    if (!value) return null
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/
    if (!ifscRegex.test(value)) {
      return 'Please enter a valid IFSC code'
    }
    return null
  },

  accountNumber: (value) => {
    if (!value) return null
    if (!/^\d{9,18}$/.test(value)) {
      return 'Please enter a valid account number'
    }
    return null
  },

  checkNumber: (value) => {
    if (!value) return null
    if (!/^\d{6,10}$/.test(value)) {
      return 'Please enter a valid check number'
    }
    return null
  },
}

/**
 * Compose multiple validators
 */
export function composeValidators(...validatorFuncs) {
  return (value) => {
    for (const validator of validatorFuncs) {
      const error = validator(value)
      if (error) return error
    }
    return null
  }
}
