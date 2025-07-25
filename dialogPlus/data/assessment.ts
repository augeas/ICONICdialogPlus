
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

export const pluralSessions = (nsessions: number) => {
  switch(nsessions) {
    case 0: return 'No sessions for ';
    case 1: return '1 session for ';
    default: return nsessions + ' sessions for ';
  }
}

export enum Domains {
  Mental = 0,
  Physical,
  Work,
  Learning,
  Home,
  Leisure,
  Family,
  Friends,
  Safety,
  Independence,
  Medication,
  Practical,
  Meetings,
};

export type DomainKey = keyof typeof Domains;


//1. How happy are you with your mental health?
//2. How happy are you with your physical health?
//3. How happy are you with your work?
//4. How happy are you with your learning?
//5. How happy are you with where you live?
//6. How happy are you with your day activities?
//7. How happy are you about your relationships with your family?
//8. How happy are you about your friendships?
//9. How happy are you about feeling safe in your home or outside?
//10. How happy are you about your independence?
//11. How happy are you with your medication?
//12. How happy are you with the support that you get from care workers?
//13. How happy are you about your meetings with your care team?

export const DomainTitles: Record<DomainKey, string> = {
  [Domains.Mental]: 'Mental Health',
  [Domains.Physical]: 'Physical Health',
  [Domains.Work]: 'Work',
  [Domains.Learning]: 'Learning',
  [Domains.Home]: 'Where You Live',
  [Domains.Leisure]: 'Day Activities',
  [Domains.Family]: 'Family',
  [Domains.Friends]: 'Friendships',
  [Domains.Safety]: 'Feeling Safe',
  [Domains.Independence]: 'Independence',  
  [Domains.Medication]: 'Medication',
  [Domains.Practical]: 'Support',
  [Domains.Meetings]: 'Meetings'
};

export const DomainPrompts: Record<DomainKey, string> = {
  [Domains.Mental]: 'with your mental health',
  [Domains.Physical]: 'with your physical health',
  [Domains.Work]: 'with your work',
  [Domains.Learning]: 'with your learning',  
  [Domains.Home]: 'with where you live',
  [Domains.Leisure]: 'with your day activities',
  [Domains.Family]: 'about your relationships with your family',
  [Domains.Friends]: 'about your friendships',
  [Domains.Safety]: 'about feeling safe in your home or outside',
  [Domains.Independence]: 'about your independence',
  [Domains.Medication]: 'with your medication',
  [Domains.Practical]: 'with the support that you get from care workers',
  [Domains.Meetings]: 'about your meetings with your care team'
};

export const Responses: Record<number, string> = {
  1: 'Unhappy',
  2: 'Not Sure',
  3: 'Happy',
};

export const IconScale: Record<number, string> = {
  1: 'fa-face-sad-cry',
  2: 'fa-face-meh',
  3: 'fa-face-smile-beam',
};

export const SmileyScaleIcon: Record<number, string> =
{
  1: 'emoticon-frown',
  2: 'emoticon-neutral',
  3: 'emoticon'
}

export const SmileyScaleColour: Record<number, string> =
{
  1: 'red',
  2: 'yellow',
  3: 'lime'
}


export const GlyphScale: Record<number, number> = {
  1: 128557,
  2: 128528,
  3: 128522,
}



type Question = {
 score: number;
 moreHelp?: boolean;
 actionItems?: String[];
}

export const pluralItems = (q: Question, k: DomainKey) => {
  const nItems = q.actionItems ? len(q.actionItems) : 0;
  const title = DomainTitles[k];
  switch(nItems) {
    case 0: return 'No action items for ' + title;
    case 1: return '1 action item for ' + title;
    default: return nItems + ' action items for ' + title;
  }
}

type Assessment = {
  timeStamp: Date;
  questions: Record<DomainKey, Question>;
}

interface assessmentsState {
  assessments: Record<string, Assessment[]>
  addAssessment: (clientId: string, assess: Assessment) => void;
}

export const useAssesmentsStore = create<assessmentsState>() (
  persist(
    (set) => ({
      assessments: {},
      addAssessment: (clientId: string, assess: Assessment[]) =>
        set((state) => ({
          assessments: {
            ...state.assessments, [clientId]: [...(state.assessments[clientId] ? state.assessments[clientId] : []), assess]
          }
        })
      )
    }),
    {name: 'assessment-storage', storage: createJSONStorage(() => localStorage)}
  ),
);


