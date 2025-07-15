import { Image, TouchableOpacity } from 'react-native';
import { Text, View } from '../Themed';
import loadingImg from '../../assets/images/loading.png';
import errorImg from '../../assets/images/error.png';
import { useRouter } from 'expo-router';

const Loading = () => {
  return (
    <View className="flex flex-1 w-full h-full items-center justify-center">
      <Image source={loadingImg} />
      <Text type="subtitle2">Loading data...</Text>
    </View>
  );
};

export const Error = ({
  message = 'Something went wrong',
  image = errorImg,
}) => {
  return (
    <View className="w-full h-[400] items-center justify-center ">
      <Image source={image} className="w-[90%] h-[90%] object-cover" />
      <Text type="subtitle2">{message}</Text>
    </View>
  );
};

export default Loading;
