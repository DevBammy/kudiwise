import { View } from './Themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SafeScreen = ({ children }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="bg-bg"
      style={{
        paddingTop: insets.top,
        flex: 1,
      }}
    >
      {children}
    </View>
  );
};

export default SafeScreen;
