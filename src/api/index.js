export const fetchPlayerList = async () => {
    try {
        const { data } = await fetch('/home').then(res => {
            if (res.ok) {
                return res.json();
            }
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const fetchPlayer = async (player) => {
    try {
        const { data } = await fetch(`/home/${player}`).then(res => {
            if (res.ok) {
                return res.json();
            }
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};