import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Camera from '../camera';
import { Ionicons } from '@expo/vector-icons';
import Galeria from '../galeria';
import { useIsFocused } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function Routes() {
  const isFocused = useIsFocused();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Camera - Escaneie seus QR-CODE"
        component={Camera}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, size, color }) => {
            if (focused) {
              return <Ionicons size={size} color='green' name='camera' />;
            }
            return <Ionicons size={size} color='green' name='camera-outline' />;
          },
        }}
        initialParams={{ isFocused }} // Passa o estado do foco para a tela da câmera
      />
      <Tab.Screen
        name="Galeria - Seus QR's CODE's"
        component={Galeria}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, size, color }) => {
            if (focused) {
              return <Ionicons size={size} color='green' name='cloud' />;
            }
            return <Ionicons size={size} color='green' name='cloud-outline' />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
