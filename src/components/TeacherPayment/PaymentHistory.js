import React, { useState, useEffect } from 'react';
import Flatpickr from 'react-flatpickr';
import { getPaymentHistory } from '~src/api/teacherAPI';
import Skeleton from 'react-loading-skeleton'
import Pagination from 'react-js-pagination';


const RenderRow = ({ data }) => {
    return (<tr>
                <td className="tx-left wd-150">{data.CreatedDate}</td>
                <td className="tx-center">{data.Salary} $</td>
                <td className="tx-center">{data.Note}</td>
        </tr>)
}

const PaymentHistory = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [data, setData] = useState(null);

    const loadHistoryAPI = async () => {
        setIsLoading(true);
        const params = {
            Page: parseInt(pageNumber), //Int
            FromDate: fromDate === '' ? fromDate : moment(new Date(fromDate)).format('DD/MM/YYYY'), // string dd/mm/yyyy
            ToDate: toDate === '' ? toDate : moment(new Date(toDate)).format('DD/MM/YYYY') // string dd/mm/yyyy
        };
        const res = await getPaymentHistory(params);
        res.Code === 1 ? setData(res.Data) : setData([]);
        setIsLoading(false);
    }

    useEffect(() => {
        loadHistoryAPI();
    }, [pageNumber])

    return (
        <>

            <div className="gv-datime-luong mg-t-15">
                <div className="form-row from-to-group mx-wd-600" id="filter-time">
                    <div className="wd-sm-200 col">
                        <Flatpickr
                            options={{
                                dateFormat: "d/m/Y",
                            }}
                            className="form-control"
                            onChange={(date) => setFromDate(date)}
                            placeholder="From date"
                        />
                    </div>
                    <div className="wd-sm-200 col">
                        <Flatpickr
                            options={{
                                dateFormat: "d/m/Y",
                                onOpen:function(selectedDates, dateStr, instance){
                                    console.log(instance);
                                    if(fromDate === '') return;
                                    instance.set("minDate", new Date(fromDate));
                                    
                                }
                            }}
                            className="form-control"
                            onChange={(date) => setToDate(date)}
                            placeholder="To date"
                           
                        />
                    </div>
                    <div className="flex-grow-0 tx-right flex-shrink-0 pd-x-5">
                        <button type="button" className="btn btn-info " onClick={loadHistoryAPI}><i className="fa fa-search" /></button>
                    </div>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table mg-t-15">
                    <thead className="thead-light">
                        <tr className="gv-bg-table">
                            <th className="tx-left">Date </th>
                            <th className="tx-center">Total salary</th>
                            <th className="tx-center">Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <>
                            <tr>
                                <td><Skeleton /></td>
                                <td><Skeleton /></td>
                                <td><Skeleton /></td>
                            </tr>
                            <tr>
                                <td><Skeleton /></td>
                                <td><Skeleton /></td>
                                <td><Skeleton /></td>
                            </tr>
                            <tr>
                                <td><Skeleton /></td>
                                <td><Skeleton /></td>
                                <td><Skeleton /></td>
                            </tr>
                            </>
                        ) : (
                            !!data && !!data.length > 0 && data.map((item,index) => <RenderRow key={`${index}`} data={item} />)
                        )}


                    </tbody>
                </table>
            </div>
            {!!data && !!data.length > data.PageSize && (
                <Pagination
                    innerClass="pagination"
                    activePage={pageNumber}
                    itemsCountPerPage={data.PageSize || 0}
                    totalItemsCount={data.TotalResult || 0}
                    pageRangeDisplayed={5}
                    onChange={(page) => setPageNumber(page)}
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="active"
                />
            )}
        </>
    )
}



export default PaymentHistory;