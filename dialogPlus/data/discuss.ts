
export enum Steps {
  Understanding = 1,
  Forward,
  Options,
  Actions
}

export type StepKey = keyof typeof Steps;

export const StepNames: Record<StepKey, string> = {
  [Steps.Understanding]: 'Understanding',
  [Steps.Forward]: 'Looking Forward',
  [Steps.Options]: 'Considering Options',
  [Steps.Actions]: 'Agreeing on Actions'
}

export const StepPrompts: Record<StepKey, string[]> = {
    [Steps.Understanding]: [
        'What is not going well?',
        'What is going well?'
    ],
    [Steps.Forward]: [
      'What would be the best situation for you?\n(give examples)',
      'What would be the be a little better?\n(give examples)'
    ],
    [Steps.Options]: [
        'What can you do?\n(give examples of possible actions)',
        'What can I do?\n(give examples of possible actions)',
        'What can others do to help?\n(give examples of possible actions)',
    ]
}
