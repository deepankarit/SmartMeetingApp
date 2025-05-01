import React, {createContext, useContext, useState, ReactNode} from 'react';
import {Snackbar} from 'react-native-paper';

interface SnackbarContextType {
  showSnackbar: (message: string, type?: 'success' | 'error') => void;
}

const SnackbarContext = createContext<SnackbarContextType>({
  showSnackbar: () => {},
});

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({children}: {children: ReactNode}) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState('green'); // NEW

  const showSnackbar = (msg: string, type: 'success' | 'error' = 'success') => {
    setMessage(msg);
    setSnackbarColor(type === 'success' ? 'green' : 'red'); // NEW
    setVisible(true);
  };

  return (
    <SnackbarContext.Provider value={{showSnackbar}}>
      {children}
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={3000}
        style={{backgroundColor: snackbarColor}} // NEW
        action={{
          label: 'Close',
          onPress: () => setVisible(false),
        }}>
        {message}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
