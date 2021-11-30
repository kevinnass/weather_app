/*
App
Created at 09/04/2021 11:44
Author: Khaliq ALI
 */
import { mapState, mapMutations } from 'vuex'
export function reduce (acc, value) {
  acc[value] = {
    ...mapState('subscribe', { get: (state) => state[value] }),
    ...mapMutations('subscribe', {
      set: formatSetter(value)
    })
  }
  return acc
}

export function formatSetter (attr) {
  return 'set' + attr.charAt(0).toUpperCase() + attr.slice(1)
}

export const setter = key => (state, value) => (state[key] = value)

export function transformFileBase64 (file) {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader()
    reader.onload = function () {
      const base64 = btoa(reader.result)
      resolve(base64)
    }
    reader.onerror = function (event) {
      reader.abort()
      reject(event)
    }

    reader.readAsBinaryString(file)
  })
}

export function fileToDataURL (file) {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader()
    reader.onload = function () {
      const base64 = reader.result
      resolve(base64)
    }
    reader.onerror = function (event) {
      reader.abort()
      reject(event)
    }

    reader.readAsDataURL(file)
  })
}

export function getBase64OnDataURL (url) {
  let encoded = url.replace(/^data:(.*;base64,)?/, '')
  if ((encoded.length % 4) > 0) {
    encoded += '='.repeat(4 - (encoded.length % 4))
  }
  return encoded
}

export const mutator = attr => 'set' + attr.charAt(0).toUpperCase() + attr.slice(1)
