'use client';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';
import { FaLinkedin } from 'react-icons/fa';
import { FaApple } from 'react-icons/fa';
import { signIn } from 'next-auth/react';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { SocialMediaProvider } from '@/types/SocialMedia';

interface SocialIconProps {
  provider: SocialMediaProvider;
  size: number;
}

export const SocialIcon = ({ provider, size = 25 }: SocialIconProps) => {
  switch (provider) {
    case 'Google':
      return <FcGoogle size={size} />;
    case 'Facebook':
      return <FaFacebookF size={size} />;
    case 'Twitter':
      return <BsTwitterX size={size} />;
    case 'Linkedin':
      return <FaLinkedin size={size} />;
    case 'Apple':
      return <FaApple size={size} />;
    default:
      return <div />;
  }
};

const socialMediaBgColor = (provider: SocialMediaProvider) => {
  switch (provider) {
    case 'Google':
      return 'bg-white';
    case 'Facebook':
      return 'bg-blue-500';
    case 'Twitter':
      return 'bg-blue-400';
    case 'Linkedin':
      return 'bg-blue-800';
    case 'Apple':
      return 'bg-black';
    default:
      return 'bg-gray-500';
  }
};

const socialMediaTextColor = (provider: SocialMediaProvider) => {
  switch (provider) {
    case 'Google':
      return 'text-black';
    case 'Facebook':
      return 'text-white';
    case 'Twitter':
      return 'text-white';
    case 'Linkedin':
      return 'text-white';
    case 'Apple':
      return 'text-white';
    default:
      return 'text-black';
  }
};

interface SocialLoginButtonProps {
  provider: SocialMediaProvider;
  action: 'login' | 'signup';
}

export const SocialLoginButton = ({
  provider,
  action,
}: SocialLoginButtonProps) => {
  const handleLogin = async (provider: SocialMediaProvider) => {
    try {
      await signIn(provider.toLowerCase(), {
        callbackUrl: DEFAULT_LOGIN_REDIRECT,
      });
    } catch (error) {
      console.error('Error signing in with social media', error);
    }
  };
  const actionLabel =
    action === 'login' ? `Log in with ${provider}` : `Sign up with ${provider}`;

  return (
    <button
      className={`grid grid-cols-6 lg:grid-cols-8 items-center justify-start w-full h-12 py-3 ${socialMediaTextColor(
        provider
      )} ${socialMediaBgColor(provider)} rounded-md`}
      onClick={() => handleLogin(provider)}
    >
      <div className="gap-4 col-start-2 lg:col-start-3 col-span-full flex text-lg">
        <span>
          <SocialIcon provider={provider} size={25} />
        </span>
        <span>{actionLabel}</span>
      </div>
    </button>
  );
};
