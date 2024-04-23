function showLoggedInContent() {
    document.getElementById('movies-container').classList.remove('hidden');
}

function login(event) {
    event.preventDefault();
    var emailOrUsername = document.getElementById('loginEmail').value;
    var password = document.getElementById('password').value;
    
    var userData = JSON.parse(localStorage.getItem('userData'));
    
    var user = userData.find(function(user) {
        return (user.username.toLowerCase() === emailOrUsername.toLowerCase() || user.email.toLowerCase() === emailOrUsername.toLowerCase());
    });
    
    if (user && user.password === password) {
        alert('Login bem-sucedido!');
        showLoggedInContent();
    } else {
        document.getElementById('loginErrorMessage').textContent = 'Nome de usuário ou email ou senha incorretos. Por favor, tente novamente.';
    }
}

function showRegistrationForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

function register(event) {
    event.preventDefault();
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('passwordReg').value;
    
    if (isUsernameTaken(username)) {
        document.getElementById('registerErrorMessage').textContent = 'O nome de usuário já está em uso. Por favor, escolha outro nome de usuário.';
        return;
    }
    
    if (!isStrongPassword(password)) {
        document.getElementById('registerErrorMessage').textContent = 'A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.';
        return;
    }
    
    var userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : [];
    
    userData.push({
        username: username,
        email: email,
        password: password,
        isAdmin: false
    });
    
    localStorage.setItem('userData', JSON.stringify(userData));
    
    document.getElementById('registerErrorMessage').textContent = '';
    
    alert('Registro bem-sucedido! Faça login com suas novas credenciais.');
    
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
}

function isUsernameTaken(username) {
    var userData = JSON.parse(localStorage.getItem('userData')) || [];
    return userData.some(function(user) {
        return user.username === username;
    });
}

function isStrongPassword(password) {
    if (password.length < 8) {
        return false;
    }
    
    if (!/[A-Z]/.test(password)) {
        return false;
    }
    
    if (!/[a-z]/.test(password)) {
        return false;
    }
    
    if (!/\d/.test(password)) {
        return false;
    }
    
    if (!/[\W_]/.test(password)) {
        return false;
    }
    
    return true;
}

function showLoggedInContent() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('movies-container').classList.remove('hidden');
}

function addMovie(event) {
    event.preventDefault();
    var title = document.getElementById('title').value;
    var director = document.getElementById('director').value;
    var year = document.getElementById('year').value;
    
    var movieList = document.getElementById('movie-list');
    var listItem = document.createElement('li');
    listItem.textContent = title + ' - Directed by ' + director + ', ' + year;
    movieList.appendChild(listItem);
    
    // Limpar campos do formulário após adicionar o filme
    document.getElementById('title').value = '';
    document.getElementById('director').value = '';
    document.getElementById('year').value = '';
}

function logout() {
    // Simplesmente recarregar a página para simular o logout
    location.reload();
}

function showLoginForm() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

  
// Função para atualizar a tabela sem os dados de email
// function updateTable(userData) {
//     var tableBody = document.getElementById('userTableBody');
//     tableBody.innerHTML = '';
    
//     userData.forEach(function(user) {
//         var row = tableBody.insertRow();
//         var passwordCell = row.insertCell(0);
        
//         passwordCell.textContent = user.password;
//     });
    
//     document.getElementById('userTable').style.display = 'block';
// }
