import React from 'react';
import ReactDOM from 'react-dom';
import StudentComment from "../common/StudentComment/StudentComment"
import BookingSchedule from "./BookingSchedule"
import TeacherInformation from "./TeacherInformation"
import CancelBookingLessonModal from "~components/CancelBookingLessonModal"
import BookingLessonModal from "~components/BookingLessonModal"
import SkeletonLessonCard from "~components/common/Skeleton/SkeletonLessonCard"

import { nationMapToFlag, randomId } from '~src/utils'
import { getTeacherInfo } from "~src/api/studentAPI"

const schedule = [{
  id: randomId(),
  day: "23/7/2020",
  courseName: "English For Today",
  timeStart: "12:30",
  timeEnd: "13:00",
  status: "available",
}, {
  id: randomId(),
  day: "23/7/2020",
  courseName: "English For Today",
  timeStart: "13:30",
  timeEnd: "14:00",
  status: "available",
}, {
  id: randomId(),
  day: "23/7/2020",
  courseName: "English For Today",
  timeStart: "08:00",
  timeEnd: "08:30",
  status: "available",
}, {
  id: randomId(),
  day: "23/7/2020",
  courseName: "English For Today",
  timeStart: "20:30",
  timeEnd: "21:00",
  status: "available",
}, {
  id: randomId(),
  day: "24/7/2020",
  courseName: "TOEIC Basic",
  timeStart: "01:30",
  timeEnd: "02:00",
  status: "booked",
  student: "Hoàng Văn Thái"
}, {
  id: randomId(),
  day: "24/7/2020",
  courseName: "Grammar",
  timeStart: "12:30",
  timeEnd: "13:00",
  status: "available",
}, {
  id: randomId(),
  day: "24/7/2020",
  courseName: "TOEIC Advanced",
  timeStart: "15:30",
  timeEnd: "16:00",
  status: "available",
}, {
  id: randomId(),
  day: "23/7/2020",
  courseName: "IELTS 6.0",
  timeStart: "09:30",
  timeEnd: "10:00",
  status: "booked",
  student: "Hoàng Văn Thái"
}, {
  id: randomId(),
  day: "10/7/2020",
  courseName: "IELTS 6.0",
  timeStart: "11:00",
  timeEnd: "11:30",
  status: "booked",
  student: "Hoàng Văn Thái"
}]


const initialCancelLesson = {
  id: "",
  LessionName: "",
  date: "",
  start: "",
  end: "",
}

const initialBookLesson = {
  id: "",
  LessionName: "",
  date: "",
  start: "",
  end: "",
}

let teacherInfoSwiper;

