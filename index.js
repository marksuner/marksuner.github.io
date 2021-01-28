var interval = setInterval( function() {
  var values = [5, 6]
  var s = $('#SiteID')
  var hasAvailable = $('#datepicker .day.available').length > 0;

  if (hasAvailable) {
    var mp3 = 'http://soundbible.com/mp3/Bike%20Horn-SoundBible.com-602544869.mp3'
    var snd = new Audio(mp3);
    snd.play();
    clearInterval(interval);
    return;
  }

  for (let index = 0; index < values.length; index++) {
    var val = values[index];

    if (s.val() != val) {
      s.val(val).trigger('change');
      document.dispatchEvent(new Event('mousemove'));
      break;
    }

  }


}, 3000);
