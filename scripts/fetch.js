// profile page elements
const userInfo = document.querySelector('.user-info')


const nameContainer = document.querySelector('.nameContainer')
const xpContainer = document.querySelector('.xpContainer')
const auditContainer = document.querySelector('.auditContainer')
const loginName = document.querySelector('#loginName')
const auditDone = document.querySelector('#auditDone')
const auditReceived = document.querySelector('#auditReceived')



// this function fetches the name and login of the user
async function fetchName (token, GRAPHQL_ENDPOINT) {
  const name = `
  query {
    user{
      login
      firstName
      lastName
    }

    }
`

  if (!token) {
    // if token is not found
    // Redirect to login page
    console.log('Token not found, redirecting to login page...')
    window.location.href = './index.html'
  } else {
    // if token is found
    fetch(GRAPHQL_ENDPOINT, {
      // fetch the name and login of the user
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || ''}`
      },
      body: JSON.stringify({
        query: name
      })
    })
      .then(response => response.json())
      .then(data => {
        const user = data.data.user[0]


        loginName.textContent = `${user.login}`
        nameContainer.textContent = `Name: ${user.firstName} ${user.lastName}`
      })
      .catch(error => {
        console.error(error)
      })
  }
}

// this function fetches the total amount of xp
async function fetchXP (token, GRAPHQL_ENDPOINT) {
  const xp = `
query {
  transaction(where: {
    type: { _eq: "xp" }
    path: { _like: "%school-curriculum%"
           _nregex: "^/gritlab/school-curriculum/piscine-js/.*"
    }
  })
  {
    type
    path
    objectId
    object {
      name
    }
    amount
    createdAt
  }
}
`

  if (!token) {
    // Redirect to login page
    console.log('Token not found, redirecting to login page...')
    window.location.href = './index.html'
  } else {
    fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || ''}`
      },
      body: JSON.stringify({
        query: xp
      })
    })
      .then(response => response.json())
      .then(data => {
        const transactions = data.data.transaction

        const totalAmount = transactions.reduce(
          // reduce() method executes a reducer function (that you provide) on each element of the array, resulting in single output value.
          (acc, transaction) => acc + transaction.amount,
          0
        )


        const amountInKb = totalAmount / 1000



        xpContainer.textContent = `Total amount of xp: ${amountInKb.toFixed(0)} kb`
        // userInfo.appendChild(totalAmountElement)


      })
      .catch(error => {
        console.error(error)
      })
  }
}
async function fetchAudit(token, GRAPHQL_ENDPOINT) {
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token || ''}`
    }
  };

  const auditGiven = `
    query {
      transaction(where: {
        type: { _eq: "up" }
        path: { _like: "%school-curriculum%"
               _nregex: "^/gritlab/school-curriculum/piscine-js/.*"
        }
      })
      {
        type
        path
        objectId
        object {
          name
        }
        amount
        createdAt
      }
    }
  `;

  const auditReceive = `
    query {
      transaction(where: {
        type: { _eq: "down" }
        path: { _like: "%school-curriculum%"
               _nregex: "^/gritlab/school-curriculum/piscine-js/.*"
        }
      })
      {
        type
        path
        objectId
        object {
          name
        }
        amount
        createdAt
      }
    }
  `;

  try {
    const [auditGivenResponse, auditReceivedResponse] = await Promise.all([
      fetch(GRAPHQL_ENDPOINT, {
        ...fetchOptions,
        body: JSON.stringify({ query: auditGiven })
      }),
      fetch(GRAPHQL_ENDPOINT, {
        ...fetchOptions,
        body: JSON.stringify({ query: auditReceive })
      })
    ]);

    const [auditGivenData, auditReceivedData] = await Promise.all([
      auditGivenResponse.json(),
      auditReceivedResponse.json()
    ]);

    const givenTransactions = auditGivenData.data.transaction;
    const receivedTransactions = auditReceivedData.data.transaction;

    const givenTotalAmount = givenTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    const receivedTotalAmount = receivedTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);

    const givenAmountInKb = givenTotalAmount.toFixed(0) / 1000;
    const receivedAmountInKb = receivedTotalAmount.toFixed(0) / 1000;

    donutChartMaker(givenAmountInKb, receivedAmountInKb);

    auditDone.textContent = `Total amount of audit xp done: ${givenAmountInKb.toFixed(0)} kb`;
    auditReceived.textContent = `Total amount of audit xp received: ${receivedAmountInKb.toFixed(0)} kb`;
  } catch (error) {
    console.error(error);
  }
}





async function fetchAttempts(token, GRAPHQL_ENDPOINT, userLogin) {
  const attemptsQuery = `
    query {
      progress(where: {
        userLogin: { _eq: "${userLogin}" }
        path: { _regex: "^/gritlab/school-curriculum/piscine-js/.*" }
      }) {
        id
        userId
        userLogin
        eventId
        path
        campus
        grade
        isDone
      }
    }
  `;

  if (!token) {
    // Redirect to login page

    console.log('Token not found, redirecting to login page...');
    window.location.href = './index.html';
  } else {
    fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || ''}`
      },
      body: JSON.stringify({
        query: attemptsQuery
      })
    })
      .then(response => response.json())
      .then(data => {
        const attempts = data.data.progress;

        // Store the fetched attempts in a structured format
        const fetchedData = new Map(); // Using a Map to store the data

        attempts.forEach(attempt => {
          const exerciseName = extractExerciseName(attempt.path);

          if (!fetchedData.has(exerciseName)) { // If the exercise is not yet in the Map, add it
            fetchedData.set(exerciseName, {
              attempts: [],
              successfulAttempts: [],
              failedAttempts: []
            });
          }

          const exerciseData = fetchedData.get(exerciseName);


          exerciseData.attempts.push(attempt);

          if (attempt.grade === 0) {
            exerciseData.failedAttempts.push(attempt);
          } else if (attempt.grade === 1) {
            exerciseData.successfulAttempts.push(attempt);
          }
        });


        barChartMaker(fetchedData); // Call the function that creates the chart

      })
      .catch(error => {
        console.error(error);
      });
  }
}

function extractExerciseName(path) {
  const pathParts = path.split('/');
  return pathParts[pathParts.length - 1];
}

