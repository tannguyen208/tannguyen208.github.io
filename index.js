var websElement = document.getElementById('webs');
var mobilesElement = document.getElementById('mobiles');

// webs
fetch('./data/web.json')
  .then(parseJson)
  .then(function ({ data }) {
    data.forEach((x, index) => {
      var webElement;
      webElement = document.createElement('li');
      webElement.classList = 'tag';
      webElement.innerHTML = x.name;
      webElement.setAttribute('data-name', x.name);
      webElement.addEventListener('click', function (event) {
        [].forEach.call(
          websElement.getElementsByClassName('tag'),
          function (element) {
            element.classList = 'tag';
          }
        );
        event.target.classList = 'tag active';

        // fetch data
        handleClickTag('web', x);
      });

      if (index === 0) {
        webElement.classList = 'tag active';
        handleClickTag('web', x);
      }

      websElement.append(webElement);
    });
  })
  .catch(console.error);

// webs

fetch('./data/mobile.json')
  .then(parseJson)
  .then(function ({ data }) {
    data.forEach((x, index) => {
      var mobileElement;
      mobileElement = document.createElement('li');
      mobileElement.classList = 'tag';
      mobileElement.innerHTML = x.name;
      mobileElement.setAttribute('data-name', x.name);
      mobileElement.addEventListener('click', function (event) {
        [].forEach.call(
          mobilesElement.getElementsByClassName('tag'),
          function (element) {
            element.classList = 'tag';
          }
        );
        event.target.classList = 'tag active';

        // fetch data
        handleClickTag('mobile', x);
      });

      if (index === 0) {
        mobileElement.classList = 'tag active';
        handleClickTag('mobile', x);
      }

      mobilesElement.append(mobileElement);
    });
  })
  .catch(console.error);

function handleClickTag(platform, tag) {
  console.log('♎ ~ handleClickTag ~ tag', platform, tag);
}
