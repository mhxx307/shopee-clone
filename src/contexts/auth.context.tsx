import { createContext, useState } from 'react';
import { getAccessToken } from 'src/utils';

export interface AuthContextProps {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialAuthContext: AuthContextProps = {
    isAuthenticated: Boolean(getAccessToken()),
    setIsAuthenticated: () => null,
};

export const AuthContext = createContext<AuthContextProps>(initialAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        initialAuthContext.isAuthenticated,
    );

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
