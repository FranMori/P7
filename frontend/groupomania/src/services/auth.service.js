import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.accesToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      prenom: user.prenom,
      nom: user.nom,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();