/* eslint-disable react/prop-types */
import React from "react"
import { Modal } from "reactstrap"

import FormData from "../form/withdraw"

export const ModalWithdraw = (props) => {
  return (
    <Modal
      isOpen={props.active.value === "withdraw"}
      backdrop={"static"}>
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">Withdraw</h5>
        <button type="button" className="btn-close" onClick={() => props.active.set()} aria-label="Close" />
      </div>
      <FormData {...props} />
    </Modal>
  )
}