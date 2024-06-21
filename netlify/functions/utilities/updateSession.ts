import { Args } from './types';

export type UpdateSessionArgs = Args & {
  sessionId: string;
  clicks: number[];
  phase: number;
  mobile: boolean;
};

const updateSession = async ({
  db,
  schema,
  sessionId,
  clicks,
  phase,
  mobile,
}: UpdateSessionArgs) => {
  await Promise.all(
    clicks.map((click, index) => {
      const timestamp = index === 0 ? click : clicks[0] + click;

      return db.insert(schema.clicks).values({
        sessionId,
        dateCreated: new Date(timestamp),
        phase,
        mobile,
      });
    }),
  );
};

export default updateSession;
