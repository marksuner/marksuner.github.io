( function() {
  var PROJECT = {
      TOKEN: 'b60e4e64-b72-371cd',
      PATH: 'https://app.marketermagic.com',
  };

  var mmIcons = {
      loading: `<svg class="spin" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0)">
              <path d="M10.4997 0C9.91525 0 9.44141 0.473796 9.44141 1.05828V4.74453C9.44141 5.32901 9.9152 5.80281 10.4997 5.80281C11.0842 5.80281 11.558 5.32906 11.558 4.74453V1.05828C11.558 0.47384 11.0841 0 10.4997 0Z" fill="#848484"/>
              <path d="M7.17832 5.6819L4.57175 3.07534C4.15848 2.66206 3.48842 2.66206 3.07509 3.07534C2.66182 3.48862 2.66182 4.15867 3.07509 4.57195L5.6817 7.17856C6.09498 7.59188 6.76504 7.59188 7.17832 7.17856C7.59159 6.76524 7.59159 6.09518 7.17832 5.6819Z" fill="#848484"/>
              <path d="M4.74458 9.44177H1.05828C0.473796 9.44177 0 9.91557 0 10.5C0 11.0845 0.473796 11.5583 1.05828 11.5583H4.74458C5.32906 11.5583 5.80285 11.0845 5.80285 10.5C5.80281 9.91557 5.32901 9.44177 4.74458 9.44177Z" fill="#848484"/>
              <path d="M7.17832 13.8213C6.76504 13.408 6.09498 13.408 5.6817 13.8213L3.07509 16.428C2.66182 16.8412 2.66182 17.5113 3.07509 17.9246C3.48842 18.3379 4.15848 18.3379 4.57175 17.9246L7.17832 15.318C7.59159 14.9047 7.59159 14.2347 7.17832 13.8213Z" fill="#848484"/>
              <path d="M10.4997 15.1971C9.91525 15.1971 9.44141 15.6709 9.44141 16.2554V19.9417C9.44141 20.5262 9.9152 21 10.4997 21C11.0842 21 11.558 20.5262 11.558 19.9417V16.2554C11.558 15.671 11.0841 15.1971 10.4997 15.1971Z" fill="#848484"/>
              <path d="M17.9249 16.4281L15.3183 13.8215C14.905 13.4081 14.235 13.4081 13.8217 13.8215C13.4084 14.2348 13.4084 14.9048 13.8217 15.3181L16.4283 17.9247C16.8416 18.338 17.5116 18.338 17.9249 17.9247C18.3382 17.5114 18.3382 16.8413 17.9249 16.4281Z" fill="#848484"/>
              <path d="M19.9419 9.44177H16.2556C15.6711 9.44177 15.1973 9.91552 15.1973 10.5C15.1973 11.0845 15.6711 11.5583 16.2556 11.5583H19.9419C20.5264 11.5583 21.0002 11.0845 21.0002 10.5C21.0001 9.91557 20.5263 9.44177 19.9419 9.44177Z" fill="#848484"/>
              <path d="M17.9249 3.07534C17.5116 2.66206 16.8416 2.66206 16.4283 3.07534L13.8217 5.6819C13.4084 6.09518 13.4084 6.76524 13.8217 7.17856C14.235 7.59188 14.905 7.59188 15.3183 7.17856L17.9249 4.57195C18.3382 4.15867 18.3382 3.48862 17.9249 3.07534Z" fill="#848484"/>
          </g>
          <defs>
              <clipPath id="clip0">
              <rect width="21" height="21" fill="white"/>
              </clipPath>
          </defs>
      </svg>`,
      checked: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0)">
              <path d="M0 10.6381L6.84888 17.5001L20 4.36195L18.1119 2.5L6.84888 13.75L1.86191 8.76306L0 10.6381Z" fill="#02CED1"/>
          </g>
          <defs>
              <clipPath id="clip0">
                  <rect width="20" height="20" fill="white"/>
              </clipPath>
          </defs>
      </svg>`,
      invalid: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 1.88541L14.1146 0L7.99998 6.11457L1.88541 0L0 1.88541L6.11457 7.99998L0 14.1146L1.88541 16L7.99998 9.88543L14.1146 16L16 14.1146L9.88543 7.99998L16 1.88541Z" fill="#E33C3C"/>
      </svg>`,
  }

  var mmNotification = {
      root: null,

      setRoot: function(data) {
          this.root = data;
      },

      positionRoot: function(d, x, y, w) {
          this.root.el.style.display = d;
          this.root.el.style.top = y + 'px';
          this.root.el.style.left = x + 'px';
          this.root.el.style.width = w + 'px';
      },

      show: function(target, type, message) {
          var info = getDocumentInfo(target);
          this.positionRoot('block', info.left, (info.top + info.height + 5), info.width);

          var text = document.getElementById(this.root.id.text);

          switch(type) {
              case 'invalid':
                  text.innerHTML = mmIcons.invalid + ' ' + (message || 'Invalid email');
                  this.root.el.style.border = '1px solid #ED8181';
                  target.style.border = '1px solid #ED8181';
                  text.style.color = '#E33C3C';
                  break;
              case 'loading':
                  text.innerHTML = mmIcons.loading + ' Loading...';
                  this.root.el.style.border = '1px solid #BDBDBD';
                  target.style.border = null;
                  text.style.color = '#848484';
                  break;
              default:
                  text.innerHTML = mmIcons.checked + ' ' + message;
                  this.root.el.style.border = '1px solid #02CED1';
                  target.style.border = null;
                  text.style.color = '#02CED1';
                  break;
          }
      },

      hide: function() {
          this.positionRoot('none', 0, 0, 0);
          this.root.el.style.border = '1px solid #BDBDBD';
      },

      timeout: null,
  }

  /**
   *
   * @param {HTMLElement} el
   * @return {{top: number, left: number, height: number, width: number}}
   */
  function getDocumentInfo(el) {
      var position = {
          top: el.offsetTop,
          left: el.offsetLeft,
          width: el.offsetWidth,
          height: el.offsetHeight,
      };

      if (el.offsetParent) {
          var parentPosition = getDocumentInfo(el.offsetParent);
          position.top += parentPosition.top;
          position.left += parentPosition.left;
      }

      return position;
  }

  /**
   * return a function that continues to invoke unless stop for N ms, bypass
   * thru the `immediate` argument when passed true
   * @param {Function} func
   * @param {number} wait
   * @param {boolean} immediate
   */
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
      var logo = document.createElement('img');
      var logoSpan = document.createElement("span");
      var ids = {
          box: createId('mm--response-box'),
          text: createId('mm--response-text'),
          logo: createId('mm--response-logo'),
      };

      logo.src = PROJECT.PATH + '/images/poweredby.png';
      logoSpan.appendChild(logo);

      responseBox.classList.add("mm-response");
      responseBox.setAttribute('id', ids.box);

      textSpan.classList.add("mm-data");
      textSpan.setAttribute('id', ids.text);

      logoSpan.classList.add("mm-logo");
      logoSpan.setAttribute('id', ids.logo);

      mmBox.appendChild(textSpan);
      mmBox.appendChild(logoSpan);
      responseBox.style.display = 'none';
      responseBox.appendChild(mmBox);

      return {
          id: ids,
          el: responseBox,
      };
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
      // var notificationBox = createNotificationBox();

      attrMMID.value = id;
      attrMMTarget.value = id;

      input.setAttributeNode(attrMMID);
      input.style.display = "none";

      // clone node
      clone.setAttributeNode(attrMMTarget);
      clone.name = 'cloned_email';

      wrapper.appendChild(clone);
      // wrapper.appendChild(notificationBox);

      var form = {
          el: null,
          stop: function() {
              if (!this.el) {
                  return;
              }

              // prevent from submitting the form
              this.el.onsubmit = function(event) { event.preventDefault(); };
          },
          clear: function() {
              if (!this.el) {
                  return;
              }

              // clear onsubmit function
              this.el.onsubmit = function() {};
          }
      }

      // insert node before the input
      input.parentNode.insertBefore(wrapper, input)

      // grab the form
      form.el = clone.form;

      clone.onkeyup = debounce(function() {
          var email = clone.value || '';
          var oID = clone.getAttribute('data-marketermagic-target');
          var original = document.querySelector(`input[data-marketermagic-id="${oID}"]`);

          if (mmNotification.timeout) {
              clearTimeout(mmNotification.timeout);
          }

          original.value = '';

          if (email === '') {
              // if empty, remove notification
              mmNotification.hide();
              clone.style.border = null;

              // reset onsubmit
              form.clear();
              return;
          }

          // stop form from submitting
          form.stop();

          if (!isEmail(email)) {
              // show notification that not a valid email
              mmNotification.show(clone, 'invalid');

              mmNotification.timeout = setTimeout( function() {
                mmNotification.hide();
              }, 5000);

              return ;
          }

          mmNotification.show(clone, 'loading');
          // reset notification
          // validate to MM api
          onSendValidate(email)
              .then( function(result) {
                  mmNotification.show(clone, result.status, result.message)

                  // remove form submit e.preventDefault
                  mmNotification.timeout = setTimeout( function() {
                    mmNotification.hide();
                  }, 5000);

                  if (result.status === 'verified') {
                      // clear form if verified
                      original.value = email;
                      form.clear();
                      return;
                  }

              }).catch( function() {
                  // reset everything
                  form.clear();
                  mmNotification.hide();
                  clone.style.border = null;
                  original.value = email;
                })
      }, 250);

      return clone;
  }

  /**
   * add mm css
   */
  function addCSS() {
      var paths = [
          'https://fonts.googleapis.com/css?family=Nunito',
          PROJECT.PATH + '/css/email-verify-v2.css'
      ];

      paths.forEach( function(p) {
          var css_link_ev_script = document.createElement("link");
          css_link_ev_script.href = p;
          css_link_ev_script.type = "text/css";
          css_link_ev_script.rel = "stylesheet";
          css_link_ev_script.media = "screen,print";
          document.getElementsByTagName("head")[0].appendChild(css_link_ev_script);
      });
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
   * validate value if valid email
   * @param {String} value
   */
  function onSendValidate(value) {
      return new Promise( function(resolve, reject) {
          var xhttp = new XMLHttpRequest();

          var emailStatusCode = {
              verified:  [ 1, 3, 5],
              invalid: [2, 4],
          };

          xhttp.open("POST", PROJECT.PATH + '/api/verify_script_email', true);
          xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhttp.send("email=" + value + "&projectToken=" + PROJECT.TOKEN);

          xhttp.onreadystatechange = function(e) {

              if (xhttp.readyState !== 4) {
                return;
              }

              if (xhttp.status !== 200) {
                reject('Something went wrong validating data');
                return;
              }

              var data = JSON.parse(xhttp.responseText, true);

              if (data.verify_status) {
                  for (var key of Object.keys(emailStatusCode)) {
                      if (emailStatusCode[key].includes(data.verify_status)) {
                          return resolve({
                              status: key,
                              message: data.message,
                          });
                      }
                  }
              }

              // if nothing has been set, or smth went wrong..
              // better to verify the email instead
              // of holding back the user
              return resolve({
                  status: 'verified',
                  message: data.message,
              });
          };

      });
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

  /**
   * handle input focus
   * @param {Event} event
   */
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
   * add notification box in the document
   */
  function addNotificationBox() {
      var notification = createNotificationBox();
      mmNotification.setRoot(notification);
      document.body.appendChild(notification.el);
  }

  /**
   * init marketermagic email verifier
   */
  function init() {
      addCSS();
      addMirror();
      addNotificationBox();
  }

  // init mm
  document.addEventListener('DOMContentLoaded', init, true);

  // on blue, validate email and remove event from submit
  // document.addEventListener('blur', handleEvent, true);

  // on focus, get form and try adding event submit ?
  document.addEventListener('focus', handleOnFocus, true);
})();