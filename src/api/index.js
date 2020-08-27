import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
axios.interceptors.response.use(function (config) {
    return config.data;
  });
export let getSliders = ()=>{
   return axios.get('/sliders')
}
export let getHotBook = ()=>{
    return axios.get('/hot')
 }
 export let getAll = ()=>{
   return axios.all([getSliders(),getHotBook()])
}
 export let getBooks = ()=>{
    return axios.get('/book')
 }
 export let removeBook = (id)=>{
    return axios.delete(`/book?id=${id}`)
 }
 export let findOneBook = (id)=>{
   return axios.get(`/book?id=${id}`)
}
export let updateBook = (id,data)=>{
   return axios.put(`/book?id=${id}`,data)
}
export let addBook = (data)=>{
   return axios.post('/book',data)
}
export let pagination = (offset)=>{
   return axios.get(`/page?offset=${offset}`)
}