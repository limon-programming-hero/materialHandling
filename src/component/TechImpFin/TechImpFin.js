import React, { useState } from 'react';
import './techImpFin.css'

const TechImpFin = () => {
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
        let years1 = [];
        let years2 = [];
        for (let i = 1; i <= values.year; i++) {
            years1.push(i);
        }
        for (let i = 0; i <= values.year; i++) {
            years2.push(i);
        }
        values['yearMain'] = years1;
        values['yearResale'] = years2;
        console.log(values);
    }
    //taking all the maintenance and resale values at the state for dynamic use.
    const HandlerBlurCost = e => {
        const AllValues = { ...values };
        AllValues[e.target.name] = parseFloat(e.target.value);
        setValues(AllValues);
    }
    // done
    const HandlerSubmit = e => {
        const AllValues = { ...values };
        const { yearResale, year, rate, acquisition } = AllValues;
        let allCost = [];
        yearResale.forEach(T => {
            let TotalCost;
            let maintenanceCostP = 0;
            let maintenanceCostT = 0;
            for (let i = 1; i <= T; i++) {
                maintenanceCostP = maintenanceCostP + AllValues['Cp' + i] * (Math.pow(rate, i));
            }
            // console.log(maintenanceCostP)
            for (let j = 1; j <= year - T; j++) {
                maintenanceCostT = maintenanceCostT + AllValues['Ct' + j] * (Math.pow(rate, T + j));
            }
            // console.log(maintenanceCostT)
            const TAge = year - T;
            // console.log(TAge);
            TotalCost = (maintenanceCostP + maintenanceCostT + acquisition * (Math.pow(rate, T)) - (AllValues['Sp' + T] * (Math.pow(rate, T)) + AllValues['St' + TAge] * (Math.pow(rate, year))));
            allCost.push(Math.round(TotalCost));
            AllValues['totalCost' + T] = Math.round(TotalCost);
            const minimumCost = Math.min(...allCost);
            const lestYear = allCost.indexOf(minimumCost);
            AllValues['lestYear'] = lestYear;
            AllValues['minimumCost'] = minimumCost;
            setValues(AllValues);
        })
        setClicked(true);
        e.preventDefault();
    }

    console.log(values)

    return (
        <div className='main'>
            <h4>Optimal Replacement Interval for capital Equipment taking into account technological improvement : Finite planning horizon </h4>
            <form onSubmit={HandlerSubmit}>
                <p>Acquisition Cost, A = <input type="text" name='acquisition' onBlur={HandlerBlur} placeholder='Acquisition Cost' required /></p>
                <p>Discount rate, r = <input type="text" name='rate' placeholder='Discount rate' onBlur={HandlerBlur} required /></p>
                <p>year, n = <input type="text" name='year' placeholder='year' onBlur={HandlerBlur} required /></p>

                {/* after entering the number of years to be studied then table will dynamically appear */}
                {/* table for maintenance cost for present equipment*/}
                {values.year && <div>
                    <p>The Estimated maintenance values over the next {values.year} years of the present equipment: </p>
                    <table>
                        <tr key='tr1'>
                            <th>period(i)</th>
                            {values?.yearMain.map(n =>
                                <td key={n}>{n}</td>
                            )}
                        </tr>
                        <tr key='tr2'>
                            <th>Maintenance Cost, C(p,i)</th>
                            {values?.yearMain.map(n =>
                                <td key={'Cp' + n}><input type="text" onBlur={HandlerBlurCost} name={'Cp' + n} required /></td>
                            )}
                        </tr>
                    </table>
                </div>}
                {/* table for resale value for present equipment*/}
                {values.year && <div>
                    <p>The Estimated Resale values over the next {values.year} years of the present equipment: </p>
                    <table>
                        <tr key='tr3'>
                            <th>Period (i)</th>
                            {values?.yearResale.map(n =>
                                <td key={n + 'again'}>{n}</td>
                            )}
                        </tr>
                        <tr key='tr4'>
                            <th>Resale Value, S(p,i)</th>
                            {values?.yearResale.map(n =>
                                <td key={'Sp' + n}><input type="text" onBlur={HandlerBlurCost} name={'Sp' + n} required /></td>
                            )}
                        </tr>
                    </table>
                </div>}
                {/* table for maintenance cost for technically improved equipment*/}
                {values.year && <div>
                    <p>The Estimated maintenance values over the next {values.year} years of the technically improved equipment: </p>
                    <table>
                        <tr key='tr1'>
                            <th>period(i)</th>
                            {values?.yearMain.map(n =>
                                <td key={n}>{n}</td>
                            )}
                        </tr>
                        <tr key='tr2'>
                            <th>Maintenance Cost C(t,i)</th>
                            {values?.yearMain.map(n =>
                                <td key={'Ct' + n}><input type="text" onBlur={HandlerBlurCost} name={'Ct' + n} required /></td>
                            )}
                        </tr>
                    </table>
                </div>}
                {/* table for resale value for technically improved equipment*/}
                {values.year && <div>
                    <p>The Estimated Resale values over the next {values.year} years of the technically improved equipment: </p>
                    <table>
                        <tr key='tr3'>
                            <th>Period (i)</th>
                            {values?.yearResale.map(n =>
                                <td key={n + 'again'}>{n}</td>
                            )}
                        </tr>
                        <tr key='tr4'>
                            <th>Resale Value, S(t,i)</th>
                            {values?.yearResale.map(n =>
                                <td key={'St' + n}><input type="text" onBlur={HandlerBlurCost} name={'St' + n} required /></td>
                            )}
                        </tr>
                    </table>
                </div>}
                <br />
                <input type="submit" value='Solution' />
            </form>
            {/* done  */}
            {/* showing solutiion step by step */}
            {clicked && values.year &&
                <div>
                    <p>when n = 3,</p>
                    <h4>C(3) = {values['Cp1']} * {values.rate}^1 + {values['Cp2']} * {values.rate}^2 + {values['Cp3']} * {values.rate}^3 + {values.acquisition} * {values.rate}^3 + {values['Ct1']} * {values.rate}^4 + .... + {values['Ct' + (values.year - 3)]} * {values.rate}^{values.year} - ({values['Sp3']} * {values.rate}^3 + {values['St' + (values.year - 3)]} * {values.rate}^ {values.year})
                        <br />
                        = {values.totalCost3}</h4>
                    <p>Total Cost Table</p>
                    <table >
                        <tr key='tr5'>
                            <th>Replacement Time, T</th>
                            {values?.yearResale.map(n =>
                                <td key={n}>{n}</td>
                            )}
                        </tr>
                        <tr key='tr6'>
                            <th>Total Discounted Cost, C(T)</th>
                            {values?.yearResale.map(n =>
                                <td key={'Cost' + n}>{values['totalCost' + n]}</td>
                            )}
                        </tr>
                    </table>
                    <h4>From the table minimum Cost: {values.minimumCost}. So we will replace the old machine with the technological improved machine after {values.lestYear} year.</h4>
                </div>}
        </div>
    );
};

export default TechImpFin;