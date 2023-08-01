// const getXpQueryPOST = `
// query {
//   user {
//     login
//     id
//     xpAmount: transactions_aggregate(
//       where: {
//         type: { _eq: "xp" }
//         _or: [
//           { attrs: { _eq: {} } }
//           { attrs: { _has_key: "group" } }
//         ]
//         _and: [
//           { path: { _nlike: "%/piscine-js/%" } }
//           { path: { _nlike: "%/piscine-go/%" } }
//         ]
//       }
//     ) {
//       aggregate {
//         sum {
//           amount
//         }
//       }
//     }
//   }
// }`

//   if (!token) {
//     // Redirect to login page
//     console.error('Token not found, redirecting to login page...')
//     window.location.href = './index.html'
//     return
//   }
//   fetch(GRAPHQL_ENDPOINT, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token || ''}`
//     },
//     body: JSON.stringify({
//       query: getXpQueryPOST
//     })
//   })
//     .then(response => response.json())
//     .then(data => {
//       const [user] = data.data.user
//       const totalAmount = user.xpAmount.aggregate.sum.amount
//       const amountInKb = totalAmount / 1000

//       xpContainer.textContent = `Total amount of xp: ${(amountInKb).toFixed(0)} kb`
//       // userInfo.appendChild(totalAmountElement)


//     })
//     .catch(error => {
//       console.error(error)
//     })
// }
