export const loadState = () => {
  try {
    const serializedstate = localStorage.getItem('state');
    if(serializedstate === null) {
      return undefined;
    }
    return JSON.parse(serializedstate);
  } catch(err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedstate = JSON.stringify(state);
    localStorage.setItem('state', serializedstate);
  } catch(err) {
    // Ingore write errors.
  }
}

export const clearState = () => {
  try {
    localStorage.clear();
  } catch(err) {
    alert("Error clearing localStorage. Please clear your browser history and reload to continue");
  }
}
