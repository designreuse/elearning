import LessonHistoryCard from "./LessonHistoryCard"
import LessonUpcomingCard from "./LessonUpcomingCard"

import RatingLessonModal from "./RatingLessonModal"
import RequireLessonModal from "./RequireLessonModal"

import { convertTime } from "../../utils.js"
import { convertDay } from "../../utils.js"

let initialState = {
  upcomingLesson: [{
    courseId: "10",
    teacher: "Hoàng Thị Uyên Phương",
    images: "https://image.engoo.com/teacher/15867/p2872.jpg",
    courseName: "IELST - Professional",
    date: "03/07/2020",
    startTime: "10:30",
    endTime: "11:00",
    note: "Prepare speaking topic",
    document: ["ReadingSpeaking.doc", "Listening.doc"],
    skype: "http://skype.com/abc",
  }, {
    courseId: "11",
    teacher: "Hoàng Văn Thái",
    images: "https://images.unsplash.com/photo-1593087989983-e887d642a19c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    courseName: "IELST - Beginner",
    date: "11/07/2020",
    startTime: "10:30",
    endTime: "11:00",
    note: "Prepare speaking topic",
    document: ["ReadingSpeaking.doc", "Listening.doc"],
    skype: "http://skype.com/abc",
  }],
  lessonHistory: [{
    courseId: "1",
    teacher: "Hoàng Thị Uyên Phương",
    images: "https://image.engoo.com/teacher/15867/p2872.jpg",
    courseName: "IELST - Professional",
    date: "24/06/2020",
    startTime: "10:30",
    endTime: "11:00",
    note: "Student have a good speaking skill",
    ratingCourse: "90",
  }, {
    courseId: "2",
    teacher: "Hoàng Văn Thái",
    images: "https://images.unsplash.com/photo-1593087989983-e887d642a19c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    courseName: "IELST - Beginner",
    date: "15/06/2020",
    startTime: "10:00",
    endTime: "14:00",
    note: "Student have a good speaking skill",
    ratingCourse: "75",
  }],
  ratingCourse: {
    course: null,
    ratingStars: 0,
    note: "",
  },
  requireCourse: {
    course: null,
    require: ["This is require 1", "This is require 2", "This is require 3"],
    selectedRequire: [],
    note: "Note for teacher",
  }
}

const reducer = (prevState, { type, payload }) => {
  switch (type) {
    case "CHOOSE_RATING_COURSE": {
      return {
        ...prevState,
        ratingCourse: {
          ...prevState.ratingCourse,
          [payload.key]: payload.value,
        }
      }
    }
    case "CHOOSE_REQUIRE_COURSE": {
      return {
        ...prevState,
        requireCourse: {
          ...prevState.requireCourse,
          [payload.key]: payload.value,
        }
      }
    }
    default: return prevState;
      break;
  }
}

const Dashboard = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleChooseRatingCourse = (item) => {
    let key = "course"
    let value = item
    dispatch({ type: "CHOOSE_RATING_COURSE", payload: { key, value } })
  }
  const handleChooseRequireCourse = (item) => {
    let key = "course"
    let value = item
    dispatch({ type: "CHOOSE_REQUIRE_COURSE", payload: { key, value } })
  }

  return (
    <React.Fragment>
      <div className="content content-fixed">
        <div className="container pd-x-0 pd-lg-x-10 pd-xl-x-0 dashboard-page">
          <div className="media d-block d-lg-flex">
          <div id="js-component-profilesidebar"></div>
          <div className="media-body mg-t-30 mg-lg-t-0 pd-lg-x-10">
              <div className="overall__summary">
                <ul className="top-step animated fadeInDown">
                  <li className="top-step-item "><span className="item-count">10</span>
                    <div className="item-title">Booked Lessons</div>
                  </li>
                  <li className="top-step-item "><span className="item-count">2</span>
                    <div className="item-title">Canceled Lessons</div>
                  </li>
                  <li className="top-step-item "><span className="item-count">2</span>
                    <div className="item-title">Truant Lessons</div>
                  </li>
                  <li className="top-step-item "><span className="item-count">2</span>
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
                      state.upcomingLesson.map((item, index) => {
                        return <LessonUpcomingCard
                          key={index}
                          onHandleChooseRequireCourse={handleChooseRequireCourse}
                          item={item} />
                      })
                    }
                  </ul>
                </div>
              </div>
              <div className="lesson mg-t-45 animated fadeInUp am-animation-delay-2">
                <div className="d-xl-flex align-items-center justify-content-between ">
                  <h4 className="mg-b-0 gradient-heading"><i className="fas fa-file"></i>LESSON HISTORY</h4>
                  <a href={"#"} className="link">View all history</a>
                </div>
                <div className="course-horizental mg-t-20">
                  <ul className="list-wrap">
                    {
                      state.lessonHistory.map((item, index) => {
                        return <LessonHistoryCard
                          key={index}
                          onHandleChooseRatingCourse={handleChooseRatingCourse}
                          item={item} />
                      })
                    }
                  </ul>
                </div>
              </div>
              <RatingLessonModal course={state.ratingCourse} />
              <RequireLessonModal course={state.requireCourse} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
ReactDOM.render(<Dashboard />, document.getElementById('react-account-dashboard'));