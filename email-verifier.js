( function() {
  var PROJECT = {
      TOKEN: '86827510-0e5-1ea8f',
      PATH: 'http://marketermagic.test',
      LOGO: this.PATH + '/images/poweredby.png',
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  function debounce(func, wait, immediate) {
      var timeout;

      return function() {
          var context = this, args = arguments;
          var later = function() {
              timeout = null;
              if (!immediate) func.apply(context, args);
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
      };
  };

  /**
   * create id
   */
  function createId(prefix) {
      prefix = !prefix ? 'mm' : prefix;

      return prefix + Math.random().toString(36).substr(2, 10);
  }

  /**
   * check if node is valid input
   * @param {node} input
   */
  function isValidInput(input) {
      var attr = ['name', 'type'];
      var types = attr
          .filter( function(a) {
              return !!input[a] &&
                  typeof input[a] === 'string' &&
                  input[a];
          })
          .map( function(a) {
              return input[a];
          });

      // find if the attributes has what we need to check for email
      // usually name with email, e_mail, e-mail, email_add, email_address
      return !!types.find( function(t) {
          return t.match(/(email|e(-|_)mail)|(email_add(ress)?)/g);
      });
  }

  /**
   * check if value is an email
   * @param {string} value
   */
  function isEmail(value) {
      var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

      return re.test(String(value).toLowerCase());
  }

  /**
   * check if input is clone or not
   * @param {node} input
   */
  function isMirror(input) {
      return !!input.getAttribute('data-marketermagic-target');
  }

  /**
   * check if has mirror
   * @param {node} input
   */
  function hasMirror(input) {
      return !!input.getAttribute('data-marketermagic-id');
  }


  /**
   * create mm notification
   */
  function createNotificationBox() {
      var responseBox = document.createElement("div");
      var mmBox = document.createElement("div");
      var textSpan = document.createElement("span");
      var logoSpan = document.createElement("span");
      var ids = {
          box: createId('mm--response-box'),
          text: createId('mm--response-text'),
          logo: createId('mm--response-logo'),
      };

      responseBox.classList.add("mm-response");
      // responseBox.style.display ='none';
      responseBox.setAttribute('id', ids.box);

      textSpan.classList.add("mm-data");
      textSpan.setAttribute('id', ids.text);
      // textSpan.textContent = 'Loading...';

      logoSpan.classList.add("mm-logo");
      logoSpan.setAttribute('id', ids.logo);

      mmBox.appendChild(textSpan);
      mmBox.appendChild(logoSpan);
      responseBox.appendChild(mmBox);

      return responseBox;
  }

  /**
   * create mirror
   * @param {node} input
   */
  function createMirror(input) {
      // hide input
      var id = createId();
      var attrMMID = document.createAttribute('data-marketermagic-id');
      var attrMMTarget = document.createAttribute('data-marketermagic-target');
      var clone = input.cloneNode(true);
      var wrapper = document.createElement("div");
      var notificationBox = createNotificationBox();

      attrMMID.value = id;
      attrMMTarget.value = id;

      input.setAttributeNode(attrMMID);
      input.style.display = "none";

      // clone node
      clone.setAttributeNode(attrMMTarget);
      clone.name = 'cloned_email';

      wrapper.appendChild(clone);
      wrapper.appendChild(notificationBox);

      clone.onkeyup = debounce(function() {
          var email = clone.value || '';

          if (!isEmail(email)) {
              // show notification that not a valid email
              console.log('show not a valid email');
              return ;
          }


          // reset notification
          // validate to MM api

      }, 250);

      // insert node before the input
      input.parentNode.insertBefore(wrapper, input)

      return clone;
  }

  /**
   * add mm css
   */
  function addCSS() {
      var css_link_ev_script = document.createElement("link");
      css_link_ev_script.href = PROJECT.PATH + "/ev_script_loader.css";
      css_link_ev_script.type = "text/css";
      css_link_ev_script.rel = "stylesheet";
      css_link_ev_script.media = "screen,print";
      document.getElementsByTagName("head")[0].appendChild(css_link_ev_script);
  }

  /**
   * add mirror
   */
  function addMirror() {
      // get all input
      var nodes = document.querySelectorAll('input[type="text"],input[type="email"]');

      if (!nodes || nodes.length <= 0) {
          return;
      }

      var inputs = Array.prototype.slice.call(nodes);

      inputs = inputs.filter(isValidInput);

      inputs.forEach(createMirror);
  }


  /**
   * create notification box at the bottom
   */
  function createNotificationBox() {

  }

  /**
   * validate value if valid email
   * @param {String} value
   */
  function onSendValidate(value) {
      var xhttp = new XMLHttpRequest();
      xhttp.open("POST", PROJECT.PATH + '/api/verify_script_email', true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send("email=" + value + "&projectToken=" + PROJECT.TOKEN);

      xhttp.onreadystatechange = function(e) {
          if (xhttp.readyState !== 4 || xhttp.status !== 200) {
              // invalid should show xhhtp.status
              return ;
          }

          var data = JSON.parse(xhttp.responseText, true);

          console.log(data);
      };
  }

  /**
   * handle document event
   * @param {Event} event
   */
  function handleEvent(event) {
      var target = event.target;

      // check if valid input
      if(!isValidInput(target)) {
          return;
      }
  }

  function handleOnFocus(event) {
      var target = event.target;
      var clone = null;

      if (!isValidInput(target) || isMirror(target)) {
          return;
      }

      if (hasMirror(target)) {
          var mmId = target.getAttribute('data-marketermagic-id');
          clone = document.querySelector(`input[data-marketermagic-target="${mmId}"]`);
      } else {
          // create mirror if not a clone
          clone = createMirror(target);
      }

      clone.focus();
  }

  /**
   * init marketermagic email verifier
   */
  function init() {
      addCSS();
      addMirror();
      createNotificationBox();
  }

  // init mm
  document.addEventListener('DOMContentLoaded', init, true);

  // on blue, validate email and remove event from submit
  // document.addEventListener('blur', handleEvent, true);

  // on focus, get form and try adding event submit ?
  document.addEventListener('focus', handleOnFocus, true);
})();
