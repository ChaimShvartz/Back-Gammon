export type CreateResponse =
    | { success: true; code: string; name: string }
    | { success: false; error: string };

export type JoinResponse =
    | {
          success: true;
          code: string;
          players: { name: string; color: string }[];
      }
    | { success: false; error: string };
