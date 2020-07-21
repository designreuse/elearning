import React from 'react'
import ReactDOM from 'react-dom'
import SkeletonBlogCard from "~components/common/Skeleton/SkeletonBlogCard"
import { getNotificationDetailAPI } from "~src/api/studentAPI"
import { getFormattedDate } from "~src/utils"

const BlogDetail = () => {
  const [state, setState] = React.useState(null)
  const [loading, setLoading] = React.useState(false);

  const getAPI = async (params) => {
    setLoading(true);
    const res = await getNotificationDetailAPI(params);
    if(res.Code === 1) {
     setState(res.Data)
    }
    setLoading(false);
  }

  React.useEffect(() => {
    getAPI({
      NotificationID: "1"
    });
  }, []);

  return (
    loading ? <SkeletonBlogCard /> : <React.Fragment>
      {
        !!state && <div className="content-blog bd-0-f">
        <div className="post-detail-cover">
          <img src={state.NotifictionIMG} alt="banner" className="banner-img" />
        </div>
        <div className="post-content">
          <div className="thread_title">
            <span>{state.NotificationTitle}</span>
          </div>
          <div className="author">
            <a href={"#"} className="avatar"><img src={state.IMG ? state.IMG : "../assets/img/default-avatar.png"} alt="avatar" /></a>
            <div className="author-info">
              <a href={"#"} className="username"><span className="hasVerifiedBadge">{state.CreatedBy}</span></a>
              <div className="date-comment-view">
                <span className="date"><span className="DateTime" title={moment(state.CreatedDate).format("LLLL")}>{getFormattedDate(state.CreatedDate)}</span></span>
              </div>
            </div>
          </div>
          <article> {state.NotificationContent} </article>
        </div>
      </div>
      }
    </React.Fragment>
  )
}

ReactDOM.render(<BlogDetail />, document.getElementById('react-blog-detail'));