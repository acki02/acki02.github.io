// function fetchAuditGiven (token, GRAPHQL_ENDPOINT) {
//     const auditGiven = `
//     query {
//       transaction(where: {
//         type: { _eq: "up" }
//         path: { _like: "%school-curriculum%"
//                _nregex: "^/gritlab/school-curriculum/piscine-js/.*"
//         }
//       })
//       {
//         type
//         path
//         objectId
//         object {
//           name
//         }
//         amount
//         createdAt
//       }
//     }
//     `
//     if (!token) {
//       // Redirect to login page
//       console.log('Token not found, redirecting to login page...')
//       window.location.href = './index.html'
//     } else {
//       fetch(GRAPHQL_ENDPOINT, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token || ''}`
//         },
//         body: JSON.stringify({
//           query: auditGiven
//         })
//       })
//         .then(response => response.json())
//         .then(data => {
//           console.log('Data:', data)
//           const transactions = data.data.transaction
//           console.log('Transactions:', transactions)

//           const totalAmount = transactions.reduce(
//             // reduce() method executes a reducer function (that you provide) on each element of the array, resulting in single output value.
//             (acc, transaction) => acc + transaction.amount,
//             0
//           )

//           const amountInKb = totalAmount / 1000
//           dataReceiverDone(amountInKb)
//           auditDone.textContent = `Total amount of audit xp done: ${amountInKb} kb`
//         })
//         .catch(error => {
//           console.error(error)
//         })
//     }
//   }


//   function fetchAuditReceived (token, GRAPHQL_ENDPOINT) {
//     const auditReceive = `
//     query {
//       transaction(where: {
//         type: { _eq: "down" }
//         path: { _like: "%school-curriculum%"
//                _nregex: "^/gritlab/school-curriculum/piscine-js/.*"
//         }
//       })
//       {
//         type
//         path
//         objectId
//         object {
//           name
//         }
//         amount
//         createdAt
//       }
//     }
//     `
//     if (!token) {
//       // Redirect to login page
//       console.log('Token not found, redirecting to login page...')
//       window.location.href = './index.html'
//     } else {
//       fetch(GRAPHQL_ENDPOINT, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token || ''}`
//         },
//         body: JSON.stringify({
//           query: auditReceive
//         })
//       })
//         .then(response => response.json())
//         .then(data => {
//           console.log('Data:', data)
//           const transactions = data.data.transaction
//           console.log('Transactions:', transactions)

//           const totalAmount = transactions.reduce(
//             // reduce() method executes a reducer function (that you provide) on each element of the array, resulting in single output value.
//             (acc, transaction) => acc + transaction.amount,
//             0
//           )


//           const amountInKb = totalAmount / 1000
//           dataReceiverReceived(amountInKb) // this is 248

//           auditReceived.textContent = `Total amount of audit xp received: ${amountInKb} kb`
//           // userInfo.appendChild(auditReceivedElement)
//         })
//         .catch(error => {
//           console.error(error)
//         })
//     }
//   }
