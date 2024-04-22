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
        // Aqui você pode redirecionar o usuário para a página desejada após o login
    } else {
        document.getElementById('loginErrorMessage').textContent = 'Nome de usuário ou email ou senha incorretos. Por favor, tente novamente.';
    }
}

function register(event) {
    event.preventDefault();
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('passwordReg').value;
    
    // Verificar se o nome de usuário já está em uso
    if (isUsernameTaken(username)) {
        document.getElementById('registerErrorMessage').textContent = 'O nome de usuário já está em uso. Por favor, escolha outro nome de usuário.';
        return;
    }
    
    // Verificar se a senha atende aos critérios mínimos de segurança
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
    
    document.getElementById('registerErrorMessage').textContent = ''; // Limpa a mensagem de erro se o registro for bem-sucedido
    
    alert('Registro bem-sucedido! Faça login com suas novas credenciais.');
    
    // Após o registro, atualize a tabela com os dados de email e senha
    updateTable(userData);
    
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
    // Verificar se a senha tem pelo menos 8 caracteres
    if (password.length < 8) {
        return false;
    }
    
    // Verificar se a senha contém pelo menos uma letra maiúscula
    if (!/[A-Z]/.test(password)) {
        return false;
    }
    
    // Verificar se a senha contém pelo menos uma letra minúscula
    if (!/[a-z]/.test(password)) {
        return false;
    }
    
    // Verificar se a senha contém pelo menos um número
    if (!/\d/.test(password)) {
        return false;
    }
    
    // Verificar se a senha contém pelo menos um caractere especial
    if (!/[\W_]/.test(password)) {
        return false;
    }
    
    return true;
}

function showRegistrationForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

// Função para atualizar a tabela com os dados de email e senha
function updateTable(userData) {
    var tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = '';
    
    userData.forEach(function(user) {
        var row = tableBody.insertRow();
        var emailCell = row.insertCell(0);
        var passwordCell = row.insertCell(1);
        
        emailCell.textContent = user.email;
        passwordCell.textContent = user.password;
    });
    
    document.getElementById('userTable').style.display = 'block';
}
