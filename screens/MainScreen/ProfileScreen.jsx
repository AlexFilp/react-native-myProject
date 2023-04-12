import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
// ICONS
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const { width, height } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../..//assets/images/mountainBg.jpg')}
        style={{
          ...styles.bgImage,
          width: width,
          height: height,
        }}
      >
        <View style={styles.listContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.logoutBtn}
            onPress={() => navigation.navigate('Auth')}
          >
            <MaterialIcons name="logout" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <View style={styles.avatarThumb}>
            <Image
              style={styles.avatar}
              source={require('../../assets/images/avatar.jpg')}
            />
            <TouchableOpacity activeOpacity={0.8} style={styles.avatarBtn}>
              <AntDesign name="close" size={16} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
          <Text style={styles.listTitle}>Natali Romanova</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  listContainer: {
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',
    paddingTop: 92,
  },
  logoutBtn: {
    position: 'absolute',
    top: 22,
    right: 16,
  },
  avatarThumb: {
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
    position: 'absolute',
    top: -60,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  avatarBtn: {
    position: 'absolute',
    width: 24,
    height: 24,
    bottom: 14,
    right: -12,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    color: '##212121',
    marginBottom: 33,
  },
});

export default ProfileScreen;
