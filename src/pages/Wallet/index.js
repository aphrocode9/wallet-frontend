import React, { useState } from "react"
import MetaTags from "react-meta-tags"
import PropTypes from "prop-types"
import { Col, Container, Row } from "reactstrap"
import { withRouter } from "react-router-dom"
import "assets/scss/datatables.scss"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import WalletActivities from "./walletActivities"
import WalletStats from "./walletStats"

import { ModalDeposit, ModalWithdraw, ModalTransfer } from "./modal"

const Wallet = props => {
  const [activeTab, setActiveTab] = useState("1")
  const [activeModal, setActiveModal] = useState()

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Wallet | Skote - React Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Wallet" breadcrumbItem="Info" />
          <Row>
            <Col xl="4">
              <WalletStats active={{ value: activeModal, set: setActiveModal }} />
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <WalletActivities
                activeTab={activeTab}
                toggleTab={toggleTab}
                active={{ value: activeModal, set: setActiveModal }}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <ModalDeposit active={{ value: activeModal, set: setActiveModal }} />
      <ModalWithdraw active={{ value: activeModal, set: setActiveModal }} />
      <ModalTransfer active={{ value: activeModal, set: setActiveModal }} />
    </React.Fragment>
  )
}

Wallet.propTypes = {
  wallet: PropTypes.any,
  onGetWallet: PropTypes.func,
}

export default withRouter(Wallet)
