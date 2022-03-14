import axios from 'axios';

const SHORT_URL_SERVICE_API_BASE_URL = "http://localhost:8086/tssly";

class ShortUrlService {

  getAllShortUrls() {
    return axios.get(SHORT_URL_SERVICE_API_BASE_URL + "/all");
  }

  createShortUrl(shortUrl) {
    return axios.post(SHORT_URL_SERVICE_API_BASE_URL + "/shortening?urlToShorten=" + shortUrl);
  }

  createCustomShortUrl(params) {
    return axios.post(SHORT_URL_SERVICE_API_BASE_URL + "/customize?urlToShorten=" + params.originalUrl + "&shortUrl=" + params.shortUrl);
  }

  getOriginalUrl(shortUrl) {
    return axios.get(SHORT_URL_SERVICE_API_BASE_URL + '/redirect?shortUrl=' + shortUrl);
  }
}

export default new ShortUrlService()
