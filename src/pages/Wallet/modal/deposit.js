/* eslint-disable react/prop-types */
import React from "react"
import { Modal } from "reactstrap"

import FormData from "../form/deposit"

export const ModalDeposit = (props) => {
  return (
    <Modal
      isOpen={props.active.value === "deposit"}
      backdrop={"static"}>
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">Deposit</h5>
        <button type="button" className="btn-close" onClick={() => props.active.set()} aria-label="Close" />
      </div>
      <FormData {...props} />
    </Modal>
  )
}