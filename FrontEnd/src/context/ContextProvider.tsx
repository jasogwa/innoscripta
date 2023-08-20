import { createContext, useContext, useState, ReactNode, SetStateAction } from 'react';

interface ContextType {
    currentUser: string | null;
    token: string | null;
    notification: string | null;
    setUser: React.Dispatch<SetStateAction<string | null>>;
    setToken: (newToken: string | null) => void;
    setNotification: (message: string) => void;
}

const StateContext = createContext<ContextType>({
    currentUser: null,
    token: null,
    notification: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {}
});

interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<string | null>(null);
    const [token, _setToken] = useState<string | null>(localStorage.getItem('ACCESS_TOKEN'));
    const [notification, _setNotification] = useState<string | null>('');

    const setToken = (newToken: string | null) => {
        _setToken(newToken);
        if (newToken) {
            localStorage.setItem('ACCESS_TOKEN', newToken);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    };

    const setNotification = (message: string) => {
        _setNotification(message);

        setTimeout(() => {
            _setNotification('');
        }, 5000);
    };

    return (
        <StateContext.Provider
            value={{
                currentUser: user,
                setUser,
                token,
                setToken,
                notification,
                setNotification
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = (): ContextType => useContext(StateContext);
