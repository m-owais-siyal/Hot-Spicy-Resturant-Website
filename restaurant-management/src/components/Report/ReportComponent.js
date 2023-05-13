import React, { useState, useEffect } from 'react'
import './ReportComponent.css'
import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';

export default function ReportComponent() {

    const [report, setReport] = useState([]);

    useEffect(() => {
        showreport();
        refreshreport();
    }, []);

    function refreshreport() {
        axios.get("http://localhost/php/report.php")
            .then((response => {
                setReport(response.data);
                console.log(response.data);
            }));
    }

    function showreport() {
        axios.get("http://localhost/php/report.php")
            .then((response => {
                setReport(response.data);
                console.log(response.data);
            }))
            .catch(error => {
                console.log(error);
            });
        console.log("report: ", report);
    }

    return (
        <div>
            <div className='row'>
                <div className='col-md-12'>
                    <h3>Report</h3>
                </div>
            </div>

            <table id="reportTable" className="table table-hover table-group-divider">
                <thead className='table-dark'>
                    <tr>
                        <th>Food Items</th>
                        <th>Price</th>
                        <th>Ordered by N people</th>
                    </tr>
                </thead>

                <tbody className='tablebody'>
                    {report.map((item) => (
                        <tr key={item.CartID}>
                            <td>{item.foodname}</td>
                            <td>{item.price}</td>
                            <td>{item.foodcount}</td>
                         </tr>
                     ))}
                </tbody>
            </table>

        </div >

    );

}

