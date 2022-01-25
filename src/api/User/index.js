import { del, get, post, put } from "helpers/api-helper"
import * as url from "helpers/url-helper"
import * as storage from "helpers/storage"

export const getUserDetail = (username) => {
  return get(
    `${url.USER_DETAIL}/${username}`,
  )
}

export const getAccountDetail = (username) => {
  return get(
    `${url.USER_DETAIL}/${username}/account`,
  )
}

export const getTransactionHistories = (username) => {
  return get(
    `${url.USER_DETAIL}/${username}/transactions`,
  )
}