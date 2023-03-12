const { parse } = require('csv-parse');

const fs = require('fs');

const ablePlanets = [];

function isAblePlanet(planet) {
    return (
        planet['koi_disposition'] === 'CONFIRMED' &&
        planet['koi_insol'] > 0.36 &&
        planet['koi_insol'] < 1.11 &&
        planet['koi_prad'] < 1.6
    );
}

fs.createReadStream('kepler_data.csv')
    .pipe(
        parse({
            comment: '#',
            columns: true,
        })
    )
    .on('data', (data) => {
        if (isAblePlanet(data)) {
            ablePlanets.push(data);
        }
    })

    .on('error', (err) => {
        console.error(err);
    })

    .on('end', () => {
        console.log(
            ablePlanets.map((planet) => {
                return planet['kepler_name'];
            })
        );
        console.log(`${ablePlanets.length} habitable planets found!`);
        console.log('done');
    });
parse();
