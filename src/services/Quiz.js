import axios from 'axios';

export default {
    getQuiz() {
        return new Promise((resolve, reject) => {
            axios.get('https://opentdb.com/api.php?amount=1')
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error.response.data);
                });
        });
    }
}