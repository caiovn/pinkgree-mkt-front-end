import axios from 'axios'

const getCategories = () => {
  const response = axios.get(`${process.env.PINKGREEN_API_BASE_URL}/category`)
}
