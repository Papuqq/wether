
  // форматирование даты
  const format_date = (d) => {
    //let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    let day = days[d.getUTCDay()];
    let date = d.getUTCDate();
    //let month = months[d.getUTCMonth()];
    //let year = d.getUTCFullYear();
    //let hour = d.getUTCHours()

    return(
      <>
        <div className="day">{day}</div>
        <div className="date">{date}</div>
      </>
    )
  }

export default format_date;