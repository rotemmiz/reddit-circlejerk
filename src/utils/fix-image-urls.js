// http://test -> https://test
export default fixImageUrl = (url) => url.substring(0, 5) === 'https' ? url : url.replace('http', 'https');
