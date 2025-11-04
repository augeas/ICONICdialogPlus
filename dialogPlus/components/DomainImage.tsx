
import { FlatList, Image } from 'react-native';

import { Domains, DomainKey } from "../data/assessment";

const DomainImageURI: Record<DomainKey, Object> = {
  [Domains.Mental]: [require('../assets/images/domains/mental_health.png')],
  [Domains.Physical]: [require('../assets/images/domains/physical_health.png')],
  [Domains.Work]: [
    require('../assets/images/domains/work.png'),
    require('../assets/images/domains/college.png')
  ],
  [Domains.Activities]: [require('../assets/images/domains/day_activities.png')],  
  [Domains.Home]: [require('../assets/images/domains/home.png')],
  [Domains.Family]: [require('../assets/images/domains/family.png')],
  [Domains.Friends]: [require('../assets/images/domains/friends.png')],
  [Domains.Safety]: [require('../assets/images/domains/safety.png')],
  [Domains.Independence]: [require('../assets/images/domains/independence.png')],
  [Domains.Communication]: [require('../assets/images/domains/communication.png')],
  [Domains.Medication]: [require('../assets/images/domains/medication.png')],
  [Domains.Support]: [require('../assets/images/domains/support.png')],
  [Domains.Meetings]: [require('../assets/images/domains/care_team.png')]
}

function DomainImage({domain}) {
  return (
    <FlatList
      data={DomainImageURI[domain]}
      renderItem={(url)=>{return(<Image source={url.item}/>)}}
    />
  );
}

export default DomainImage;
