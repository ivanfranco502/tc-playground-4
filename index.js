import './style.css';
import { createStore } from 'redux';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// Reducers

const countReducer = (state = 0, action) => {
  switch(action.type) {
    case INCREMENT: return state + 1;
    case DECREMENT: return state - 1;
    case 'SET_COUNT': return action.newCount;
    default: return state;
  }
};

const otroReducer = (state = 0, action) => state;

const reducer = (state = {}, action) => {
  const count = countReducer(state.count, action);
  const otro = otroReducer(state, action);

  return {
    count,
    otro
  };
};

// STORE 

const store = createStore(reducer);

// ACTIONS
const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });

const setCount = newCount => ({
  type: 'SET_COUNT',
  newCount
});

// VIEW

const attachEvent = (id, action) => {
  const btn = document.getElementById(id);
  
  btn.addEventListener('click', () => {
    store.dispatch(action());
  });
};

attachEvent('increment-btn', increment);
attachEvent('decrement-btn', decrement);

const setBtn = document.getElementById('set-count');
setBtn.addEventListener('click', () => {
  store.dispatch(
    setCount(store.getState().count + 1)
  );
});

store.subscribe(() => {
  const countEle = document.getElementById('count');
  countEle.innerText = store.getState().count;
});