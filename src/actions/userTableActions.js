export function update_table_config(config) {
  return {
    type: 'UPDATE_USER_TABLE_CONFIG',
    payload: config
  }
}

export function toggle_table_config() {
  return {
    type: 'TOGGLE_USER_TABLE_CONFIG',
  }
}

export function close_table_config() {
  return {
    type: 'CLOSE_USER_TABLE_CONFIG',
  }
}
