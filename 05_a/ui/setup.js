const setup = () => {
  const debugPanel = document.getElementById('debug_panel');
  const loginForm = document.getElementById('login');
  const linkForm = document.getElementById('link');
  chrome.storage.sync.get('data', function(result) {
    console.log('Value currently is ' + result.data);
  });

  chrome.storage.sync.get('data', function(result) {
    console.log('Value currently is ' + result);
    console.log(result);
    if (result.data) {
      debugPanel.innerHTML =
        debugPanel.innerHTML + '<br /> res data' + result.data;
      linkForm.classList.remove('hidden');
    } else {
      debugPanel.innerHTML = debugPanel.innerHTML + '<br />No result';

      loginForm.classList.remove('hidden');
    }
  });
  const loginUrl = 'https://kakato.herokuapp.com/api/login';
  const loginAction = (url, data) => {
    // Default options are marked with *
    return fetch(url, {
      body: JSON.stringify(data), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      referrer: 'no-referrer' // *client, no-referrer
    })
      .then(res => {
        debugPanel.innerHTML = debugPanel.innerHTML + '<br /> good';
        debugPanel.innerHTML = debugPanel.innerHTML + '<br />' + res.toString();
        console.log('done', res);
        if (res.ok) {
          debugPanel.innerHTML = debugPanel.innerHTML + '<br /> res ok';
          return res.json();
        }
        //window.close();
      })
      .then(res => {
        debugPanel.innerHTML = debugPanel.innerHTML + '<br /> good token';
        debugPanel.innerHTML = debugPanel.innerHTML + '<br />' + res.token;
        //save
        console.log('done', { data: res.token });
        chrome.storage.sync.set({ data: res.token }, result => {
          //do something
          console.log('saved?', result);
          if (chrome.runtime.error) {
            console.log('Runtime error.', chrome.runtime.error);
            debugPanel.innerHTML =
              debugPanel.innerHTML +
              '<br />Runtime ERR: ' +
              chrome.runtime.error;
          } else {
            debugPanel.innerHTML =
              debugPanel.innerHTML + '<br />NO! Runtime ERR ';
          }
          const loginForm = document.getElementById('login');

          const linkForm = document.getElementById('link');
          loginForm.classList.add('hidden');
          linkForm.classList.remove('hidden');
          chrome.storage.sync.get('data', function(result) {
            console.log('Value after set is ' + result.data);
          });
        });
        //window.close();
      })
      .catch(err => {
        console.log('err', err);
        debugPanel.innerHTML = debugPanel.innerHTML + '<br /> err';
        debugPanel.innerHTML = debugPanel.innerHTML + '<br />' + err.toString();
        //window.close();
      }); // parses response to JSON
  };
  const login = e => {
    e.preventDefault();
    debugPanel.innerHTML = debugPanel.innerHTML + '<br /> login';
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log('login data', { email, password });
    loginAction(loginUrl, { email, password });
  };

  const loginButton = document.getElementById('login_button');
  loginButton.addEventListener('click', login);
  chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {
      var storageChange = changes[key];
      console.log(
        'Storage key "%s" in namespace "%s" changed. ' +
          'Old value was "%s", new value is "%s".',
        key,
        namespace,
        storageChange.oldValue,
        storageChange.newValue
      );
    }
  });
};
document.body.onload = setup;
