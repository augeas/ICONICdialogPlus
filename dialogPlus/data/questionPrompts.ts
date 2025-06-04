
import { Domains, DomainKey } from "./assessment";

export const QuestionPrompts: Record<DomainKey, string[]> = {
  [Domains.Mental]: [
    'This question is asking you how you feel about your mental health.',
    'Your mental health is about having a healthy mind.',
    'It is about how you think and feel.'
  ],
  [Domains.Physical]: [
    'This question is asking you how you feel about your physical health.',
    'Your physical health is about having a healthy body.'
  ],
  [Domains.Work]: [
    'This question is asking you how you feel about your job.',
    'This might be a paid job or a volunteer job.',
  ],
  [Domains.Learning]: [
    'This question is asking you how you feel about your learning.',
    'This could mean how you feel about school or college, or learning a new skill.'
  ],
  [Domains.Home]: [
    'This question is asking you how you feel about where you live.'    
  ],
  [Domains.Leisure]: [
    'This question is asking you how you feel about the things you do during the day.',
    'This could mean how you feel about your hobbies, your day service, exercise and spending time with your friends.'
  ],
  [Domains.Family]: [
    'This question is asking you how you feel about the relationships you have with your family.',
    'This could mean relationships with your children and your unpaid carers.'    
  ],
  [Domains.Friends]: [
    'This question is asking you how you feel about the relationships you have with your friends and partner.'    
  ],
  [Domains.Safety]: [
    'This question is asking you how you feel about your safety.'    
  ],
  [Domains.Independence]: [
    'This question is asking you how you feel about your independence.',
    'Independence is about being able to do things for yourself and making your own choices.'
  ],  
  [Domains.Medication]: [
    'This question is asking you how you feel about the medicines you take.'    
  ],
  [Domains.Practical]: [
    'This question is asking you how you feel about the help that you are given from staff and paid carers.'  
  ],
  [Domains.Meetings]: [
    'This question is asking you how you feel about the meetings you have with health professionals and social workers about your care.'    
  ]
};

export const QuestionIncludes: Record<DomainKey, string[]> = {
  [Domains.Mental]: [
    'How you cope with things that are stressful.',
    'How you cope with things changing.',
    'Whether you are able to manage the things that are important to you, like work or hobbies.',
    'How you cope with your feelings.'
  ],
  [Domains.Physical]: [
    'The food that you eat, for example eating a healthy diet.',
    'Your weight.',
    'Exercise and staying fit.',
    'Diseases or illnesses that make you feel unwell.',
    'Having pain in your body.',
    'Not being able to go to the toilet.',
    'Help you have had from your doctor.',
    'Help you have had from Specialists like the Dentist or a Physiotherapist.'
  ],
  [Domains.Work]: [
    'If you enjoy your job.',
    'If you are able to do things that you need to do at work.',
    'If you are able to cope with the work you need to do.',
    'If you get on with people at work.'
  ],
  [Domains.Learning]: [
    'If you enjoy your learning.',
    'If you are able to do things that you need to do at school or college.',
    'If you are able to cope with the learning you need to do.',
    'If you get on with people at school or college.'
  ],
  [Domains.Home]: [
    'The area you live in.',
    'The people you live with.',
    'The type of home you live in.',
    'If you have a choice about where you live.'
  ],
  [Domains.Leisure]: [
    'If you have enough to do in your day.',
    'If you enjoy the things you do in your day.',
    'If you have time or energy to do things in your day.',
    'If it is easy for you to do the activities you enjoy.'
  ],
  [Domains.Family]: [
    'If you get on well with them.',
    'If you feel supported by them.',
    'If you are able to see them when you want to.',
    'If you enjoy doing things together.',
    'Any difficulties with child care.'    
  ],
  [Domains.Friends]: [
    'If you have enough friends or if you have a partner.',
    'How you feel about meeting new people and making new friends.',
    'If you get on well with your friends or your partner.',
    'If you feel supported by your friends or your partner.',
    'If you are able to see your friends or your partner when you want to.',
    'If you are able to talk to your friends or your partner about the things that are important to you.',
    'How you feel about your relationship with your befriender.'
  ],
  [Domains.Safety]: [
    'If you feel safe in your home.',
    'If you feel safe in your local area.',
    'If you feel safe on public transport.',
    'If you feel safe to go out on your own.',
    'If you feel worried that you might be bullied.',
    'Any safeguarding issues you have, for example if you feel worried that you might be abused.'
   ],
  [Domains.Independence]: [
    'Picking what you want to wear.',
    'Deciding how to spend your money.',
    'Choosing the activities that you want to do and when you want to do them.',
    'Using public transport to go out and about.',
    'Being involved in decisions about your care.'
  ],  
  [Domains.Medication]: [
    'How you feel about the amount of medication you need to take.',
    'How you feel about the side effects of the medication you take – for example the effect on your health.',
    'If you are able to manage your medication on your own or the support you get to take your medication.',
    'How easily you can get your medication, for example from the pharmacy.',
    'If you think the medication is helping you.',
    'If you feel you have been given enough information about your medication.'    
  ],
  [Domains.Practical]: [
    'Help with your money.',
    'Help with where you live.',
    'Help with meeting other people.',
    'Help with getting around.',
    'If you feel like you have been given enough help.',
    'If you feel that the help you were given has made things easier.',
    'If you feel like you have been given the help you asked for.'
  ],
  [Domains.Meetings]: [
    'How you feel about when your meetings happen and if they happen often enough.',
    'If it is easy to ask for a meeting.',
    'If you think that the right professionals come to your meetings.',
    'If you are able to understand what is talked about.',
    'If you feel supported to say what you want to say and feel that people listen to you.',
    'If you feel that you talk about the things which are important to you in the meeting.',
    'If you feel like you understand what is going to happen next.'
  ]
};
