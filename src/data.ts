const data = {
  USER_ENDPOINT: "http://localhost:3001" || process.env.REACT_APP_ENDPOINT, //puesto a mano para que funcione en local ya que se que el back lo corro en ese puerto
  API_URL: "http://gateway.marvel.com/v1/public/characters",
  API_KEY: process.env.REACT_APP_API_PUBLIC_KEY,
  API_PARAMS: `?apikey=${process.env.REACT_APP_API_PUBLIC_KEY}&ts=${process.env.REACT_APP_API_TIMESTAMP}&hash=${process.env.REACT_APP_API_HASH}`,
};

export default data;
