
import { FlatList } from 'react-native';
import { Image } from 'expo-image';
import { DomainImageURI } from "../data/assessment";

function DomainImage({domain}) {
  return (
    <FlatList
      data={DomainImageURI[domain]}
      renderItem={(url)=>{return(<Image source={url.item}/>)}}
    />
  );
}

export default DomainImage;
