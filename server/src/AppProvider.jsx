// import React from 'react';
// import { useReducer } from 'react';
// import { createContext } from 'react';

// export const appContext = createContext();

// export function AppProvider(props) {

//     const ACTION = {
//         LOAD: 'load',
//       };


//     function app_state_reducer(state, action) {
//         switch (action.type) {
//             case 'load':
//                 return {
//                     ...state,
//                     posts: action.payload,
//                 }
//             default:
//                 return state;
//         }
//     }
    
//       const initialState = {
//         posts: []
//       };
    



//     const [app_state, dispatch] = useReducer(app_state_reducer, initialState);

//     return (
//         <gameContext.Provider value={{ app_state, dispatch, ACTION }}>
//           {props.children}
//         </gameContext.Provider>
//       );
// }