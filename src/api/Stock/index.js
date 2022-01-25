import { del, get, post, put } from "helpers/api-helper"
import * as url from "helpers/url-helper"
import * as storage from "helpers/storage"

export const getDepositStocks = () => {
  return get(
    `${url.STOCK_DEPOSIT}`,
  )
}

export const getWithdrawStocks = () => {
  return get(
    `${url.STOCK_WITHDRAW}`,
  )
}