export const ADD_NOTE = 'ADD_NOTE';

export function addNote(BookedBy , Distance , Duration , From , To , Price , StartCoords , EndCoords , StartDate , StartTime ,ID, Email , LoadType , CarsNum) {
  return { 
     type: ADD_NOTE,

     BookedBy:BookedBy,
     From: From,
     To: To ,
     Distance:Distance ,
     Duration:Duration ,
     Price:Price,
     StartCoords:StartCoords,
     EndCoords: EndCoords,
     ID: ID,
     Email:Email,
     StartDate:StartDate,
     StartTime:StartTime   
    };
}

