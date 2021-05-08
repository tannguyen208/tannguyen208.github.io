const renderTypes = {
  list: 'list',
  recursive: 'recursive',
  group: 'group',
  table: 'table',
};
const resumeEl = document.getElementById('resume');

function parseJson(stream) {
  return stream.json();
}

fetch('./assets/resume.json')
  .then(parseJson)
  .then(function ({ contains }) {
    for (const key in contains) {
      if (Object.hasOwnProperty.call(contains, key)) {
        const title = upperText(contains[key].title);
        const child = createChild(contains[key].description);
        const node = createNode(key, title, child);

        resumeEl.appendChild(node);
      }
    }
  })
  .catch(console.error);

function upperText(text = '') {
  return text.toUpperCase();
}

function createNode(key, title, child) {
  const node = document.createElement('div');
  node.classList = 'resume-info';
  node.setAttribute('data-id', key);
  node.innerHTML = `
    <div class="resume-info__title">${title}</div>
    <div class="resume-info__content">${child}</div>
  `;
  return node;
}

function createChild({ type, data }) {
  const outDefault = 'Data has not been entered at resume.json';

  if (!(data && data.length > 0)) return outDefault;
  else {
    if (type === renderTypes.list) {
      return typeof data[0] === 'string'
        ? _buildTextList(data)
        : _buildTableList(data);
    }

    if (type == renderTypes.recursive) {
      return _buildRecursiveList(data);
    }

    if (type == renderTypes.group) {
      return _buildGroupTableList(data);
    }

    if (type == renderTypes.table) {
      return _buildDeepTableList(data);
    }
  }
}

function _buildTableList(list = []) {
  let result = '<ul>';

  list.forEach(({ topic, content, type }) => {
    const isLink = type === 'link';
    result += `
      <li class="c-list">
        <div class="c-list__table">
          <div class="c-list__table-topic">${topic}</div>
          <div class="c-list__table-content">${
            isLink
              ? `<a href="https://${content}" target="_blank">${content}</a>`
              : content
          }</div>
        </div>
      </li>
  `;
  });
  result += '</ul>';
  return result;
}

function _buildTextList(list = []) {
  let result = '<ul>';

  list.forEach((text) => {
    result += `<li class="c-list">${text}</li>`;
  });
  result += '</ul>';

  return result;
}

function _buildRecursiveList(list = []) {
  let result = '<ul>';

  list.forEach(({ topic, content }) => {
    if (typeof content !== 'string') {
      result += `<li>${topic}</li>`;
      result += _buildTextList(content);
    } else {
      result += `<li>${topic}: ${content}</li>`;
    }
  });
  result += '</ul>';

  return result;
}

function _buildGroupTableList(list = []) {
  let result = '';

  list.forEach(({ topic, subtitle, content }) => {
    result += `
      <div class="c-group">
        <div class="c-group__header">
          <div class="c-group__header-topic">${topic}</div>
          <div class="c-group__header-subtitle">${subtitle}</div>
        </div>
        <div class="c-group__content">
    `;
    if (content && content.length) {
      result += _buildTextList(content);
    }
    result += '</div></div>';
  });

  return result;
}

function _buildDeepTableList(list = []) {
  let result = '';

  list.forEach(({ topic, subtitle, content }) => {
    result += `
      <div class="c-table">
        <div class="c-table__header">
          <div class="c-table__header-topic left">${topic}</div>
          <div class="c-table__header-subtitle">${subtitle}</div>
        </div>
        <div class="c-table__content">
    `;
    if (content && content.length) {
      content.forEach((tool) => {
        result += `
          <div class="d-flex row">
            <div class="left">${tool.topic}</div>
            <div>${
              typeof tool.content !== 'string'
                ? _buildTextList(tool.content)
                : tool.content
            }</div>
          </div>
        `;
      });
    }
    result += '</div></div>';
  });

  return result;
}
