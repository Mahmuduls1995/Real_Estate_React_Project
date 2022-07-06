import React, { createContext, useState, useEffect } from 'react';

// import data
import { housesData } from '../data';

// create context
export const HouseContext = createContext();

// provider
const HouseContextProvider = ({ children }) => {
    const [houses, setHouses] = useState(housesData);

    const [country, setCountry] = useState('Location (any)');
    const [countries, setCountries] = useState([]);

    const [property, setProperty] = useState('Property type (any)');
    const [properties, setProperties] = useState([]);

    const [year, setYear] = useState('Year Select (any)');
    const [years, setYears] = useState([]);

    const [price, setPrice] = useState('Price range (any)');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // return all countries
        const allCountries = houses.map((house) => {
            return house.country;
        });

        // remove duplicates
        const uniqueCountries = ['Location (any)', ...new Set(allCountries)];

        // set countries state
        setCountries(uniqueCountries);
    }, []);

    useEffect(() => {
        // return only Properties
        const allProperties = houses.map((house) => {
            return house.type;
        });

        // remove duplicates
        const uniqueProperties = ['Property type (any)', ...new Set(allProperties)];

        // set countries state
        setProperties(uniqueProperties);
    }, []);


    useEffect(() => {
        // return only Properties
        const allYears = houses.map((house) => {
            return house.year;
        });

        // remove duplicates
        const uniqueYears = ['Year Select (any)', ...new Set(allYears)];

        // set countries state
        setYears(uniqueYears);
    }, []);




    const handleClick = () => {
        setLoading(true);
        // check the string if includes '(any)'
        const isDefault = (str) => {
            return str.split(' ').includes('(any)');
        };

        // get first string (price) and parse it to number
        const minPrice = parseInt(price.split(' ')[0]);
        // get last string (price) and parse it to number
        const maxPrice = parseInt(price.split(' ')[2]);

        const newHouses = housesData.filter((house) => {
            const housePrice = parseInt(house.price);

            // all values are selected
            if (
                house.country === country &&
                house.type === property &&
                house.year === year &&
                housePrice >= minPrice &&
                housePrice <= maxPrice
            ) {
                return house;
            }
            // all values are default
            if (isDefault(country) && isDefault(property) && isDefault(price)) {
                return house;
            }
            // country is not default
            if (!isDefault(country) && isDefault(property) && isDefault(year) && isDefault(price)) {
                return house.country === country;
            }
            // property is not default
            if (!isDefault(property) && isDefault(country) && isDefault(year) && isDefault(price)) {
                return house.type === property;
            }
            // year is not default
            if (!isDefault(year) && isDefault(country) && isDefault(property) && isDefault(price)) {
                return house.year === year;
            }

            // price is not default
            if (!isDefault(price) && isDefault(country) && isDefault(property)&& isDefault(year)) {
                if (housePrice >= minPrice && housePrice <= maxPrice) {
                    return house;
                }
            }


            // country and property is not default
            if (!isDefault(country) && !isDefault(property) && isDefault(price)&& isDefault(year)) {
                return house.country === country && house.type === property;
            }

            // year and property is not default
            if (!isDefault(year) && !isDefault(property) && isDefault(price)&& isDefault(country)) {
                return house.year === year && house.type === property;
            }

            // year and country is not default
            if (!isDefault(year) && !isDefault(country) && isDefault(property) && isDefault(price)) {
                return house.year === year && house.country === country;
            }


            // country and price is not default
            if (!isDefault(country) && isDefault(property) && !isDefault(price)&& isDefault(year)) {
                if (housePrice >= minPrice && housePrice <= maxPrice) {
                    return house.country === country;
                }
            }
            // year and price is not default
            if (!isDefault(price)&& !isDefault(year) && isDefault(country) && isDefault(property) ) {
                if (housePrice >= minPrice && housePrice <= maxPrice) {
                    return house.year === year;
                }
            }


            // property and price is not default
            if (isDefault(country) && !isDefault(property) && !isDefault(price)&& isDefault(year)) {
                if (housePrice >= minPrice && housePrice <= maxPrice) {
                    return house.type === property;
                }
            }



        });


        setTimeout(() => {
            return (
                newHouses.length < 1 ? setHouses([]) : setHouses(newHouses),
                setLoading(false)
            );
        }, 1000);
    };

    return (
        <HouseContext.Provider
            value={{
                country,
                setCountry,
                countries,

                year,
                setYear,
                years,

                property,
                setProperty,
                properties,


                price,
                setPrice,
                handleClick,
                houses,
                loading,
            }}
        >
            {children}
        </HouseContext.Provider>
    );
};

export default HouseContextProvider;
