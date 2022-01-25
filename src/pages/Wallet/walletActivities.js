/* eslint-disable react/display-name */
import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Card, CardBody, NavItem, NavLink } from "reactstrap"
import classnames from "classnames"
import moment from "moment"

import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'

import * as storage from "helpers/storage"
import { getTransactionHistories } from "api/User"

const WalletActivities = ({ activeTab, toggleTab, active }) => {
  const [histories, setHistories] = useState()

  const fetchHistories = async () => {
    const response = await getTransactionHistories(storage.CURRENT_USER?.username)
    if (response) {
      setHistories(response)
    }
  }

  useEffect(() => {
    fetchHistories()
  }, [active.value])

  const columns = [{
    dataField: 'id',
    text: 'Amount',
    formatter: (cell, row) =>
      <React.Fragment>
        {row.subject === "receiver" ? (
          <div className="font-size-14 text-success d-flex align-items-center">
            <i className="bx bxs-up-arrow me-3" />
            ${row.fund.amount}
          </div>
        ) : (
          <div className="font-size-14 text-danger d-flex align-items-center">
            <i className="bx bxs-down-arrow me-3" />
            ${row.fund.amount}
          </div>
        )}
      </React.Fragment>
  }, {
    dataField: 'code',
    text: 'Tx Code'
  }, {
    dataField: 'fund_type',
    text: 'Tx Type'
  }, {
    dataField: 'created_at',
    text: 'Tx Date',
    formatter: (cell, row) => moment(row.created_at).format('MMMM Do YYYY, h:mm:ss a')
  }]

  return (
    <Card>
      <CardBody>
        <h4 className="card-title mb-4">Activities</h4>
        <ul className="nav nav-tabs nav-tabs-custom">
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "1",
              })}
              onClick={() => {
                toggleTab("1")
              }}
            >
              All
            </NavLink>
          </NavItem>
        </ul>

        <div className="mt-4">
          <BootstrapTable keyField='id' data={histories || []} columns={columns} pagination={paginationFactory()} />
        </div>
      </CardBody>
    </Card>
  )
}

WalletActivities.propTypes = {
  active: PropTypes.any,
  activeTab: PropTypes.string,
  toggleTab: PropTypes.func,
}

export default WalletActivities
