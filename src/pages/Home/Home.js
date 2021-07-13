import React, { useState, useEffect } from 'react';
// import { Cards } from '../../components';

const Home = () => {
    const [cardContent, setCardContent] = useState([]);

    useEffect(() => {
        // fetch(`/api/gamestats`).then(res => {
        //     if (res.ok) {
        //         return res.json();
        //     }
        // }).then(data => {
        //     console.log(data);
        // });
        fetch('/api').then(res => {
            if (res.ok) {
            return res.json();
            }
        }).then(data => {
            console.log(data);
        });
    }, []);

    return (
        <div>
            HomeWidget
        </div>
    )
}

export default Home;