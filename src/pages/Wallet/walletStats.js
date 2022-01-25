/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import {
  Card,
  CardBody,
  Col,
  Row,
} from "reactstrap"
import { Link } from "react-router-dom"

import * as storage from "helpers/storage"
import { getAccountDetail } from "api/User"

const WalletStats = (props) => {
  const [account, setAccount] = useState()

  const fetchAccount = async () => {
    const response = await getAccountDetail(storage.CURRENT_USER?.username)
    if (response) {
      setAccount(response)
    }
  }

  useEffect(() => {
    fetchAccount()
  }, [props.active.value])

  return (
    <Card>
      <CardBody>
        <div className="d-flex">
          <div className="me-4">
            <i className="mdi mdi-account-circle text-primary h1" />
          </div>

          <div className="flex-grow-1">
            <div className="text-muted">
              <h5>{storage.CURRENT_USER?.name}</h5>
              <p className="mb-1">{storage.CURRENT_USER?.username}</p>
              <p className="mb-0">Phone: {storage.CURRENT_USER?.phone_number}</p>
            </div>
          </div>
        </div>
      </CardBody>
      <CardBody className="border-top">
        <Row>
          <Col>
            <div>
              <p className="text-muted mb-2">Available Balance</p>
              <h5>${account?.balance}</h5>
            </div>
          </Col>
        </Row>
      </CardBody>
      <CardBody className="border-top">
        <div className="text-center">
          <Row>
            <Col sm="4">
              <div>
                <div className="font-size-24 text-primary mb-2">
                  <i className="bx bx-send" />
                </div>

                <div className="mt-3">
                  <Link to="#" className="btn btn-primary btn-sm w-md" onClick={() => props.active.set("transfer")}>
                    Transfer
                  </Link>
                </div>
              </div>
            </Col>
            <Col sm="4">
              <div className="mt-4 mt-sm-0">
                <div className="font-size-24 text-primary mb-2">
                  <i className="bx bx-import" />
                </div>

                <div className="mt-3">
                  <Link to="#" className="btn btn-primary btn-sm w-md" onClick={() => props.active.set("deposit")}>
                    Deposit
                  </Link>
                </div>
              </div>
            </Col>
            <Col sm="4">
              <div className="mt-4 mt-sm-0">
                <div className="font-size-24 text-primary mb-2">
                  <i className="bx bx-wallet" />
                </div>

                <div className="mt-3">
                <Link to="#" className="btn btn-primary btn-sm w-md" onClick={() => props.active.set("withdraw")}>
                    Withdraw
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </CardBody>
    </Card>
  )
}

WalletStats.propTypes = {
  wallet: PropTypes.any,
  isMenu: PropTypes.bool,
  toggleMenu: PropTypes.func,
}

export default WalletStats
