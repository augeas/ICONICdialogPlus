
import { FlatList, Image } from 'react-native';

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
