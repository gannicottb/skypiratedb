// import * as React from 'react'

// type PaginationState = {
//   perPage: number;
//   currentPage: number;
//   numPages: number;
// }

// // Wrap useReducer .. ... maybe dumb
// export const usePagination = ({
//   totalCount,
//   pageSize
// }) => {
//   const init = (pageSize) => {
//     console.log(`initializing pagination with ${totalCount}`)
//     return (
//       { perPage: pageSize, currentPage: 1, numPages: Math.ceil(totalCount / pageSize) }
//     )
//   }
//   const reducer = (state: PaginationState, action) => {
//     switch (action.type) {
//       case 'next':
//         return {
//           ...state,
//           currentPage: state.currentPage < state.numPages ? state.currentPage + 1 : state.currentPage
//         }
//       case 'previous':
//         return {
//           ...state,
//           currentPage: state.currentPage > 1 ? state.currentPage - 1 : state.currentPage
//         }
//       case 'first':
//         return {
//           ...state,
//           currentPage: 1
//         };
//       case 'last':
//         return {
//           ...state,
//           currentPage: state.numPages
//         };
//       case 'setPerPage':
//         const newPerPage = Number(action.payload)
//         return {
//           ...state,
//           currentPage: 1, // hack
//           perPage: newPerPage,
//           numPages: Math.ceil(totalCount / newPerPage)
//         };
//       default:
//         console.log(`Pagination received unknown action ${action}.`)
//         return state
//     }
//   }

//   return React.useReducer(reducer, pageSize, init)
// };