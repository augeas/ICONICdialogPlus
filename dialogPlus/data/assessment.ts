
import { create } from 'zustand';
import { persist, subscribeWithSelector, createJSONStorage } from 'zustand/middleware'
import { jsonToCSV } from 'react-native-csv'

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
  Home,
  Activities,
  Work,
  Family,
  Friends,
  Safety,
  Independence,
  Communication,
  Medication,
  Support,
  Meetings,
};

export type DomainKey = keyof typeof Domains;

export const DomainTitles: Record<DomainKey, string> = {
  [Domains.Mental]: 'Mental Health',
  [Domains.Physical]: 'Physical Health',
  [Domains.Home]: 'Your Home',
  [Domains.Activities]: 'Day Activities',
  [Domains.Work]: 'Work or College',
  [Domains.Family]: 'Family',
  [Domains.Friends]: 'Friendships',
  [Domains.Safety]: 'Your Safety',
  [Domains.Independence]: 'Independence',
  [Domains.Communication]: 'Communication',
  [Domains.Medication]: 'Medication',
  [Domains.Support]: 'Support from Carers',
  [Domains.Meetings]: 'Meetings'
};

export const DomainPrompts: Record<DomainKey, string> = {
  [Domains.Mental]: 'with your mental health',
  [Domains.Physical]: 'with your physical health',
  [Domains.Work]: 'with your work',
  [Domains.Home]: 'with where you live',
  [Domains.Activities]: 'with your day activities',
  [Domains.Family]: 'about your relationships with your family',
  [Domains.Friends]: 'about your friendships',
  [Domains.Safety]: 'about feeling safe in your home or outside',
  [Domains.Independence]: 'about your independence',
  [Domains.Communication]: 'with the way you communicate with other people',
  [Domains.Medication]: 'with your medication',
  [Domains.Support]: 'with the support that you get from care workers',
  [Domains.Meetings]: 'about your meetings with your care team'
};

export const Responses: Record<number, string> = {
  1: 'Unhappy',
  2: 'In The Middle / Not Sure',
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

function questionItemCount(q: Question): number {
  return q.actionItems ? q.actionItems.length: 0;
}

export const pluralItems = (q: Question, k: DomainKey) => {
  const nItems = questionItemCount(q);
  const title = DomainTitles[k];
  switch(nItems) {
    case 0: return 'No Action Items for "' + title + '".';
    case 1: return '1 Action Item for "' + title  + '":';
    default: return nItems + ' Action Items for "' + title  + '":';
  }
}

type Assessment = {
  timeStamp: Date;
  questions: Record<DomainKey, Question>;
}

function assessmentMaxItems(a: assessment): number {
    return Math.sum(Object.entries(a.questions).map(([k, q])=>(questionItemCount(q))));
}

function serQuestion([domain, q]) {
  const name = Domains[domain];
  return new Map([
    [name+'_score', Responses[q.score]],
    [name+'_help', q.moreHelp]
  ]);
}

function serActionItems([domain, q]) {
  const name = Domains[domain];
  return new Map([
    [name+'_action_items', q.actionItems ? q.actionItems.join('\n') : ''] 
  ]);
  
}

function flatten(col) {
  return col.map((e)=>(Array.from(e))).flat()
}

function serAssessment(assess: Assessment) {
  const questions = Object.entries(assess.questions).map(serQuestion);
  const items = Object.entries(assess.questions).map(serActionItems);
  return new Map([['date', assess.timeStamp], ...flatten(questions), ...flatten(items)]);
}

export function assessmentsToCSV(client: String, assessments: Assessment[]): String {
  const base = {service_user: client}
  const rows = assessments ? assessments.map(serAssessment) : [];
  return jsonToCSV(JSON.stringify(
    rows.map((e)=>({...base, ...Object.fromEntries(e)}))
  ));
}

interface assessmentsState {
  assessments: Record<string, Assessment[]>
  addAssessment: (clientId: string, assess: Assessment) => void;
  dropAssessment: (clientId: string, assessmentId: string) => void;
  updateAssessment: (clientId: string, assess: Assessment) => void;
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
      ),
      dropAssessment: (clientId: string, assessmentId: string) =>
        set((state) => ({
          assessments: {
            ...state.assessments, [clientId]: state.assessments[clientId].filter(
              (assess: Assessment) => assess.timeStamp != assessmentId
            )
          }
        })
      ),
      updateAssessment: (clientId: string, assess: Assessment) =>
        set((state) => ({
          assessments: {
            ...state.assessments, [clientId]: state.assessments[clientId].map(
                (a: Assessment) => a.timeStamp == assess.timeStamp ? assess : a
            )
          }
        })
      ),
      _hasHydrated: false,
      setHasHydrated: (state) => {set({_hasHydrated: state});}
    }),
    {
      name: 'assessment-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: (state) => {return () => state.setHasHydrated(true)}
    }
  ),
);

