export type NewClick = {
  dateCreated: number;
  phase: string;
};

export const isNewClick = (value: Record<string, unknown>): value is NewClick => {
  return (
    value &&
    typeof value.dateCreated === 'number' &&
    typeof value.phase === 'string'
  );
};