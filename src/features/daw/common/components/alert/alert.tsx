export type AlertProps = {
  status: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string

  action?: {
    label: string
    onClick: () => void
  }
}

export const Alert = ({ status, message, title, action }: AlertProps) => {
  const statusToColor = {
    success: 'green',
    error: 'red',
    warning: 'yellow',
    info: 'blue',
  }
  const color = statusToColor[status]
  return (
    <div
      className={`p-4 text-${color}-800 border border-${color}-300 rounded-lg bg-${color}-50 dark:bg-gray-800 dark:text-${color}-400 dark:border-${color}-800`}
      role="alert"
    >
      <div className="flex items-center">
        <svg
          className="flex-shrink-0 w-4 h-4 me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <div className="mt-2 mb-4 text-sm">{message}</div>

      {action?.label && action?.onClick && (
        <div className="w-full flex flex-row items-center justify-center">
          <button
            onClick={action.onClick}
            className={`text-${color}-800 bg-${color}-200 border border-${color}-300 dark:bg-${color}-200  rounded-md px-2 py-1`}
          >
            {action.label}
          </button>
        </div>
      )}
    </div>
  )
}
