declare namespace React {
  interface HTMLAttributes<T> extends HTMLAttributes<T> {
    clstag?: string
  }
  interface RefAttributes<T> extends RefAttributes<T> {
    clstag?: string
  }
}

declare function expLogJSON(bizName: string, functionName: string)

