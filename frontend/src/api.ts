export const getWeatherData = async (city: string) => {
    const response = await fetch(`http://localhost:3000/api/weather?city=${city}`);
    const data = await response.json();
    return data;
}