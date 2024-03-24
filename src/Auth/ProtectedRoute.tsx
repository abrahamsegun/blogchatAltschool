import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from './Context';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = UserAuth();
    if (!user) {
        return <Navigate to="/login" replace key="login" />;
    }
    return <>{children}</>; 
};

export default ProtectedRoute;
