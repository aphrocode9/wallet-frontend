import { del, get, post, put } from "helpers/api-helper"
import * as url from "helpers/url-helper"
import * as storage from "helpers/storage"

export const deposit = (data) => {
  return post(
    url.DEPOSIT,
    data,
  )
}

export const withdraw = (data) => {
  return post(
    url.WITHDRAW,
    data,
  )
}

export const transfer = (data) => {
  return post(
    url.TRANSFER,
    data,
  )
}