import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../utils/validation';
import { Button } from '../common/Button';
import { useLanguage } from '../../contexts/LanguageContext';
export const RegisterForm = () => {
  const {
    t
  } = useLanguage();
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });
  interface RegisterFormData {
    fullName: string;
    email: string;
    phoneNumber: string;
    preferredLanguage: string;
    password: string;
    confirmPassword: string;
    consent: boolean;
  }

  const onSubmit = async (data: RegisterFormData): Promise<void> => {
    try {
      // Simulate API call
      await new Promise<void>(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', data);
      // TODO: Handle registration success
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };
  return <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('form.full_name')}
          </label>
          <input type="text" {...register('fullName')} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
          {errors.fullName && <p className="mt-1 text-sm text-red-600">
              {errors.fullName.message}
            </p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('form.email')}
          </label>
          <input type="email" {...register('email')} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('form.phone')}
          </label>
          <input type="tel" {...register('phoneNumber')} placeholder="+243..." className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
          {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">
              {errors.phoneNumber.message}
            </p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('form.language')}
          </label>
          <select {...register('preferredLanguage')} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2">
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="rw">Kinyarwanda</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            {t('form.password')}
          </label>
          <input type="password" {...register('password')} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
          {errors.password && <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>}
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            {t('form.confirm_password')}
          </label>
          <input type="password" {...register('confirmPassword')} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
          {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>}
        </div>
        <div className="col-span-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" {...register('consent')} className="rounded border-gray-300 text-teal-600" />
            <span className="text-sm text-gray-700">
              {t('form.privacy_consent')}
            </span>
          </label>
          {errors.consent && <p className="mt-1 text-sm text-red-600">
              {errors.consent.message}
            </p>}
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
          {isSubmitting ? t('form.submitting') : t('form.register')}
        </Button>
      </div>
    </form>;
};

export default RegisterForm;