const TeacherDetail = () => {
  const [state, setState] = React.useState({})
  const [stateCancelLesson, setStateCancelLesson] = React.useState(initialCancelLesson);
  const [stateBookLesson, setStateBookLesson] = React.useState(initialBookLesson);

  const [loading, setLoading] = React.useState(false);

  const swiperInit = () => {
    teacherInfoSwiper = new Swiper('.swiper-container', {
      loop: false,
      freeModeMomentum: false,
      preventInteractionOnTransition: true,
      simulateTouch: false,
      autoHeight: true,
      observer: true,
      observeParents: true,
      observeSlideChildren: true,
    })

    const listTab = document.getElementById('js-list-tab');
    const tabLinks = listTab.querySelectorAll('.tab-link');
    const swapTab = (e) => {
      e.preventDefault();
      const element = e.target;
      const indexSlide = element.dataset?.index ?? 0;
      teacherInfoSwiper.slideTo(indexSlide, 500, false);
      [...tabLinks].map(link => link === element ? link.classList.add('active') : link.classList.remove('active'));
    }
    [...tabLinks].map(link => {
      link.addEventListener('click', swapTab);
    });

    let $videoSrc;
    let $videoModal = $('#js-video-modal');
    let $iframe = $videoModal.find('iframe');
    $('#video-teacher').click(function () {
      $videoSrc = $(this).attr('data-src');
      $iframe.attr('src', $videoSrc);
      $videoModal.modal('show');
    });

    $videoModal.on('hide.bs.modal', function (e) {
      // a poor man's stop video
      $iframe.attr('src', $videoSrc);
    })
  }


  const getAPI = async () => {
    setLoading(true);
    const teacher = await getTeacherInfo({
      TeacherUID: 1,
    });
    setState(teacher.Data)
    setLoading(false);
    $('#js-video-modal iframe').attr('src', teacher.Data.LinkVideoIntroduce);
  }

  const onHandleBookLesson = (id, LessionName, date, start, end) => {
    setStateBookLesson({
      ...stateBookLesson,
      id,
      LessionName,
      date,
      start,
      end
    })
  }

  const onHandleCancelLesson = (id, LessionName, date, start, end) => {
    setStateCancelLesson({
      ...stateCancelLesson,
      id,
      LessionName,
      date,
      start,
      end
    })
  }

  React.useEffect(() => {
    getAPI()
    swiperInit()
  }, [])

  return (
    <div className="teacher__detail__wrap card-box">
      <div className="teacher__detail">
        {
          loading ? <SkeletonLessonCard /> :
            <div className="teacher-header">
              <div className="teacher-avatar">
                <img src={state.TeacherIMG} alt="avatar" />
              </div>
              <div className="teacher-info">
                <div className="teacher-name">
                  <h5 className="name">{state.TeacherName}</h5>
                  <div className="nation">
                    <span className={`flag-icon flag-icon-${state.nation ? nationMapToFlag(state.nation) : "vn"} flag-icon-squared mg-r-5`}></span>
                    <span className="badge badge-light"><span className="tx-success"><i
                      className="fa fa-check-circle"></i> Verified</span></span>
                  </div>
                </div>
                <div className="teacher-summary">
                  <a href="#js-video-modal"
                    data-toggle="modal"
                    data-target="#js-video-modal"
                    data-src={state.LinkVideoIntroduce}
                    className="tx-primary" id="video-teacher"><i className="fas fa-play-circle "></i>Xem video giới thiệu</a>
                  <p className="mg-b-0 mg-t-10">{state.IntroduceContent}</p>
                </div>
              </div>
            </div>
        }
        <div className="teacher-body">
          <div className="tab-navigation">
            <ul className="list-tab" id="js-list-tab">
              <li className="tab-item">
                <a href={"#"} className="tab-link active" data-index="0">TEACHER INFORMATION</a>
              </li>
              <li className="tab-item">
                <a href={"#"} className="tab-link " data-index="1">BOOKING SCHEDULE</a>
              </li>
              <li className="tab-item">
                <a href={"#"} className="tab-link " data-index="2">STUDENT COMMENT</a>
              </li>
            </ul>
          </div>
          <div className="tab-navigation-content">
            <div className="swiper-container" id="js-teacher__info">
              <div className="teacher__info-wrap swiper-wrapper">
                <div className="swiper-slide">
                  <div className="slide-tab-content">
                    <TeacherInformation
                      IntroduceContent={state.IntroduceContent}
                      Experience={state.Experience}
                      Certificate={state.Certificate} />
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="slide-tab-content">
                    <BookingSchedule
                      /* schedule={state.schedule} */
                     /*  schedule={schedule} */
                      handleBookLesson={onHandleBookLesson}
                      handleCancelLesson={onHandleCancelLesson} />
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="slide-tab-content">
                    <StudentComment teacherInfoSwiper={teacherInfoSwiper} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CancelBookingLessonModal
        id={stateCancelLesson.id}
        LessionName={stateCancelLesson.LessionName}
        date={stateCancelLesson.date}
        start={stateCancelLesson.start}
        end={stateCancelLesson.end} />

      <BookingLessonModal
        id={stateBookLesson.id}
        LessionName={stateBookLesson.LessionName}
        date={stateBookLesson.date}
        start={stateBookLesson.start}
        end={stateBookLesson.end} />
    </div>
  )
}

ReactDOM.render(<TeacherDetail />, document.getElementById("react-teacher-detail"));
