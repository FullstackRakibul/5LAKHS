/**
 * Animation Composables
 * Reusable animation logic for Vue 3 components
 */

import { ref, computed } from 'vue'

/**
 * Fade in/out animation
 */
export function useFadeAnimation(initialState = false) {
  const isVisible = ref(initialState)
  const duration = ref(300)

  const fadeInClass = computed(() => 
    isVisible.value ? 'animate-fade-in' : 'opacity-0'
  )

  const fadeIn = () => {
    isVisible.value = true
  }

  const fadeOut = () => {
    isVisible.value = false
  }

  const toggle = () => {
    isVisible.value = !isVisible.value
  }

  return {
    isVisible,
    duration,
    fadeInClass,
    fadeIn,
    fadeOut,
    toggle,
  }
}

/**
 * Slide animation
 */
export function useSlideAnimation(direction = 'up', initialState = false) {
  const isVisible = ref(initialState)

  const animationClass = computed(() => {
    if (!isVisible.value) return 'opacity-0 translate-y-5'
    
    switch(direction) {
      case 'left':
        return 'animate-slide-in-left'
      case 'right':
        return 'animate-slide-in-right'
      case 'up':
      default:
        return 'animate-slide-up'
    }
  })

  const slideIn = () => {
    isVisible.value = true
  }

  const slideOut = () => {
    isVisible.value = false
  }

  return {
    isVisible,
    animationClass,
    slideIn,
    slideOut,
  }
}

/**
 * Loading spinner animation
 */
export function useLoadingAnimation(isLoading = false) {
  const loading = ref(isLoading)

  const spinnerClass = computed(() => 
    loading.value ? 'animate-spin-indigo' : ''
  )

  const setLoading = (state) => {
    loading.value = state
  }

  return {
    loading,
    spinnerClass,
    setLoading,
  }
}

/**
 * Pulse animation for highlighting
 */
export function usePulseAnimation(active = false) {
  const isActive = ref(active)

  const pulseClass = computed(() =>
    isActive.value ? 'animate-pulse-subtle' : ''
  )

  const activate = () => {
    isActive.value = true
  }

  const deactivate = () => {
    isActive.value = false
  }

  return {
    isActive,
    pulseClass,
    activate,
    deactivate,
  }
}

/**
 * Glow effect animation
 */
export function useGlowAnimation(active = false) {
  const isGlowing = ref(active)

  const glowClass = computed(() =>
    isGlowing.value ? 'animate-glow shadow-glow-indigo-lg' : 'shadow-glass'
  )

  const startGlow = () => {
    isGlowing.value = true
  }

  const stopGlow = () => {
    isGlowing.value = false
  }

  return {
    isGlowing,
    glowClass,
    startGlow,
    stopGlow,
  }
}

/**
 * Stagger animation for list items
 */
export function useStaggerAnimation(itemCount = 0, delayStep = 50) {
  const getItemDelay = (index) => {
    return `${index * delayStep}ms`
  }

  const getItemClass = (index) => {
    return 'animate-slide-up'
  }

  const getItemStyle = (index) => {
    return {
      animationDelay: getItemDelay(index),
    }
  }

  return {
    getItemDelay,
    getItemClass,
    getItemStyle,
  }
}

/**
 * Transition between states
 */
export function useTransitionAnimation(duration = 300) {
  const transitionClass = computed(() =>
    `transition-all duration-${duration}`
  )

  return {
    transitionClass,
  }
}
