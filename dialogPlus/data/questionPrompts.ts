
import { Domains, DomainKey } from "./assessment";

export const QuestionPrompts: Record<DomainKey, string[]> = {
  [Domains.Mental]: [
    'This question is asking about your thoughts, feelings and how you behave.'
  ],
  [Domains.Physical]: [
    'This question is asking you how you feel about the health of your body.'
  ],
  [Domains.Home]: [
    'This question is asking you how you feel about where you live.'
  ],
  [Domains.Activities]: [
    'This question is asking you how you feel about the things you do during the day including:',
    'Hobbies',
    'Your day service',
    'Exercise',
    'Spending time with your friends'
  ],
  [Domains.Work]: [
    'This question is asking you about your job (if you have one) or your college (if you go).'
  ],
  [Domains.Family]: [
    'This question is asking about how how you feel about your family.',
    'This could mean relationships with your children and your unpaid carers.'    
  ],
  [Domains.Friends]: [
    'This question is asking you about the relationships you have with:',
    'Your friends',
    'And / or a romantic partner.'    
  ],
  [Domains.Safety]: [
    'This question is asking you how safe you feel:',
    'Inside your home',
    'Outside your home / in your area'
  ],
  [Domains.Independence]: [
    'This question is asking you about:',
    'Being able to do things for yourself',
    'Making your own choices.'
  ],
  [Domains.Communication]: [
    'This question is about how you find communicating with others.'
  ],
  [Domains.Medication]: [
    'This question is asking about the medicines you take, which includes:',
    'Pills, Tablets, Liquid medicine, Injections'
  ],
  [Domains.Support]: [
    'This question is asking about the help that you are given from support workers, paid carers, and family carers.'
    +' \nSupport might help you with:',
    'Money', 'Where you live', 'Hobbies and Interests', 'Taking medication', 'Meeting other people',
    'Getting around your area'
  ],
  [Domains.Meetings]: [
    'This question is asking about the meetings you have with doctors, nurses, and social workers about your care.'    
  ]
};

export const QuestionIncludes: Record<DomainKey, string[]> = {
  [Domains.Mental]: [
    'How you manage with things that are stressful.',
    'How you manage with things changing.',
    'How you cope with your feelings.',
    'How happy you are with any treatment and support you are having.'
  ],
  [Domains.Physical]: [
    'How happy you are with the food that you eat and if you have a healthy diet.',
    'If you are able to exercise and keep fit.',
    'Whether you have diseases or ilnesses that make you feel unwell or in pain.',
    'If you are able to go to the toilet.'
  ],
  [Domains.Work]: [
    'If you have a paid job or volunteer work.',
    'How much you enjoy your job or college',
    'How you are managing with the work you need to do.',
    'How well you are getting on with people at work or college.'
  ],
  [Domains.Home]: [
    'How happy you are with the the area that you live in.',
    'How you feel about people you live with.',
    'Whether you like the type of home you live in.',
    'If you have a choice about where you live.'
  ],
  [Domains.Activities]: [
    'If you are happy with how much you are doing.',
    'If you have support hours to do things when you would like to.',
    'If you would like to try or learn something new.'
  ],
  [Domains.Family]: [
    'How well you get on with your family.',
    'Whether you feel supported by your family.',
    'If you are able to see them your family when you want to.',
    'If you enjoy doing things with your family.'   
  ],
  [Domains.Friends]: [
    'How you feel about meeting new people and making new friends.',
    'How well you get on with your friends or your romantic partner.',
    'If you are able to see your friends or your partner when you want to.'
  ],
  [Domains.Safety]: [
    'How safe you feel with the people you live with.',
    'If you feel worried that you might be bullied.',    
    'If you need someone with you when going out.',
    'If you feel safe on public transport.',
  ],
  [Domains.Independence]: [
    'Whether you can pick out what you want to wear.',
    'If you are able to decide how to spend your money.',
    'Whether you can choose the activities that you want to do and when you want to do them.',
    'If you feel involved in decisions about your care.'
  ],
  [Domains.Communication]: [
    'If people are able to understand what you want to say.',
    'Whether you can understand what is being said to you.',
    'If you have visual aids to help you.',
    'If you use sign language or body language.',
    'Whether you have any technology that you need.'
  ],
  [Domains.Medication]: [
    'If you know:\nWhich medications you are taking.\nWhen to take your medication.'
    +'How much medication you are taking.\nWhat your medication is for.',
    'How easily you can get your medication, for example from the chemist.',
    'If you have been given enough easy-read informaton about your medication.',
    'How your medication makes you feel and if you have any reactions.',
  ],
  [Domains.Support]: [
    'Whether you have enough support.',
    'If the support you were given has helped.',
    'Whether you have been given the support you asked for and feel listened to.'
  ],
  [Domains.Meetings]: [
    'Whether you meet them often enough.',
    'If  the right people come to your meetings.',
    'Whether you are able to understand what is talked about.',
    'If you are able to say what you want to say.',
    'Whether you feel involved in your care and listened to.',
  ]
};
