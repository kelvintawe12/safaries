import React, { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../utils/validation';
import { Button } from '../common/Button';
import { useLanguage } from '../../contexts/LanguageContext';
import { EyeIcon, EyeOffIcon, Loader2Icon } from 'lucide-react';
import { useToast } from '../../hooks/useToast'; // Fixed import path
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';

interface RegisterFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  preferredLanguage: string;
  password: string;
  confirmPassword: string;
  consent: boolean;
}

export const RegisterForm: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast(); // Mock toast hook
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    trigger,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange', // Enable real-time validation
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const preferredLanguage = watch('preferredLanguage', 'en');

  // Debounced real-time validation
  const debouncedTrigger = useCallback(
    debounce(async (field: keyof RegisterFormData) => {
      await trigger(field);
    }, 300),
    [trigger]
  );

  // Auto-format phone number
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,3})$/);
    if (match) {
      const parts = [match[1], match[2], match[3], match[4]].filter(Boolean);
      return parts.length > 1 ? `+${parts.join(' ')}` : parts[0] ? `+${parts[0]}` : '';
    }
    return value;
  };

  // Handle phone number input
  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange(formatted);
    debouncedTrigger('phoneNumber');
  };

  // Form submission
  const onSubmit = async (data: RegisterFormData): Promise<void> => {
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 1500)); // Simulate API call
      console.log('Analytics: Form submitted', data);
      toast({ message: t('form.success'), type: 'success' });
      reset();
    } catch (error) {
      console.error('Registration failed:', error);
      toast({ message: t('form.error'), type: 'error' });
    }
  };

  // Track field interactions
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name) {
        console.log(`Analytics: Field interacted - ${name}`, value[name]);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-3xl p-4 sm:p-6 md:p-8 animate-slide-in">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center mb-6">
          {t('form.register_title')}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm sm:text-base font-semibold text-gray-700"
              >
                {t('form.full_name')}
              </label>
              <input
                id="fullName"
                type="text"
                {...register('fullName', {
                  onChange: () => debouncedTrigger('fullName'),
                })}
                className={`mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 sm:py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 ${
                  errors.fullName ? 'border-red-300 animate-shake' : ''
                }`}
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              />
              {errors.fullName && (
                <p
                  id="fullName-error"
                  className="mt-1 text-xs sm:text-sm text-red-600 animate-fade-in"
                >
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm sm:text-base font-semibold text-gray-700"
              >
                {t('form.email')}
              </label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  onChange: () => debouncedTrigger('email'),
                })}
                className={`mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 sm:py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 ${
                  errors.email ? 'border-red-300 animate-shake' : ''
                }`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p
                  id="email-error"
                  className="mt-1 text-xs sm:text-sm text-red-600 animate-fade-in"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm sm:text-base font-semibold text-gray-700"
              >
                {t('form.phone')}
              </label>
              <input
                id="phoneNumber"
                type="tel"
                {...register('phoneNumber', {
                  onChange: (e) => handlePhoneChange(e, e.target.value),
                })}
                placeholder="+243 ..."
                className={`mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 sm:py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 ${
                  errors.phoneNumber ? 'border-red-300 animate-shake' : ''
                }`}
                aria-invalid={!!errors.phoneNumber}
                aria-describedby={errors.phoneNumber ? 'phoneNumber-error' : undefined}
              />
              {errors.phoneNumber && (
                <p
                  id="phoneNumber-error"
                  className="mt-1 text-xs sm:text-sm text-red-600 animate-fade-in"
                >
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* Preferred Language */}
            <div>
              <label
                htmlFor="preferredLanguage"
                className="block text-sm sm:text-base font-semibold text-gray-700"
              >
                {t('form.language')}
              </label>
              <select
                id="preferredLanguage"
                {...register('preferredLanguage')}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 sm:py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="rw">Kinyarwanda</option>
              </select>
              <p className="mt-1 text-xs sm:text-sm text-gray-600">
                {t('form.language_preview')}:{' '}
                {preferredLanguage === 'en'
                  ? 'Welcome!'
                  : preferredLanguage === 'fr'
                  ? 'Bienvenue !'
                  : 'Murakaza neza !'}
              </p>
            </div>

            {/* Password */}
            <div className="sm:col-span-2">
              <label
                htmlFor="password"
                className="block text-sm sm:text-base font-semibold text-gray-700"
              >
                {t('form.password')}
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    onChange: () => debouncedTrigger('password'),
                  })}
                  className={`mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 sm:py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 ${
                    errors.password ? 'border-red-300 animate-shake' : ''
                  }`}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p
                  id="password-error"
                  className="mt-1 text-xs sm:text-sm text-red-600 animate-fade-in"
                >
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="sm:col-span-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm sm:text-base font-semibold text-gray-700"
              >
                {t('form.confirm_password')}
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword', {
                    onChange: () => debouncedTrigger('confirmPassword'),
                  })}
                  className={`mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 sm:py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300 ${
                    errors.confirmPassword ? 'border-red-300 animate-shake' : ''
                  }`}
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby={
                    errors.confirmPassword ? 'confirmPassword-error' : undefined
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300"
                  aria-label={
                    showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p
                  id="confirmPassword-error"
                  className="mt-1 text-xs sm:text-sm text-red-600 animate-fade-in"
                >
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Consent */}
            <div className="sm:col-span-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register('consent')}
                  className="rounded border-gray-300 text-teal-500 focus:ring-teal-300 h-4 w-4 sm:h-5 sm:w-5"
                  aria-describedby={errors.consent ? 'consent-error' : undefined}
                />
                <span className="text-sm sm:text-base text-gray-700">
                  {t('form.privacy_consent')}{' '}
                  <Link
                    to="/privacy-policy"
                    className="text-teal-600 hover:underline"
                    onClick={() =>
                      console.log('Analytics: Privacy policy link clicked')
                    }
                  >
                    {t('form.privacy_policy')}
                  </Link>
                </span>
              </label>
              {errors.consent && (
                <p
                  id="consent-error"
                  className="mt-1 text-xs sm:text-sm text-red-600 animate-fade-in"
                >
                  {errors.consent.message}
                </p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
            <Button
              type="button"
              onClick={() => {
                reset();
                console.log('Analytics: Form reset');
              }}
              className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-900"
              disabled={isSubmitting}
            >
              {t('form.reset')}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-teal-500 hover:bg-teal-600 text-white flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2Icon className="h-4 w-4 sm:h-5 sm:w-5 animate-spin mr-2" />
                  {t('form.submitting')}
                </>
              ) : (
                t('form.register')
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;