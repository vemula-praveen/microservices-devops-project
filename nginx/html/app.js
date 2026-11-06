document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#items-table tbody');
  const statusBadge = document.querySelector('#status');
  const endpoint = document.body.dataset.endpoint;
  const title = document.body.dataset.title || 'Records';

  if (!endpoint || !tableBody) {
    return;
  }

  const formatValue = (key, value) => {
    if (key === 'price') {
      return `$${Number(value).toFixed(2)}`;
    }

    if (key === 'id') {
      return `#${value}`;
    }

    return value;
  };

  const renderTable = (records) => {
    if (!Array.isArray(records) || records.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="100%" class="empty">No ${title.toLowerCase()} available.</td></tr>`;
      return;
    }

    const keys = Object.keys(records[0]);
    tableBody.innerHTML = records.map((record) => {
      return `<tr>${keys.map((key) => `<td>${formatValue(key, record[key])}</td>`).join('')}</tr>`;
    }).join('');
  };

  const updateStatus = (message, isOk = true) => {
    if (!statusBadge) {
      return;
    }

    statusBadge.textContent = message;
    statusBadge.style.background = isOk ? '#ecfdf5' : '#fef2f2';
    statusBadge.style.color = isOk ? '#16a34a' : '#dc2626';
  };

  fetch(endpoint)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const payload = await response.json();
      const records = payload.data || payload;
      renderTable(Array.isArray(records) ? records : [records]);
      updateStatus(`${title} loaded successfully`);
    })
    .catch((error) => {
      console.error(error);
      tableBody.innerHTML = `<tr><td colspan="100%" class="empty">Unable to load ${title.toLowerCase()}.</td></tr>`;
      updateStatus('Unable to load data', false);
    });
});
