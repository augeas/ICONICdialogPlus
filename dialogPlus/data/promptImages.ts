
import { Domains, DomainKey } from "../data/assessment";

export const QuestionImageURI: Record<DomainKey, Object> = {
    [Domains.Mental]: require('../assets/images/prompts/mental/mental.png'),
    [Domains.Physical]: require('../assets/images/prompts/physical/physical.png'),
    [Domains.Home]: require('../assets/images/prompts/home/home.png'),   
    [Domains.Activities]: require('../assets/images/prompts/activities/activities.png'),
    [Domains.Work]: require('../assets/images/prompts/work/work.png'),
    [Domains.Family]: require('../assets/images/prompts/family/family.png'),
    [Domains.Friends]: require('../assets/images/prompts/friends/friends.png'),
    [Domains.Safety]: require('../assets/images/prompts/safety/safety.png'),
    [Domains.Independence]: require('../assets/images/prompts/independence/independence.png'),
    [Domains.Communication]: require('../assets/images/prompts/communication/communication.png'),
    [Domains.Medication]: require('../assets/images/prompts/medication/medication.png'),
    [Domains.Support]: require('../assets/images/prompts/support/support.png'),
    [Domains.Meetings]: require('../assets/images/prompts/meetings/meetings.png')
};

export const PromptImageURI: Record<DomainKey, Object> = {
    [Domains.Mental]: [
        require('../assets/images/prompts/mental/stress.png'),
        require('../assets/images/prompts/mental/change.png'),
        require('../assets/images/prompts/mental/support.png')
    ],
    [Domains.Physical]: [
        require('../assets/images/prompts/physical/diet.png'),
        require('../assets/images/prompts/physical/fitness.png'),
        require('../assets/images/prompts/physical/illness.png'),
        require('../assets/images/prompts/physical/toilet.png')
    ],
    [Domains.Home]: [
        require('../assets/images/prompts/home/area.png'),
        require('../assets/images/prompts/home/people.png'),
        require('../assets/images/prompts/home/type.png'),
        require('../assets/images/prompts/home/choice.png'),
    ],
    [Domains.Activities]: [
        require('../assets/images/prompts/activities/doing.png'),
        require('../assets/images/prompts/activities/hours.png'),
        require('../assets/images/prompts/activities/learn.png')
    ],
    [Domains.Work]: [
        require('../assets/images/prompts/work/charity.png'),
        require('../assets/images/prompts/work/enjoy.png'),
        require('../assets/images/prompts/work/managing.png'),
        require('../assets/images/prompts/work/people.png')
    ],
    [Domains.Family]: [
        require('../assets/images/prompts/family/get_on.png'),
        require('../assets/images/prompts/family/support.png'),
        require('../assets/images/prompts/family/family.png'),
        require('../assets/images/prompts/family/enjoy.png')
    ],
    [Domains.Friends]: [
        require('../assets/images/prompts/friends/meeting.png'),
        require('../assets/images/prompts/family/get_on.png'),
        require('../assets/images/prompts/friends/picnic.png'),
    ],
    [Domains.Safety]: [
        require('../assets/images/prompts/safety/live.png'),
        require('../assets/images/prompts/safety/live.png'),
        require('../assets/images/prompts/safety/go_out.png'),
        require('../assets/images/prompts/safety/transport.png')
    ],
    [Domains.Independence]: [
        require('../assets/images/prompts/independence/clothes.png'),
        require('../assets/images/prompts/independence/money.png'),
        require('../assets/images/prompts/activities/doing.png'),
        require('../assets/images/prompts/independence/care.png')
    ],
    [Domains.Communication]: [
        require('../assets/images/prompts/communication/understood.png'),
        require('../assets/images/prompts/communication/understand.png'),
        require('../assets/images/prompts/communication/visual.png'),
        require('../assets/images/prompts/communication/sign.png'),
        require('../assets/images/prompts/communication/tech.png')
    ],
    [Domains.Medication]: [
        require('../assets/images/prompts/medication/know.png'),
        require('../assets/images/prompts/medication/chemist.png'),
        require('../assets/images/prompts/medication/easy_read.png'),
        require('../assets/images/prompts/medication/reaction.png'),
    ],
    [Domains.Support]: [
        require('../assets/images/prompts/support/enough.png'),
        require('../assets/images/prompts/support/helped.png'),
        require('../assets/images/prompts/support/listen.png')
    ],
    [Domains.Meetings]: [
        require('../assets/images/prompts/activities/hours.png'),        
        require('../assets/images/prompts/meetings/team.png'),
        require('../assets/images/prompts/communication/understand.png'),
        require('../assets/images/prompts/communication/agenda.png'),
        require('../assets/images/prompts/support/listen.png')
    ]
};
