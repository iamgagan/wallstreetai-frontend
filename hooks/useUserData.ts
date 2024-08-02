import { useQuery } from '@tanstack/react-query';

const getUserData = async (email: string) => {
  const res = await fetch(`/api/user?email=${email}`);
  if (res.ok) {
    const { data } = await res.json();
    return data;
  }
  return null;
};

export const useUserData = (email: string) => {
  return useQuery({
    queryKey: ['user-data'],
    queryFn: async () => await getUserData(email),
  });
};
