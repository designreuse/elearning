import React from 'react';
import ReactDOM from 'react-dom';

const initialState = {
  Asia: ["Philipine"],
  Europe: ["Anh"]
}

/* const RenderListNation = ({ list }) => {
  return Object.keys(list).map(key =>
    <fieldset className="form-fieldset mg-b-10" key={key}>
      <legend className="legend-checkbox">
        <div className="custom-control custom-checkbox">
          <input type="checkbox" className="custom-control-input" id={`${key}-main`} />
          <label className="custom-control-label" htmlFor={`${key}-0`}>
            {key==="NorthAmerica"?"North America": key }
            </label>
        </div>
      </legend>
      {
        list[key].length > 0 && list[key].map((item, index) =>
          <div key={index} className="custom-control custom-checkbox national-checkbox">
            <input type="checkbox" className="custom-control-input" id={`${list[key]}-${item}`} />
            <label className="custom-control-label" htmlFor={`${list[key]}-${item}`}>{item}</label>
          </div>)
      }
    </fieldset>)
} */

const RenderListNation = () => {
  return <>
    <fieldset className="form-fieldset mg-b-10">
      {/* <legend className="legend-checkbox">
      <div className="custom-control custom-checkbox">
        <input type="checkbox" className="custom-control-input" id={`asia-main`} />
        <label className="custom-control-label" htmlFor={`asia-main`}>Châu Á</label>
      </div>
    </legend> */}
      <div className="custom-control custom-checkbox national-checkbox">
        <input type="checkbox" className="custom-control-input" id={`asia-Philipine`} />
        <label className="custom-control-label" htmlFor={`asia-Philipine`}>Philipine</label>
      </div>
      <div className="custom-control custom-checkbox national-checkbox">
        <input type="checkbox" className="custom-control-input" id={`europe-England`} />
        <label className="custom-control-label" htmlFor={`europe-England`}>Anh</label>
      </div>
    </fieldset>
  </>
}

const ListNation = ({ selectNation }) => {
  const [state, setState] = React.useState(initialState)
  const handleChangeNation = (e) => {
    let array = [];
    $('#div-nationality .national-checkbox input').each(function () {
      if ($(this).is(':checked')) {
        array.push($(this).next().text())
      }
    })
    const value = array.join(",");
    console.log(value)
    selectNation(value);
  }

  const checknationality = () => {
    if ($('.national-checkbox').find('input[type="checkbox"]:checked').length > 0) {
      $('.nationality').addClass('checked')
    } else {
      $('.nationality').removeClass('checked')
    }
  }

  React.useEffect(() => {
    $('#div-nationality input').on('change', handleChangeNation.bind(this))

    $('.legend-checkbox').click(function () {
      if ($(this).hasClass('checked')) {
        $(this).closest('.form-fieldset').find('input[type="checkbox"]').prop('checked', false);
        $(this).removeClass('checked');
        checknationality();
        handleChangeNation();
      } else {
        $(this).closest('.form-fieldset').find('input[type="checkbox"]').prop('checked', true);
        $(this).addClass('checked');
        checknationality();
        handleChangeNation();
      }
    });
    $('.national-checkbox input[type="checkbox"]').click(function () {
      checknationality();
    });
  }, []);

  return <>
    <div className="modal fade" id="div-nationality" tabIndex={-1} role="dialog" aria-labelledby="editTitle" aria-hidden="true">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editTitle">Quốc tịch</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <RenderListNation />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-light" data-dismiss="modal">Đóng</button>
            <button type="button" className="btn btn-primary" data-dismiss="modal">Chọn</button>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default ListNation;
