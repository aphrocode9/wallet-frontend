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
import { getWithdrawStocks } from "api/Stock";
import { withdraw } from "api/Transaction"

import * as storage from "helpers/storage";
import toast from "helpers/toast"

const FormData = props => {
  const [stocks, setStocks] = useState([])
  const [alert, setAlert] = useState()

  const fetchStocks = async () => {
    const response = await getWithdrawStocks()
    if (response) {
      setStocks(response)
    }
  }

  useEffect(() => {
    fetchStocks()
  }, [])

  const { register, handleSubmit, formState: { errors } } = useForm({})

  const postWithdraw = async (data) => {
    const response = await withdraw(data)
    if (response && !response?.message) {
      toast("Withdraw Success", "success")
      props.active.set()
    } else {
      setAlert(true)
    }
  }

  const onSubmit = (data) => {
    data.from_id = storage.CURRENT_USER.account.id
    data = { withdraw: data }
    postWithdraw(data)
  }

  return (
    <div className="crypto-buy-sell-nav">
      <Form onSubmit={handleSubmit(onSubmit)} className="p-4">
        <div className="mb-2">
          <Label>From</Label>
          <Row>
            {stocks.length > 0 && stocks.map(stock => (
              <Col md="6" key={stock.id}>
                <div className="mb-3">
                  <label className="card-radio-label mb-2">
                    <input
                      {...register("to_id", { required: true })}
                      type="radio"
                      className="card-radio-input"
                      value={stock.id}
                      readOnly
                    />
                    <div className="card-radio">
                      <div>
                        <span>{stock.name}</span><br />
                        <small>{stock.code}</small>
                      </div>
                    </div>
                  </label>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        <div className="mb-3">
          <Label>Amount</Label>
          <input type="number" className="form-control" {...register("amount", { required: true })} />
        </div>

        <div className="mb-3">
          <Label>Receiver Number</Label>
          <input type="number" className="form-control" {...register("receiver_number", { required: true })} />
        </div>
        <div className="text-center mt-4">
          <Button type="submit" color="success">
            Withdraw
          </Button>
        </div>
      </Form>
      {alert && (
        <SweetAlert
          title="Withdraw Fail"
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