
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import * as ScreenOrientation from "expo-screen-orientation";

type orientatedProps = {
    hStyle: React.CSSProperties,
    vStyle: React.CSSProperties
    children: React.ReactNode
};

function Orientated ({hStyle, vStyle, children}: orientatedProps) {
    
  const [orientation, setOrientation] = useState(null);

  const checkOrientation = async () => {
    const orientation = await ScreenOrientation.getOrientationAsync();
    setOrientation(orientation);
  };
  const handleOrientationChange = (o) => {
    setOrientation(o.orientationInfo.orientation);
  };
  
  useEffect(() => {
    checkOrientation();
      const subscription = ScreenOrientation.addOrientationChangeListener(
        handleOrientationChange
      );
      return () => {
        ScreenOrientation.removeOrientationChangeListeners(subscription);
      };
    }, []);

  const portrait = orientation == 1 | orientation == 2 ;    
   
  return (
      <View style={portrait ? vStyle : hStyle }>
        {children}
      </View>
    )
}

export default Orientated;
