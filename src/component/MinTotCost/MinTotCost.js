import React, { useState } from 'react';
import './minTotCost.css'

const MinTotCost = () => {
    const [values, setValues] = useState({});
    const [clicked, setClicked] = useState(false);
    // taking acquisition cost , discount rate and number of estimated years
    const HandlerBlur = e => {
        const AllValues = { ...values };
        if (e.target.name === 'year') {
            AllValues[e.target.name] = parseInt(e.target.value);
        }
        else {
            AllValues[e.target.name] = parseFloat(e.target.value);
        }
        setValues(AllValues);
    }
    //adding all the years for calculation.
    if (values.year) {
        let years = [];
        for (let i = 1; i <= values.year; i++) {
            years.push(i);
        }
        values['allYears'] = years;
        console.log(values);
    }
    //taking all the maintenance and resale values at the state for dynamic use.
    const HandlerBlurCost = e => {
        const AllValues = { ...values };
        AllValues[e.target.name] = parseFloat(e.target.value);
        setValues(AllValues);
    }
    const HandlerSubmit = e => {
        const AllValues = { ...values };
        const { allYears, rate, acquisition } = AllValues;
        let allCost = [];
        allYears.forEach(n => {
            let TotalCost;
            // const NameForSale = 'S' + n;
            let maintenanceCost = 0;
            for (let i = 1; i <= n; i++) {
                // const NameMaintenance = 'C' + i;
                maintenanceCost = maintenanceCost + AllValues['C' + i] * (Math.pow(rate, i));
            }
            TotalCost = (maintenanceCost + ((Math.pow(rate, n)) * (acquisition - AllValues['S' + n]))) / (1 - (Math.pow(rate, n)));
            allCost.push(Math.round(TotalCost));
            // AllValues['allCost'] = allCost;
            AllValues['totalCost' + n] = Math.round(TotalCost);
            const minimumCost = Math.min(...allCost);
            const lestYear = allCost.indexOf(minimumCost);
            AllValues['lestYear'] = lestYear + 1;
            AllValues['minimumCost'] = minimumCost;
            setValues(AllValues);
        })

        setClicked(true);
        e.preventDefault();
    }

    console.log(values)

    return (
        <div>
            <h4>Optimal Replacement Interval for capital Equipment: Minimization of total cost</h4>
            <form onSubmit={HandlerSubmit}>
                <p>Acquisition Cost, A = <input type="text" name='acquisition' onBlur={HandlerBlur} placeholder='Acquisition Cost' required /></p>
                <p>Discount rate, r = <input type="text" name='rate' placeholder='Discount rate' onBlur={HandlerBlur} required /></p>
                <p>year, n = <input type="text" name='year' placeholder='year' onBlur={HandlerBlur} required /></p>

                {/* after entering the number of years to be studied then table will dynamically appear */}
                {/* table for maintenance cost*/}
                {values.year && <div>
                    <p>The Estimated maintenance values over the next {values.year} years: </p>
                    <table>
                        <tr key='tr1'>
                            <th>Year Estimated</th>
                            {values?.allYears.map(n =>
                                <td key={n}>{n}</td>
                            )}
                        </tr>
                        <tr key='tr2'>
                            <th>Maintenance Cost</th>
                            {values?.allYears.map(n =>
                                <td key={'C' + n}><input type="text" onBlur={HandlerBlurCost} name={'C' + n} required /></td>
                            )}
                        </tr>
                    </table>
                </div>}
                {/* table for resale value*/}
                {values.year && <div>
                    <p>The Estimated Resale values over the next {values.year} years: </p>
                    <table>
                        <tr key='tr3'>
                            <th>Year Estimated</th>
                            {values?.allYears.map(n =>
                                <td key={n + 'again'}>{n}</td>
                            )}
                        </tr>
                        <tr key='tr4'>
                            <th>Resale Value</th>
                            {values?.allYears.map(n =>
                                <td key={'S' + n}><input type="text" onBlur={HandlerBlurCost} name={'S' + n} required /></td>
                            )}
                        </tr>
                    </table>
                </div>}
                <br />
                <input type="submit" value='Solution' />
            </form>
            {/* showing solutiion step by step */}
            {clicked && values.year &&
                <div>
                    <p>when n = 2,</p>
                    <h4> C(2) = replacing after 2 years <br /> =({values.C1} * {values.rate} + {values.C1} * {values.rate}^2 + {values.acquisition} * {values.rate}^2 - {values.S2} * {values.rate}^2 )/(1 - {values.rate}^2)<br /> ={values.totalCost2} </h4>
                    <p>Total Cost Table</p>
                    <table >
                        <tr key='tr5'>
                            <th>Replacement Time, n</th>
                            {values?.allYears.map(n =>
                                <td key={n}>{n}</td>
                            )}
                        </tr>
                        <tr key='tr6'>
                            <th>Total Discounted Cost</th>
                            {values?.allYears.map(n =>
                                <td key={'Cost' + n}>{values['totalCost' + n]}</td>
                            )}
                        </tr>
                    </table>
                    <h4>From the table minimum Cost: {values.minimumCost}. So we will replace after {values.lestYear} year.</h4>
                </div>}
        </div>
    );
};

export default MinTotCost;