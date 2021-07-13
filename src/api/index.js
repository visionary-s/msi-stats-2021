export const fetchGameStats = async () => {
    try {
        return await fetch(`/api/gamestats`).then(res => {
            if (res.ok) {
                return res.json();
            }
        });
    } catch (error) {
        console.log(error);
    }
};

export const fetchPlayer = async (player) => {
    const url = player? `/api/${player}` : '/api/playerlist';
    try {
        const { data } = await fetch(url).then(res => {
            if (res.ok) {
                return res.json();
            }
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};