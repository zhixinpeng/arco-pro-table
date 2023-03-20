declare module 'vue' {
  export interface GlobalComponents {
    ArcoProTable: typeof import('./ProTable').ProTable
  }
}

export {}
