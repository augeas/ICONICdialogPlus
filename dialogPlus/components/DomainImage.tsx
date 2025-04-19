
import { View, Image } from 'react-native';

import { Domains, DomainKey } from "../data/assessment";

export const DomainImageURI: Record<DomainKey, Object> = {
  [Domains.Mental]: require('../assets/images/domains/mental_health.png'),
  [Domains.Physical]: require('../assets/images/domains/physical_health.png'),
  [Domains.Work]: require('../assets/images/domains/work.png'),
  [Domains.Learning]: require('../assets/images/domains/learning.png'),  
  [Domains.Home]: require('../assets/images/domains/home.png'),
  [Domains.Leisure]: require('../assets/images/domains/day_activities.png'),
  [Domains.Family]: require('../assets/images/domains/family.png'),
  [Domains.Friends]: require('../assets/images/domains/friends.png'),
  [Domains.Safety]: require('../assets/images/domains/safety.png'),
  [Domains.Independence]: require('../assets/images/domains/independence.png'),
  [Domains.Medication]: require('../assets/images/domains/medication.png'),
  [Domains.Practical]: require('../assets/images/domains/support.png'),
  [Domains.Meetings]: require('../assets/images/domains/care_team.png')
}

const DomainImage = ({domain}) => {
  return (
      <View>
        <Image source={DomainImageURI[domain]} />
      </View>
  )
}

export default DomainImage;
