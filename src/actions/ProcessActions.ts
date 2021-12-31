export type ProcessActions =
  | {
      type: 'PROCESS_APPLY';
    }
  | {
      type: 'PROCESS_EVALUATE';
    }
  | {
      type: 'PROCESS_DECISION';
    };
