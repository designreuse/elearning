import React from 'react';
import ReactDOM from 'react-dom';

import LessonHistoryCard from "~components/LessonHistoryCard"
import LessonUpcomingCard from "~components/LessonUpcomingCard"

import RatingLessonModal from "~components/RatingLessonModal"
import RequireLessonModal from "~components/RequireLessonModal"
import CancelBookingLessonModal from "~components/CancelBookingLessonModal"

import SkeletonLessonCard from '~components/common/Skeleton/SkeletonLessonCard';

import { convertDateFromTo } from "~src/utils.js"
import { getLessons } from "~src/api/studentAPI";

let initialState = {}

const initialCancelLesson = {
  id: "",
  LessionName: "",
  date: "",
  start: "",
  end: "",
}

const initialRatingLesson = {
  id: "",
  TeacherName: "",
}

const initialRequireLesson = {
  id: "",
  avatar: "",
  TeacherName: "",
  LessionName: "",
  SpecialRequest: "",
  date: "",
  start: "",
  end: "",
  DocumentName: "",
  SkypeID: "",
}

const Dashboard = () => {
  const [state, setState] = React.useState(initialState);
  const [lock, setLock] = React.useState({
    id:"",
    lock:false,
  })
  const [stateCancelLesson, setStateCancelLesson] = React.useState(initialCancelLesson);
  const [stateRatingLesson, setStateRatingLesson] = React.useState(initialRatingLesson);
  const [stateRequireLesson, setStateRequireLesson] = React.useState(initialRequireLesson);
  const [loading, setLoading] = React.useState(false)


  const handleRatingLesson = (id, TeacherName) => {
    setStateRatingLesson({
      ...stateRatingLesson,
      id,
      TeacherName
    })
  }

  const handleRequireLesson = (id, avatar, TeacherName, LessionName, SpecialRequest, date, start, end, DocumentName, SkypeID) => {
    setStateRequireLesson({
      ...stateRequireLesson,
      id,
      avatar,
      TeacherName,
      LessionName,
      SpecialRequest,
      date,
      start,
      end,
      DocumentName,
      SkypeID
    })
  }

  const handleCancelBooking = (id, LessionName, date, start, end) => {
    setStateCancelLesson({
      ...stateCancelLesson,
      id,
      LessionName,
      date,
      start,
      end
    })
  }

  const cbCancelBooking = (id, status) => {
    if(status === 0)
    {
      setLock({
        id,
        lock:true
      })
    }
    else {
      setLock({
        id,
        lock:false
      })
    }
  }

  const getAPI = async () => {
    setLoading(true);
    const lessons = await getLessons();
    setState(lessons.Data)
    console.log(lessons.Data)
    setLoading(false);
  }

  React.useEffect(() => {
    getAPI();
  }, []);

  return <React.Fragment>
    <div className="content content-fixed">
      <div className="container pd-x-0 pd-lg-x-10 pd-xl-x-0 dashboard-page">
        <div className="media d-block d-lg-flex">
          <div id="js-component-profilesidebar"></div>
          <div className="media-body mg-t-30 mg-lg-t-0 pd-lg-x-10">
            <div className="overall__summary">
              <ul className="top-step animated fadeInDown">
                <li className="top-step-item "><span className="item-count">
                  {!!state.UpcomingLessions && !!state.LessionHistory &&
                    state.UpcomingLessions.length + state.LessionHistory.length}
                </span>
                  <div className="item-title">Booked Lessons</div>
                </li>
                  <li className="top-step-item "><span className="item-count">
                    {state.StudyProcess && state.StudyProcess.CancelLessions}
                    </span>
                  <div className="item-title">Canceled Lessons</div>
                </li>
                <li className="top-step-item "><span className="item-count">
                {state.StudyProcess && state.StudyProcess.NumberOfAbsences}
                </span>
                  <div className="item-title">Truant Lessons</div>
                </li>
                <li className="top-step-item "><span className="item-count">
                {state.StudyProcess && state.StudyProcess.CompleteLessions}
                </span>
                  <div className="item-title">Remaining Lessons</div>
                </li>
              </ul>
            </div>
            <div className="lesson mg-t-45 animated fadeInUp am-animation-delay-1">
              <div className="d-xl-flex align-items-center justify-content-between ">
                <h4 className="mg-b-0 gradient-heading"><i className="fas fa-fire"></i>UPCOMING LESSON</h4>
              </div>
              <div className="course-horizental mg-t-20">
                <ul className="list-wrap">
                  {
                    loading ? <SkeletonLessonCard /> :
                      !!state.UpcomingLessions && state.UpcomingLessions.length > 0 &&
                      state.UpcomingLessions.map(item =>
                        <LessonUpcomingCard
                          key={item.BookingID}
                          id={item.BookingID}
                          teacherUID={item.TeacherUID}
                          TeacherName={item.TeacherName}
                          LessionName={item.LessionName}
                          SpecialRequest={item.SpecialRequest}
                          start={convertDateFromTo(item.ScheduleTimeVN).fromTime}
                          end={convertDateFromTo(item.ScheduleTimeVN).endTime}
                          date={convertDateFromTo(item.ScheduleTimeVN).date}
                          DocumentName={item.DocumentName}
                          SkypeID={item.SkypeID}
                          onHandleCancelBooking={handleCancelBooking}
                          onHandleRequireLesson={handleRequireLesson}
                          lock={lock}/>)
                  }
                </ul>
              </div>
            </div>
            <div className="lesson mg-t-45 animated fadeInUp am-animation-delay-2">
              <div className="d-xl-flex align-items-center justify-content-between ">
                <h4 className="mg-b-0 gradient-heading"><i className="fas fa-file"></i>LESSON HISTORY</h4>
                <a href={"lessonHistory.html"} className="link">View all history</a>
              </div>
              <div className="course-horizental mg-t-20">
                <ul className="list-wrap">
                  {
                    loading ? <SkeletonLessonCard /> :
                      !!state.LessionHistory && state.LessionHistory.length > 0 &&
                      state.LessionHistory.map(item =>
                        <LessonHistoryCard
                          key={item.BookingID}
                          id={item.BookingID}
                          teacherUID={item.TeacherUID}
                          TeacherName={item.TeacherName}
                          LessionName={item.LessionName}
                          start={convertDateFromTo(item.ScheduleTime).fromTime}
                          end={convertDateFromTo(item.ScheduleTime).endTime}
                          date={convertDateFromTo(item.ScheduleTime).date}
                          Rate={item.Rate}
                          onHandleRatingLesson={handleRatingLesson} />)
                  }
                </ul>
              </div>
            </div>
            <RatingLessonModal
              id={stateRatingLesson.id}
              TeacherName={stateRatingLesson.TeacherName} />

            <RequireLessonModal
              id={stateRequireLesson.id}
              avatar={stateRequireLesson.avatar}
              TeacherName={stateRequireLesson.TeacherName}
              LessionName={stateRequireLesson.LessionName}
              SpecialRequest={stateRequireLesson.SpecialRequest}
              date={stateRequireLesson.date}
              start={stateRequireLesson.start}
              end={stateRequireLesson.end}
              DocumentName={stateRequireLesson.DocumentName}
              SkypeID={stateRequireLesson.SkypeID} />

            <CancelBookingLessonModal
              id={stateCancelLesson.id}
              LessionName={stateCancelLesson.LessionName}
              date={stateCancelLesson.date}
              start={stateCancelLesson.start}
              end={stateCancelLesson.end}
              callback={cbCancelBooking}/>
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>
}
ReactDOM.render(<Dashboard />, document.getElementById('react-account-dashboard'));