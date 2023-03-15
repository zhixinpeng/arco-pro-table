declare module 'vue' {
  export interface GlobalComponents {
    ArcoProTable: typeof import('./pro-table').ProTable
  }
}

export {}
