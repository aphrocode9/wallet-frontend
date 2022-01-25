/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Label,
  Button,
} from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";

import { useForm } from "react-hook-form";
import { transfer } from "api/Transaction"

import * as storage from "helpers/storage";
import toast from "helpers/toast"

const FormData = props => {
  const [alert, setAlert] = useState()

  const { register, handleSubmit, formState: { errors } } = useForm({})

  const postTransfer = async (data) => {
    const response = await transfer(data)
    if (response && !response?.message) {
      toast("Transfer Success", "success")
      props.active.set()
    } else {
      setAlert(true)
    }
  }

  const onSubmit = (data) => {
    data.from_id = storage.CURRENT_USER.account.id
    data = { transfer: data }
    postTransfer(data)
  }

  return (
    <div className="crypto-buy-sell-nav">
      <Form onSubmit={handleSubmit(onSubmit)} className="p-4">
        <div className="mb-3">
          <Label>To (Account Number)</Label>
          <input type="number" className="form-control" {...register("to_id", { required: true })} />
        </div>
        <div className="mb-3">
          <Label>Amount</Label>
          <input type="number" className="form-control" {...register("amount", { required: true })} />
        </div>
        <div className="text-center mt-4">
          <Button type="submit" color="success">
            Transfer
          </Button>
        </div>
      </Form>
      {alert && (
        <SweetAlert
          title="Transfer Fail"
          error
          confirmBtnBsStyle="success"
          onConfirm={() => {
            setAlert(false)
          }}>
        </SweetAlert>
      )}
    </div>
  )
}

export default FormData