



const form = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = form.elements.username.value;
  const password = form.elements.password.value;

  const response = await fetch('https://01.gritlab.ax/api/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(`${username}:${password}`)}`
    }
  });

  if (response.ok) {
    const data = await response.json();
   // console.log("data:", data);
    const token = data;
    // console.log("token:", token);


    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    // Save the token to local storage for future requests
    localStorage.setItem('token', token);

    // Redirect to profile page
    window.location.href = './profile.html';
  } else {
    errorMessage.textContent = 'Invalid username or password';
  }
});
