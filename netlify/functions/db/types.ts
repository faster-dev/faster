export type NewClick = {
  dateCreated: string;
  phase: string;
};

export const isNewClick = (value: Record<string, unknown>): value is NewClick => {
  return value && typeof value.dateCreated === 'string' && typeof value.phase === 'string';
};
