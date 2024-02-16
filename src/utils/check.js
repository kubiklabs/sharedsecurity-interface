let data = [];

// Generate 100 rows for each time period with randomized numerical values
for (let i = 0; i <= 17; i++) {
    let time = "Feb ";
    for (let j = 0; j < 25; j++) {
        let entry = {
            "time": time + j,
            "Cosmos Hub": Math.floor(Math.random() * 100),
            "Stride": Math.floor(Math.random() * 100),
            "Neutron": Math.floor(Math.random() * 100)
        };
        data.push(entry);
    }
}

console.log(JSON.stringify(data, null, 4));