import { XCircleIcon } from '@heroicons/react/solid'

const ErrorBox = ({ message, errors }) => {
  const errorRows = Array.isArray(errors) ? errors : [{ message: message }]

  return (
    errorRows.map((error, index) => (
      <div className="rounded-md bg-red-50 p-4" key={index} >
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true"/>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-red-800">{error?.message}</p>
          </div>
        </div>
      </div>
    ))
  )
}

export default ErrorBox
