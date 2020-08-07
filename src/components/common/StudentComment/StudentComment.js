import React from 'react';
import ReactDOM from 'react-dom';
import StudentCommentItem from "./StudentCommentItem"
import Pagination from "react-js-pagination";
import { getAllStudentReviewAPI } from "~src/api/studentAPI";
import SkeletonFeedback from "~components/common/Skeleton/SkeletonFeedback";
import Skeleton from "react-loading-skeleton";

/* import { isTouchCapable } from 'react-select/src/utils'; */

const StudentComment = ({ TeacherUID }) => {
  const [state, setState] = React.useState([]);
  const [page, setPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(0);
  const [totalResult, setTotalResult] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    getCommentAPI({
      TeacherUID,
      Page: pageNumber,
    })
  }

  const getCommentAPI = async (params) => {
    setLoading(true);
    const res = await getAllStudentReviewAPI(params);
    if (res.Code === 1) {
      setState(res.Data)
      setPageSize(res.PageSize);
      setTotalResult(res.TotalResult)
    }
    setLoading(false);
  }

  React.useEffect(() => {
    getCommentAPI({
      TeacherUID,
      Page: page,
    })
  }, [])
  return loading ? <>
  <Skeleton className="mb-2" height={20} width={250} />
    <SkeletonFeedback/>
    </> : <>
    <div className="tc-comment-wrap bd-t-0-f mg-t-0-f pd-t-0-f">
      <h6 className="mg-b-15">
        {
          totalResult == 0?"This teacher have no feedback":
          `${totalResult} student${totalResult > 1? "s":""} has leave feedback for this teacher:`
        }
        </h6>
      <div className="comment__wrapper">
        {
          !!state && state.length > 0 && state.map((item, index) =>
            <StudentCommentItem
              key={index}
              StudentUID={item.StudentUID}
              CreatedDate={item.CreatedDate}
              StudentName={item.StudentName}
              StudentIMG={item.StudentIMG}
              Evaluation={item.Evaluation}
              Rate={item.Rate}
              Lession={item.Lession} />)
        }
      </div>
      {
        pageSize < totalResult &&
        <Pagination
          innerClass="pagination justify-content-end mt-3"
          activePage={page}
          itemsCountPerPage={pageSize}
          totalItemsCount={totalResult}
          pageRangeDisplayed={3}
          itemClass="page-item"
          linkClass="page-link"
          onChange={handlePageChange.bind(this)} />
      }
    </div>
    </>
}
export default StudentComment;