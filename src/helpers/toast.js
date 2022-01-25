import toastr from "toastr"
import "toastr/build/toastr.min.css"

const toast = (message, type) => {
  switch (type) {
    case 'success':
      return toastr.success(message)
    case 'error':
      return toastr.error(message)
    default:
      return toastr.info(message)
  }
}

export default toast