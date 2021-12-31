import { ProcessActions } from './../actions/ProcessActions';

interface ProcessState {
  apply: boolean;
  evaluate: boolean;
  decision: boolean;
}

type Reducer = (state: ProcessState, action: ProcessActions) => ProcessState;

export const processReducer: Reducer = (state, action) => {
  switch (action.type) {
    case 'PROCESS_APPLY': {
      return {
        ...state,
        apply: true
      };
    }

    case 'PROCESS_EVALUATE': {
      return {
        ...state,
        evaluate: true
      };
    }

    case 'PROCESS_DECISION': {
      return {
        ...state,
        decision: true
      };
    }

    default:
      return state;
  }
};
