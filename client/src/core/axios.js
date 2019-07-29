import axios from 'axios';

// instance for local server - DB for users and queries
export const instance = axios.create({
    baseURL: (process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5000')
});

// Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

instance.interceptors.request.use(
    config => {
        config.headers.token = localStorage.getItem("token");
        return config;
    },
    error => Promise.reject(error)
);




// instance for external weather API requests
export const weatherInstance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5'
});

/*
weatherInstance.interceptors.request.use(
    config => {
        config.headers.token = localStorage.getItem("token");
        return config;
    },
    error => Promise.reject(error)
);*/