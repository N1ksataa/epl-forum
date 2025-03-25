const API_KEY = '770cef71307d4211bce2982527686cf1';
const API_URL = 'https://api.football-data.org/v4/competitions/PL/standings';

export const getStandings = async () => {
    try {
        const response = await fetch(API_URL, {
            headers: { 'X-Auth-Token': API_KEY }
        });

        if (!response.ok) {
            throw new Error(`Грешка: ${response.statusText}`);
        }

        const data = await response.json();

        return data.standings[0].table;
    } catch (error) {
        console.error('Грешка при извличане на класирането:', error);
        throw error;
    }
};
