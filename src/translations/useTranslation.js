import { useContext } from 'react';
import { LanguageContext } from '../App';
import allTranslations from './index';

/**
 * Custom hook for translations with advanced features
 * @returns {Object} Translation utilities
 */
export const useTranslation = () => {
  const { language } = useContext(LanguageContext);
  
  /**
   * Get translated text for a key
   * @param {string} key - Dot notation path to the translation (e.g., 'services.ocean.title')
   * @param {Object} params - Optional parameters for string interpolation
   * @returns {string} Translated text
   */
  const t = (key, params = {}) => {
    // Handle empty key
    if (!key) return '';
    
    // Get the translation object for current language
    const translations = allTranslations[language] || allTranslations.en;
    
    // Split the key into parts for nested objects
    const parts = key.split('.');
    
    // Traverse the nested objects to find the translation
    let value = translations;
    for (const part of parts) {
      if (value && typeof value === 'object' && part in value) {
        value = value[part];
      } else {
        // If not found in current language, try English as fallback
        if (language !== 'en') {
          let fallback = allTranslations.en;
          for (const fallbackPart of parts) {
            if (fallback && typeof fallback === 'object' && fallbackPart in fallback) {
              fallback = fallback[fallbackPart];
            } else {
              return key; // Return the key if not found in fallback
            }
          }
          value = fallback;
        } else {
          return key; // Return the key if not found at all
        }
      }
    }
    
    // Handle non-string values
    if (typeof value !== 'string') {
      return key;
    }
    
    // Replace parameters in the string if any
    // Example: t('greeting', { name: 'John' }) with "Hello, {{name}}" becomes "Hello, John"
    if (Object.keys(params).length) {
      return value.replace(/\{\{(\w+)\}\}/g, (_, paramKey) => {
        return params[paramKey] !== undefined ? params[paramKey] : `{{${paramKey}}}`;
      });
    }
    
    return value;
  };
  
  /**
   * Check if a translation exists
   * @param {string} key - Translation key
   * @returns {boolean} True if translation exists
   */
  const hasTranslation = (key) => {
    if (!key) return false;
    
    const translations = allTranslations[language] || allTranslations.en;
    const parts = key.split('.');
    
    let value = translations;
    for (const part of parts) {
      if (value && typeof value === 'object' && part in value) {
        value = value[part];
      } else {
        return false;
      }
    }
    
    return typeof value === 'string';
  };
  
  /**
   * Format date according to current language
   * @param {Date|string|number} date - Date to format
   * @param {Object} options - Intl.DateTimeFormat options
   * @returns {string} Formatted date
   */
  const formatDate = (date, options = {}) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    return new Intl.DateTimeFormat(language, options).format(dateObj);
  };
  
  /**
   * Format number according to current language
   * @param {number} number - Number to format
   * @param {Object} options - Intl.NumberFormat options
   * @returns {string} Formatted number
   */
  const formatNumber = (number, options = {}) => {
    return new Intl.NumberFormat(language, options).format(number);
  };
  
  /**
   * Get direction (RTL/LTR) based on current language
   * @returns {string} 'rtl' or 'ltr'
   */
  const getDirection = () => {
    return ['ar', 'he', 'fa', 'ur'].includes(language) ? 'rtl' : 'ltr';
  };
  
  return {
    t,
    language,
    hasTranslation,
    formatDate,
    formatNumber,
    getDirection
  };
};

export default useTranslation; 