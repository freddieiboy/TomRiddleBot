import { createStore } from 'redux'

export const setHydrateUsers = (users) => {
  return {
    type: 'HYDRATE_USERS',
    users: users
  }
}

const initialState = {
  users: [],
  scheduledPrompt: {}
};

function users(state = initialState, action) {
  switch (action.type) {
    case 'HYDRATE_USERS':
      return {
        ...state,
        users: state.users.concat(action.users)
      }
    default:
      return state
    }
}

export let store = createStore(users)
