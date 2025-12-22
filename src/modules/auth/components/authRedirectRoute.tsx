// src/auth/components/AuthRedirectRoute.tsx (Ajustado)

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LoadingCircle } from '@/components/app/loading';
import { routeLabel } from '#/routes';

export const AuthRedirectRoute: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
    const auth = useAuth();
    if (auth.isLoading) return <div className="p-10 text-center"><LoadingCircle /></div>;
    if (auth.isAuthReady) return <Navigate to={routeLabel.remoteClinic} replace />;
    return children;
};