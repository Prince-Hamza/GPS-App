import { ADD_NOTE } from './actions.js';

const initialState = {
  notes: []
};

function rootReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_NOTE:
      return {
        notes: [
          // ...state.notes,
          {
            title:action.title,
            content:action.content,
            BookedBy: action.BookedBy,
            Distance: action.Distance,
            Duration: action.Duration,
            From: action.From,
            To: action.To,
            Price:action.Price,
            StartCoords:action.StartCoords,
            EndCoords: action.EndCoords,
            ID: action.ID,
            Email:action.Email,
            StartDate:action.StartDate,
            StartTime:action.EndDate,
            LoadType:action.LoadType,
            CarsNum:action.CarsNum,
            Status:action.Status
          }
        ]
      };

    default:
      return state;
  };
}

export default rootReducer;