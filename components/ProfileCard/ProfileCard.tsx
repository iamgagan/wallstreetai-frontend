'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React, { useEffect } from 'react';
import { useUserStore } from '@/store/store';
import { useSession } from 'next-auth/react';

export const Profile = () => {
  const { data } = useSession();
  const { imgSrc, name, updateEmail, updateImageSrc, updateName, email } =
    useUserStore();

  const avatarName = name || data?.user?.name || email || data?.user?.email;

  useEffect(() => {
    if (data && data.user) {
      const { email, image, name } = data.user;
      email && updateEmail(email);
      image && updateImageSrc(image);
      name && updateName(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.user]);

  return (
    <Avatar>
      {imgSrc ? (
        <AvatarImage src={imgSrc} alt="imgSrc" />
      ) : (
        <AvatarFallback>
          {avatarName?.slice(0, 1)?.toUpperCase() || ''}
        </AvatarFallback>
      )}
    </Avatar>
  );
};
