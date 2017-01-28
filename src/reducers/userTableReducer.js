export default function reducer(state={
    fixedHeader: false,
    fixedFooter: false,
    stripedRows: true,
    showRowHover: true,
    selectable: true,
    multiSelectable: true,
    enableSelectAll: true,
    deselectOnClickaway: true,
    showCheckboxes: true,
    height: '400px',
    openConfig: false
}, action) {
    console.log(action);

    switch (action.type) {
      case 'UPDATE_USER_TABLE_CONFIG':
        const key = Object.keys(action.payload)[0];
        console.log("action.payload: ", action.payload)
        console.log("key: ", key);
        console.log("value: ", action.payload[key]);
        return {...state, [key]: action.payload[key]};
      case 'TOGGLE_USER_TABLE_CONFIG':
        return {...state, openConfig: !state.openConfig}
      case 'CLOSE_USER_TABLE_CONFIG':
        return {...state, openConfig: false}
      default:
        return state;
    }
}
