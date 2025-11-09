// src/hooks/useAuth.js
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/lib/authSlice';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, token } = useSelector((s) => s.auth);

  const signOut = () => {
    dispatch(logout());
    router.push('/login');
  };

  return { user, token, signOut, isAdmin: user?.role === 'admin' };
};