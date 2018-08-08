const load = () => {
  fetch('https://api.meetup.com/AucklandJS/events?&sign=true&page=1')
    .then(response => response.json())
    .then(events => {
      console.log(events);
      const link = document.querySelector('#next-link');
      link.setAttribute('href', events['0'].link);
      const evName = document.querySelector('#next');
      evName.innerHTML = events['0'].name;
    });
};
load();
